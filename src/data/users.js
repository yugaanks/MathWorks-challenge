const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;

let exportedMethods = {
    
    async getAllUsers() {
        let userCollection = await users();
        return await userCollection.find().toArray();
    },

    async getUser(username) {
        let userCollection=await users();
        return await userCollection.findOne({username: username});
    },

    async addUser(username, displayName, department) {
        let userCollection = await users();
        let newUser = {
            username: username,
            displayName: displayName,
            department: department
        };
        return await userCollection.insertOne(newUser);
    },

    async deleteUser(username) {
        let userCollection = await users();
        return await userCollection.removeOne({username: username});
    }
}

module.exports = exportedMethods;