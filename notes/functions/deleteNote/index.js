const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { sendResponse } = require("../../responses/index");
const middy = require('@middy/core');
const { validateToken } = require("../middleware/auth");

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

const deleteHandler = async (event) => {

    // kollar om användare är inloggad och rätt lösenord 
  if (!event.userId) {
    return sendResponse(401, { success: false, message: "Unauthorized" });
  }

  // id på anteckningen måste skickas med i pathen.
  const noteId = event.pathParameters && event.pathParameters.id;
  if (!noteId) {
    return sendResponse(400, { success: false, message: "Missing noteId in path" });
  }

  // hittar anteckning baserat på (userId + id)
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
    // Om det inte finns någon anteckning
    existing = (scanResult.Items || [])[0];
    if (!existing) {
      return sendResponse(404, { success: false, message: "Note not found" });
    }
  } catch (err) {
    console.error("deleteNote scan error:", err);
    return sendResponse(500, { success: false, message: "Database error" });
  }

  //soft delete: sätter deleted = true + deletedAt
  const command = new UpdateCommand({
    TableName: 'notey-db',
    Key: {
      userId: existing.userId,
      createdAt: existing.createdAt, // pk i tabell
    },
    UpdateExpression: "SET #deleted = :true, #deletedAt = :now", // sätter deleted = true
    ExpressionAttributeNames: {
      "#deleted": "deleted",
      "#deletedAt": "deletedAt",
    },
    ExpressionAttributeValues: {
      ":true": true,
      ":now": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
  });

  try {
    const result = await db.send(command);
    return sendResponse(200, {
      success: true,
      note: result.Attributes,
    });
  } catch (err) {
    console.error("deleteNote update error:", err);
    return sendResponse(500, { success: false, message: "Database error" });
  }
};

exports.handler = middy(deleteHandler).use(validateToken);
