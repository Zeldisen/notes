const {sendResponse} = require("../../responses/index");
const bcrypt = require('bcryptjs');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { GetCommand, PutCommand, DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

// kollar om användarnamn redan finns och skickar då ett error i signup funktionen
async function userExists(username) {
  const command = new GetCommand({
    TableName: 'account',
    Key: { username: username },
  });

  try {
    const { Item } = await db.send(command);
    return !!Item; // true om användaren finns
  } catch (error) {
    console.log("userExists error:", error);
    return false;
  }
}
async function createAccount(username, hashedPassword, userId, firstname, lastname) {
 console.log('createAccount input:', { username, hashedPassword, userId, firstname, lastname });
     const command = new PutCommand({
      TableName: 'account',
      Item: {
        username: username,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname,
        userId: userId
      }
     
     });

     try{
        await db.send(command);
        return sendResponse(200, { success: true, userId: userId,  message: "new user created"});
      }catch (error) {
        console.log(error);
        return sendResponse(200, { success: false, message: "failed to create user"});
      }
}
async function signup(username, password, firstname, lastname) {
    //check if userame already exist
    // if username exist return ( success: false, message: "username already exists")
    if (await userExists(username)) {
    return { success: false, message: "username already exists" };
  }

    const hashedPassword = await bcrypt.hash(password, 15 );
    const { nanoid } = await import("nanoid");
    const userId = nanoid();

    const result = await createAccount(username, hashedPassword, userId, firstname, lastname);

    return result;

}

exports.handler = async (event) => {

    const { username, password, firstname, lastname } = JSON.parse(event.body);

    const result = await signup(username, password, firstname, lastname);

    if(result.success)
        return sendResponse(200, result);
    else
        return sendResponse(400, result);
}