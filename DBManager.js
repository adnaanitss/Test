var method = DBManager.prototype;

function DBManager(dbName, collection, callback)
{
	this.mMongo = require('mongodb').MongoClient;
	this.mMongo.connect("mongodb://localhost:27017/"+dbName, function(err, db)
	{
		if(!err)
		{
			console.log("Connected to DB");
			global.mDB = db;
			mDB.collection(collection, function(err, coll)
			{
				if(!err)
				{
					global.mCollection = coll;
					console.log("Connected to Collection");
					callback();
				}
			});
		}
	});
}


//condition extra parameter
//{fieldname: {parameters}}
//$lt 	- less than
//$lte 	- less than equal
//$gt 	- greater than
//$gte 	- greater than equal
//$ne 	- not equal
//$in 	- specifies an array of possible matches, {"name":{$in:[1,2,3]}}
//$nin 	- specifies an array of unwanted matches
//$all 	- array value must match to the condition {"name":{$all:[1,2,3]}}
//$exists - checks for existence of a field {"name":{$exists:true}}
//$mod 	- check for a modulo {"name":{$mod:{3,2}} is the same as "name" % 3 == 2
//$size - checks the size of an array value {"name": {$size:2}} matches arrays name with 2 elements

//options parameters
//	var options =
//	{
//		"limit": 20,
//		"skip": 10,
//		"sort": "fieldName"
//	}


//condition	- condition to find
method.find = function(condition, callback)
{
	mCollection.find(condition).toArray(callback);
};

//array 	- array/arrays of data to be inserted
//option 	- additional options for query can be empty {}
//callback 	- function to be executed after the query is executed function(err, insertedDoc)
method.insert = function(array, option, callback)
{
	mCollection.insert(array, option, callback);
};

//condition	- condition for update
//array 	- array of data to be updated
//option 	- additional options for query can be empty {}
//callback 	- function to be executed after the query is executed function(err, updatedDoc)
method.update = function(condition, array, option, callback)
{
	mCollection.update(condition, {$set: array}, option, callback);
};

method.close = function()
{
	mDB.close();
};

module.exports = DBManager;