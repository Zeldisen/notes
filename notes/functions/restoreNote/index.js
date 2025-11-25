const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { sendResponse } = require("../../responses/index");
const middy = require('@middy/core');
const { validateToken } = require("../middleware/auth");

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

const restoreHandler = async (event) => {
    
  if (!event.userId) {
    return sendResponse(401, { success: false, message: "Unauthorized" });
  }

  const noteId = event.pathParameters && event.pathParameters.id;
  if (!noteId) {
    return sendResponse(400, { success: false, message: "Missing note id in path" });
  }

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

    if (!existing.deleted) {
      return sendResponse(400, {
        success: false,
        message: "Note is not deleted",
      });
    }
  } catch (err) {
    console.error("restoreNote scan error:", err);
    return sendResponse(500, { success: false, message: "Database error" });
  }

  const command = new UpdateCommand({
    TableName: 'notey-db',
    Key: {
      userId: existing.userId,
      createdAt: existing.createdAt,
    },
     // sätter deleted till false igen så man kan få tillbaka sin anteckning
    UpdateExpression: "SET #deleted = :false REMOVE #deletedAt",
    ExpressionAttributeNames: {
      "#deleted": "deleted",
      "#deletedAt": "deletedAt",
    },
    ExpressionAttributeValues: {
      ":false": false,
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
    console.error("restoreNote update error:", err);
    return sendResponse(500, { success: false, message: "Database error" });
  }
};

exports.handler = middy(restoreHandler).use(validateToken);
