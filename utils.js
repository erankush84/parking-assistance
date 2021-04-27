module.exports = {
	/* Create parking lot with capacity of n : input */

	create_parking_lot: function (input) {
		let totalParkings = parseInt(input.split(" ")[1]);
		return totalParkings;
	},

	/* Park a vehicle with regNo */
	park: function (totalParkings, parkingArr, input) {
		if (totalParkings > 0) {
			if (findParking(parkingArr) == true) {
				for (var i = 0; i < parkingArr.length; i++) {
					if (parkingArr[i][i] == null) {
						var inp = input.split(" ")[1];
						parkingArr[i][i] = inp;
						i = i + 1;
						return i;
					}
				}
			} else {
				return null;
			}
		} else {
			return null;
		}
	},
	leave: function (totalParkings, parkingArr, input) {

		if (totalParkings > 0) {
			var regNo = input.split(" ")[1];
			var hours = input.split(" ")[2];
			var index = findParkingIndex(parkingArr, regNo);

			if (index > -1 && index <= parkingArr.length) {
				let leaveParking = {};
				parkingArr[index][index] = null;
				leaveParking.regNo = regNo;
				leaveParking.charge = calculateCharge(parseInt(hours));
				leaveParking.slotNumber = index + 1;
				return leaveParking;
			}
		} else {
			return null;
		}
	},
	status: function (totalParkings, parkingArr) {
		var arr = new Array();
		if (totalParkings > 0) {
			arr.push("Slot No.  Registration No.");
			for (var i = 0; i < parkingArr.length; i++) {
				if (parkingArr[i][i] != null) {
					arr.push(i + 1 + ".  " + '\t' + parkingArr[i][i].split(":")[0]);
				}
			}
			return arr;
		} else {
			return [];
		}
	},
};

function findParking(parkingArr) {
	var ele = false;
	for (var i = 0; i < parkingArr.length; i++) {
		if (parkingArr[i][i] == null) {
			ele = true;
		}
	}
	return ele;
}

function findParkingIndex(parkingArr, input) {
	let index = -1;
	for (let i = 0; i < parkingArr.length; i++) {
		if (parkingArr[i][i] && parkingArr[i][i].split(":")[0].replace('\r', '') == input) {
			return index = i;
		}
	}
	return index;
}

function calculateCharge(hours) {
	let charge = null;
	if (hours && hours === 2) {
		return charge = 10;
	} else if (hours && hours > 2) {
		let extraHours = hours - 2;
		return charge = extraHours * 10 + 10;
	} else {
		return charge
	}
}