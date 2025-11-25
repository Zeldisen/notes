const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const {sendResponse} = require("../../responses/index");
const crypto = require('crypto');
const middy = require('@middy/core');
const { validateToken } = require("../middleware/auth");

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

const createHandler = async (event) => {

 if (!event.userId) {
    return sendResponse(401, { success: false, message: "Unauthorized" });
  }

  const body = JSON.parse(event.body || "{}");

  const note = {
    userId: event.userId,
    createdAt: new Date().toISOString(),
    id: crypto.randomUUID(),
    title: body.title,
    content: body.content,
  };

 const command = new PutCommand({
  TableName: 'notey-db',
  Item: note
 });
  
  try {
   await db.send(command);
  
    return sendResponse(201, { success: true, note });
  } catch (error) {
    console.error("createNote error:", error); 
    return sendResponse(500, { success: false, error: "Database error" });
  }
};
exports.handler = middy(createHandler).use(validateToken);