const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { GetCommand, DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const {sendResponse} = require("../../responses/index");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

async function getUser(username){
    const command = new GetCommand({
        TableName: "account",
        Key: {
            username: username
        }
    });

    try{
    
    const { Item } = await db.send(command);

    if (Item) {
      return Item;          
    }

     return false
} catch (error){
    console.log(error)
    return false
}

}

async function signIn( username, password) {
    const user = await getUser(username);
    
    if(!user) return {success: false, message: "incorrect username "};

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) return {success: false, message: "incorrect password"};

   // jwt-token is now a secret.
    const token = jwt.sign(
     { userId: user.userId, username: user.username },
       process.env.JWT_SECRET, 
     { expiresIn: 1800 });

    return {success: true, token: token}
}

exports.handler = async (event) => {
    const { username, password } = JSON.parse(event.body);

    const result = await signIn(username, password);

    if (result.success)
        return sendResponse(200, result);
    else 
        return sendResponse(400, result);

}