const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const { sendResponse } = require("../../responses/index");
const middy = require('@middy/core');
const { validateToken } = require("../middleware/auth");

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

const getDeletedHandler = async (event) => {
  // Kollar att användaren är inloggad
  if (!event.userId) {
    return sendResponse(401, { success: false, message: "Unauthorized" });
  }

  // Hämtar alla notes för den användaren
  const command = new QueryCommand({
    TableName: 'notey-db',
    KeyConditionExpression: "userId = :u",
    ExpressionAttributeValues: {
      ":u": event.userId,
    },
  });

  try {
    const result = await db.send(command);

    // Filtrerar bara fram de som är markerade som deleted
    const deletedNotes = (result.Items || []).filter(
      (n) => n.deleted === true
    );

    return sendResponse(200, {
      success: true,
      items: deletedNotes,
    });
  } catch (err) {
    console.error("getDeletedNotes error:", err);
    return sendResponse(500, { success: false, message: "Database error" });
  }
};

exports.handler = middy(getDeletedHandler).use(validateToken);
