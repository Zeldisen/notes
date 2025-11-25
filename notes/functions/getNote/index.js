const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const { sendResponse } = require("../../responses/index");
const middy = require('@middy/core');
const { validateToken } = require("../middleware/auth");

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

const getHandler = async (event) => {

   if (!event.userId) {
    return sendResponse(401, { success: false, message: "Unauthorized" });
  }

//  console.log("userId from token:", event.userId);

  const command = new QueryCommand({
    TableName: "notey-db",
    KeyConditionExpression: "userId = :u",
    ExpressionAttributeValues: {
      ":u": event.userId,
    },
  });

  try {
    const result = await db.send(command);
    return sendResponse(200, { success: true, items: result.Items || [] });
  } catch (error) {
    console.error(error);
    console.error("getNote error:", error); 
    return sendResponse(500, { success: false, error: "Database error" });
  }


};
exports.handler = middy(getHandler).use(validateToken);