var http = require('http');
var fs = require('fs');
var params = process.argv;
var rl = require("readline");

var utils = require('./utils.js');
var Config = require('./config/configuration.js');
var configObj = new Config();

var port = process.env.PORT || configObj.port;

var totalParkings = 0;
var parkingArr = new Array();

if (params[params.length - 1] == 'true') {
	interact();
} else {
	fs.readFile(params[2] || './bin/parking_lot_inputs.txt', 'utf-8', function (err, data) {
		if (data) {
			var arr = data.split("\n");
			for (var i = 0; i < arr.length; i++) {
				execute_parking_lot(arr[i].replace('\r', ''));
			}
		}
	});
}

function interact() {
	if (params[params.length - 1] == 'true') {
		var prompts = rl.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
		prompts.question("Input: ", function (data) {
			execute_parking_lot(data);
		});
	}
}

function execute_parking_lot(input) {
	var parking_lot_action = input.split(" ")[0];
	switch (parking_lot_action) {
		case "create_parking_lot":
			totalParkings = utils.create_parking_lot(input);
			for (var i = 0; i < totalParkings; i++) {
				var obj = new Object();
				obj[parseInt(i)] = null;
				parkingArr.push(obj);
			}
			console.log("Created a parking lot with " + totalParkings + " slots.");
			break;
		case "park":
			var slotNumber = utils.park(totalParkings, parkingArr, input);
			if (slotNumber) {
				console.log("Allocated slot number: " + slotNumber);
			} else {
				console.log("Sorry, parking lot is full");
			}
			break;
		case "leave":
			var leaveParking = utils.leave(totalParkings, parkingArr, input);

			if (leaveParking) {

				console.log(`Registration number ${leaveParking.regNo} with Slot Number ${leaveParking.slotNumber} is free with Charge ${leaveParking.charge}`)

			} else {
				console.log(`Registration number ${input.split(" ")[1]} not found`);
			}
			break;
		case "status":
			var values = utils.status(totalParkings, parkingArr);
			if (values.length > 1) {
				console.log(values.join("\n"));
			} else {
				console.log("Sorry, parking lot is full");
			}
			break;
		default:
			console.log("Incorrect action received...");
	}
	interact();
}

http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Server is up and running!\n');
}).listen(port);