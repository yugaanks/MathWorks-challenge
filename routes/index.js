const path = require('path');
const data = require("../src/data/");
const users = data.users;

const constructorMethod = (app) => {
    
    // index page
	app.get("/", async (req, res) => {
        res.render('index', {script: '/js/index.js'});
    });

	// get all users
    app.get('/users', (req,res)=>{
    	users.getAllUsers().then((result)=>{
			res.send(JSON.stringify(result));
		}).catch((err)=>{
			res.json(err);
		});
	});

    // get a user by username
	app.get('/users/:username', (req, res)=>{
		users.getUser(req.params.username).then((user)=>{
			if(user)
				res.send(JSON.stringify(user));
			else {
				res.sendStatus(404);
			}
		}).catch((err)=>{
			res.sendStatus(404).json({error: err});
		});
	});

	// add a user
	app.post('/users/:username', (req, res)=>{
		users.getUser(req.params.username).then((user)=>{
			if(!user) {
				users.addUser(req.params.username, req.body.displayName, req.body.department).then(()=>{
					res.sendStatus(200);
				}).catch((err)=>{
					console.log(err);
				});
			}
			else {
				throw "already exists";
			}
		}).catch(()=>{
			res.sendStatus(409);
		});
	});

	// delete a user by username
	app.delete('/users/:username', (req, res)=>{
		users.getUser(req.params.username).then((user)=>{
			if(user) {
				users.deleteUser(req.params.username).then((deleteInfo)=>{
					if(deleteInfo.deletedCount===0) {
						throw(`Couldn't delete user with username of ${req.params.username}`);
					}
					else
						res.sendStatus(200);
				}).catch((e)=>{
					res.sendStatus(500);
				});		
			}
			else 
				throw "not present";
		}).catch(()=>{
			res.sendStatus(404);
		});
		
	});

	// default 404
    app.use("/*", (req, response) => {
		response.status(404);    
	});
};

module.exports = constructorMethod;