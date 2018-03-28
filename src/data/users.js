const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;

let exportedMethods = {
    
    // get all users method
    async getAllUsers() {
        let userCollection = await users();
        return await userCollection.find().toArray();
    },

    // get a user by user name
    async getUser(username) {
        let userCollection=await users();
        return await userCollection.findOne({username: username});
    },

    // add new user
    async addUser(username, displayName, department) {
        let userCollection = await users();
        let newUser = {
            username: username,
            displayName: displayName,
            department: department
        };
        return await userCollection.insertOne(newUser);
    },

    // delete a user by username
    async deleteUser(username) {
        let userCollection = await users();
        return await userCollection.removeOne({username: username});
    }
}

module.exports = exportedMethods;