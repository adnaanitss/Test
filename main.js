var mDBManager = require('./DBManager.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
	extended : true
}));

app.use(bodyParser.json());

app.get('/', function(request, response)
{
	response.write("asdasd");
	response.end();
});

app.get('/1', function(request, response)
{
	response.write("asdaasdsd");
	response.end();
});


app.post("/Register", function(request, response)
{
	var mData = request.body;
	var mConn = new mDBManager("AbcCabs", "test", function()
	{
		mConn.find({"Email" : mData.Email}, function(err, documents)
		{
			if(err)
			{
				response.write(JSON.stringify({
					"Code" : "0",
					"Message" : "Some thing went wrong"
				}));
				response.end();
				mConn.close();
			}
			else if(documents.length != 0)
			{
				response.write(JSON.stringify({
					"Code" : "0",
					"Message" : "The Email ID " + mData.Email + " already exists!"
				}));
				response.end();
				mConn.close();
			}
			else
			{
				mConn.find({"Phone" : mData.Phone}, function(err, documents)
				{
					if(err)
					{
						response.write(JSON.stringify({
							"Code" : "0",
							"Message" : "Some thing went wrong"
						}));
						response.end();
						mConn.close();
					}
					else if(documents.length != 0)
					{
						response.write(JSON.stringify({
							"Code" : "0",
							"Message" : "The Phone Number " + mData.Phone + " already exists!"
						}));
						response.end();
						mConn.close();
					}
					else
					{
						mConn.insert(request.body, {}, function(err, insertedData)
						{
							if(!err && insertedData.result.n > 0)
							{
								console.log("Data Inserted");
								response.write(JSON.stringify({"Code" : "1"}));
								response.end();
								mConn.close();
							}
							else
							{
								console.log("Failed to insert Data");
								response.write(JSON.stringify({
									"Code" : "0",
									"Message" : "Well this is embarassing something went wrong"
								}));
								response.end();
								mConn.close();
							}
						});
					}
				});
			}
		});
	});
});

app.post("/SignIn", function(request, response)
{
	var mData = request.body;
	var mConn = new mDBManager("AbcCabs", "test", function()
	{
		mConn.find({"Email" : mData.Email, "Phone": mData.Phone}, function(err, documents)
		{
			if(err)
			{
				response.write(JSON.stringify({
					"Code" : "0",
					"Message" : "Some thing went wrong"
				}));
				response.end();
				mConn.close();
			}
			else if(documents.length == 0)
			{
				response.write(JSON.stringify({
					"Code" : "0",
					"Message" : "The Email Id or Password does not match!"
				}));
				response.end();
				mConn.close();
			}
			else
			{
				mConn.update({"Email" : mData.Email, "Phone": mData.Phone}, {"FCM": mData.FCM})
			}
		});
	});
});

app.post('/', function(request, response)
{
	//var mMongo = require('mongodb').MongoClient;
	//mMongo.connect("mongodb://localhost:27017/AbcCabs", function(err, db)
	//{
	//	if(!err)
	//	{
	//		var mDB = db;
	//		var mCollection = mDB.collection('Clients');
	//
	//		mCollection.find().toArray(function(err, items)
	//		{
	//			console.log(items);
	//		});
	//		console.log("We are connected");
	//	}
	//	else
	//		console.log("Connected to DB");
	//});

	console.log(request.body);
	/*var t = require("./DBManager.js");
	 var tmp1 = new t("AbcCabs", "test");
	 setTimeout(function()
	 {
	 var cursor = tmp1.find();
	 cursor.each(function(err, item)
	 {
	 if(item != null)
	 console.log(item.Email);
	 });

	 tmp1.insert([{Email: "zxcbasnd"}, {Email: "Asdasd"}], {}, function(err, insertedDoc)
	 {
	 if(insertedDoc.result.n > 0)
	 {
	 console.log("Data inserted");
	 }
	 });

	 tmp1.update({Email : "Asdasd"}, {a: "ASdasd", b: "ASDASD", z: "2678"}, {multi: true}, function(err, updatedDoc)
	 {
	 if(updatedDoc.result.nModified > 0)
	 {
	 console.log("Data Updated");
	 }
	 })
	 }, 1000);*/
});

var server = app.listen(3000, function()
{
	console.log("Server Running....");
});