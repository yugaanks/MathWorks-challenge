var faker = require('faker');
const data = require("../data/");
const users = data.users;


function generateSampleData() {
	for(let i=0;i<500;i++) {
		var randomDisplayName = faker.name.findName(); // random display name
		var randomUserName = faker.internet.userName(); // random username
		var randomDepartment = faker.commerce.department(); // random department
		users.addUser(randomUserName, randomDisplayName, randomDepartment);
	}
}

generateSampleData();