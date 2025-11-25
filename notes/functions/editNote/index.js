const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { sendResponse } = require("../../responses/index");
const middy = require('@middy/core');
const { validateToken } = require("../middleware/auth");

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

const editHandler = async (event) => {
    
    // kollar om användare är inloggad osv.
  if (!event.userId) {
    return sendResponse(401, { success: false, message: "Unauthorized" });
  }

  // man måste skicka med anteckningens id
  const noteId = event.pathParameters && event.pathParameters.id;
  if (!noteId) {
    return sendResponse(400, { success: false, message: "Missing noteId in path" });
  }

  // Om användaren inte skriver något i fälten så uppdateras inget, alltså om man bara skickar en tom body.
  const body = JSON.parse(event.body || "{}");
  if (Object.keys(body).length === 0) {
    return sendResponse(400, { success: false, message: "No fields to update" });
  }

  //  Hittar anteckningen med userId + id
  let existing;
  try {
    const scanResult = await db.send(
      new ScanCommand({
        TableName: 'notey-db', 
        FilterExpression: "userId = :u AND id = :id",
        ExpressionAttributeValues: {
          ":u": event.userId,
          ":id": noteId,
        },
      })
    );

    existing = (scanResult.Items || [])[0];
    if (!existing) {
      return sendResponse(404, { success: false, message: "Note not found" });
    }
  } catch (err) {
    console.error("Scan error in editNote:", err);
    return sendResponse(500, { success: false, message: "Database error" });
  }

  // Bygger update-data (title + content och skapar ett updateringsdatum)
  const updateAttributes = {
    ...body,
     modifiedAt: new Date().toISOString(),
    
  };

  // förhindrar att användrare kan ändra på dessa värden. 
  delete updateAttributes.userId;
  delete updateAttributes.id;
  delete updateAttributes.createdAt;

  if (Object.keys(updateAttributes).length === 0) {
    return sendResponse(400, { success: false, message: "Nothing to update" });
  }

  const expressionAttributeNames = {};
  const expressionAttributeValues = {};
  const sets = [];

  for (const [key, value] of Object.entries(updateAttributes)) {
    const nameKey = `#${key}`;
    const valueKey = `:${key}`;
    expressionAttributeNames[nameKey] = key;
    expressionAttributeValues[valueKey] = value;
    sets.push(`${nameKey} = ${valueKey}`);
  }

  const updateExpression = "SET " + sets.join(", ");

  // Uppdaterar via userId + createdAt (pk i tabellen)
  const command = new UpdateCommand({
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: existing.userId,
      createdAt: existing.createdAt,
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  });

  try {
    const result = await db.send(command);
    return sendResponse(200, { success: true, note: result.Attributes });
  } catch (error) {
    console.error("editNote error:", error);
    return sendResponse(500, { success: false, error: "Database error" });
  }
};

exports.handler = middy(editHandler).use(validateToken);
