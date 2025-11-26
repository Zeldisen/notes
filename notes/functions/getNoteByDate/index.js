const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const { sendResponse } = require("../../responses/index");
const middy = require('@middy/core');
const { validateToken } = require("../middleware/auth");

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

const getByDateHandler = async (event) => {
  if (!event.userId) {
    return sendResponse(401, { success: false, message: "Unauthorized" });
  }

  const qs = event.queryStringParameters || {};
  const { from, to, date } = qs;

  // måste skriva med ?date=YYYY-MM-DD eller ?from=YYYY-MM-DD&to=YYYY-MM-DD" i pathen
  if (!from && !to && !date) {
    return sendResponse(400, {
      success: false,
      message: "You must provide either ?date=YYYY-MM-DD or ?from=YYYY-MM-DD&to=YYYY-MM-DD",
    });
  }

  let fromIso;
  let toIso;

  if (date) {
    // en specifik dag/dagar om man vill söka efter fler dagar
    fromIso = new Date(`${date}T00:00:00.000Z`).toISOString();
    toIso = new Date(`${date}T23:59:59.999Z`).toISOString();
  } else {
    if (!from || !to) {
      return sendResponse(400, {
        success: false,
        message: "Both from and to must be provided when using range filter",
      });
    }
    fromIso = new Date(`${from}T00:00:00.000Z`).toISOString();
    toIso = new Date(`${to}T23:59:59.999Z`).toISOString();
  }

  // Query på userId + createdAt BETWEEN ... dessa datum inkluderat de dagar man skrivit och de dagar som är emellan
  const command = new QueryCommand({
    TableName: 'notey-db',
    KeyConditionExpression: "userId = :u AND createdAt BETWEEN :from AND :to",
    ExpressionAttributeValues: {
      ":u": event.userId,
      ":from": fromIso,
      ":to": toIso,
    },
  });

  try {
    const result = await db.send(command);

    // filtrerar bort deletade anteckningar
    const items = (result.Items || []).filter(
      (n) => !n.deleted || n.deleted === false
    );

    return sendResponse(200, {
      success: true,
      items,
    });
  } catch (err) {
    console.error("getNotesByDate error:", err);
    return sendResponse(500, {
      success: false,
      message: "Database error",
    });
  }
};
exports.handler = middy(getByDateHandler).use(validateToken);