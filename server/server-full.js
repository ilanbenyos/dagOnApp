// Minimal Simple REST API Handler (With MongoDB and Socket.io)
// Plus support for simple login and session
// Plus support for file upload
// Author: Yaron Biton misterBIT.co.il

"use strict";

var cl = console.log;

const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongodb = require('mongodb')

const clientSessions = require("client-sessions");
const upload = require('./uploads');
const app = express();

var corsOptions = {
	origin: /http:\/\/localhost:\d+/,
	credentials: true
};

const serverRoot = 'http://localhost:3003/';
const baseUrl = serverRoot + 'data';


app.use(express.static('uploads'));


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(clientSessions({
	cookieName: 'session',
	secret: 'C0d1ng 1s fun 1f y0u kn0w h0w', // set this to a long random string!
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));

const http = require('http').Server(app);
const io = require('socket.io')(http);


function dbConnect() {

	return new Promise((resolve, reject) => {
		// Connection URL  
		var dbUser = 'ilanben';
		var dbPassword = 'xsw23edc';
		
		// var url = 	`mongo ds145303.mlab.com:45303/proto-proj -u ${dbUser} -p ${dbPassword}`	;
		var url = 'mongodb://localhost:27017/seed';
		// Use connect method to connect to the Server
		mongodb.MongoClient.connect(url, function (err, db) {
			if (err) {
				cl('Cannot connect to DB', err)
				reject(err);
			}
			else {
				cl("Connected to DB");
				resolve(db);
			}
		});
	});
}

// GETs a list
app.get('/data/:objType', function (req, res) {
	const objType = req.params.objType;
});

// GETs a single
app.get('/data/:objType/:id', function (req, res) {
	mainHub(req, res);
});

// DELETE
app.delete('/data/:objType/:id', function (req, res) {
	const objType 	= req.params.objType;
	const objId 	= req.params.id;
	cl(`Requested to DELETE the ${objType} with id: ${objId}`);
	dbConnect().then((db) => {
		const collection = db.collection(objType);
		collection.deleteOne({ _id: new mongodb.ObjectID(objId) }, (err, result) => {
			if (err) {
				cl('Cannot Delete', err)
				res.json(500, { error: 'Delete failed' })
			} else {
				cl("Deleted", result);
				res.json({});
			}
			db.close();
		});

	});


});

// POST - adds 
app.post('/data/:objType', upload.single('file'), function (req, res) {
	const objType = req.params.objType;
	mainHub(req, res);
});


//============================================================
function addRecord(obj, type1){
	// const obj = req.body.msg.data;
	return new Promise((resolve, reject) => {
	dbConnect().then((db) => {
		const collection = db.collection(type1);
		obj._id = Date.now() ;
		collection.insert(obj, (err, result) => {
			if (err) {
				cl(`addRecord.Couldnt insert a new ${type1}`, err)
				reject ({status:'err',err:err})
				// res.json(500, { error: 'Failed to add' })
			} else {
				cl('addRecord.'+ type1 + " added");
				obj.status='success';
				resolve ({status:'success',obj})
				// res.json(obj);
			}
			db.close();
		});
	});
});
}
//============================================================
function addUser(req, res){
	const obj = req.body.msg.act.data;
	var type1 = 'users';
	addRecord(obj,type1).then(function(arg){
			if (arg.status==='err') {
				res.json(500, { error: 'Failed to add' })
			} else {
				arg.obj.status='success';
				res.json(arg.obj);
			}
	})
}
//============================================================deleteUser
function getList(req, res){
	const list = req.body.msg.act.list;
	getListFromDb(list).then(function(list){
			if (list.status==='err') {
				res.json(500, { error: 'Failed to add' })
			} else {
				res.json(list.objs);
			}
	})
}
//============================================================
function getListFromDb(type1){
	return new Promise((resolve, reject) => {
		dbConnect().then(db => {
			const collection = db.collection(type1);
			collection.find({}).toArray((err, objs) => {
				if (err) {
					cl('Cannot get you a list of ', err)
					reject ({status:'err not found',err:err})
				} else {
					cl("Returning list of " + objs.length + " " + type1 + "s");
					resolve ({status:'success',objs})
				}
				db.close();
			});
		});
	})
}
//============================================================
function deleteUser(req, res){
	const userId = req.body.msg.act.user;
	const list = 'users';
	
	deleteRecordFromDb(list,userId).then(function(dbRes){
			if (dbRes.status==='err') {
				res.json(500, { error: 'Failed to add' })
			} else {
				res.json(dbRes.status);
			}
	})
}

//============================================================
function deleteRecordFromDb(list,objId){
	cl(`Requested to DELETE the ${list} with id: ${objId}`);
	return new Promise((resolve, reject) => {
			dbConnect().then((db) => {
				var collection = db.collection(list);
				collection.deleteOne({ "_id": objId }, (err, result) => {
					if (err) {
						cl('Cannot Delete', err)
							reject ({status:'err deleteing failed',err:err})
					} else {
						cl("Deleted", result);
						resolve ({status:'success'})
					}
					db.close();
				});
			});
	});
}

//============================================================
function mainHub(req, res){
	const actType = req.body.msg.act.actType;
		switch (actType) {
			case 'addUser':  
				console.log('=====================addUser')
				addUser(req, res);
			break;
			case 'getList':  //
				console.log('=====================getList')
				getList(req, res);
			break;
			case 'deleteUser':  //deleteUser
				console.log('=====================deleteUser')
				deleteUser(req, res);
			break;
		}
}
//============================================================
// PUT - updates
app.put('/data/:objType/:id', function (req, res) {
	const objType 	= req.params.objType;
	const objId 	= req.params.id;
	const newObj 	= req.body;
	if (newObj._id && typeof newObj._id === 'string') newObj._id = new mongodb.ObjectID(newObj._id);

	cl(`Requested to UPDATE the ${objType} with id: ${objId}`);
	dbConnect().then((db) => {
		const collection = db.collection(objType);
		collection.updateOne({ _id: new mongodb.ObjectID(objId) }, newObj,
			(err, result) => {
				if (err) {
					cl('Cannot Update', err)
					res.json(500, { error: 'Update failed' })
				} else {
					res.json(newObj);
				}
				db.close();
			});
	});
});


// Kickup our server 
// Note: app.listen will not work with cors and the socket
// app.listen(3003, function () {
http.listen(3003, function () {
	console.log(`misterREST server is ready at ${baseUrl}`);
	console.log(`GET (list): \t\t ${baseUrl}/{entity}`);
	console.log(`GET (single): \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`DELETE: \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`PUT (update): \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`POST (add): \t\t ${baseUrl}/{entity}`);

});


// io.on('connection', function (socket) {
// 	console.log('a user connected');
// 	socket.on('disconnect', function () {
// 		console.log('user disconnected');
// 	});
// 	socket.on('chat message', function (msg) {
// 		// console.log('message: ' + msg);
// 		io.emit('chat message', msg);
// 	});
// });

cl('WebSocket is Ready');

io.on('connection', function (socket) {
	//====================
	socket.on('disconnect', function (ev) {
		console.log('user disconnected, socket.id=', socket.id);
	});
	//=====================================================
	//=====================================================
	//=====================================================
	//=====================================================
	socket.on('sendMsg', function (msg) {
		// console.log('chat.js/sendMsg: ' + msg);
		msg = JSON.parse(msg);
		msg.status = 'atServer';
		updateSocket(msg,socket);
		msg.processed = true;
		// console.log('chat.js/sendNewMsg.type1: ' + msg.type1);
		if (!msg.from){
			 askUserToInit(socket);
			 return
		}
		updateVals(msg,socket);
		switch (msg.type1) {
			case 'getOurHistory'://    
				getOurHistory(msg);
			break;

			case 'sendMsgToUser':
				msgs.push(msg);
				sendMsgToUser(msg.to,msg)
				sendMsgToUser(msg.from,msg)
				// if( msg.from !=msg.to)
				break;
			// case 'sendMsgToAll':
			// 		// console.log('chat.js/sendMsgToAll: ' + msg);
			// 	sendAll('msg received', msg);
			// 	break;
			case 'ilan':
				ilan('msg received', msg);
			break;
			// case 'UserReadAllMsgs'://
			// 		console.log('chat./UserReadAllMsgs: ' + msg);
			// 	UserReadAllMsgs(msg);
			// 	break;
			case 'userIsMovingOutOfChat'://
					console.log('chat./userIsMovingOutOfChat: ' + msg);
				userIsMovingOutOfChat(msg);
				break;
			case 'initUser'://    
					initUser(msg,socket);
				break;
			default:
				console.log('chat.js/switch: ' + msg.type1);
		}

	});
});



// Some small time utility functions




// function cl(...params) {
// 	console.log.apply(console, params);
// }

// Just for basic testing the socket
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/test-socket.html');
// });