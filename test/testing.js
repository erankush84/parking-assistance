/* global describe, it, before */

var server = require('../server.js');
var assert = require('chai').assert;
var fs = require('fs');
var utils = require("../utils.js");

var commands = [];
var totalParkings;
var parkingArr = [];

describe('server', function () {
      before(function () {
            server.listen(8080);
      });

      after(function () {
            server.close();
      });
});

describe('File reading test', function () {
      it('Read test input', function (done) {
            fs.readFile('./test/sample_data.txt', 'utf-8', function (err, data) {
                  if (err) {
                        throw "Unable to read file";
                  }
                  commands = JSON.parse(JSON.stringify(data)).split("\n");
                  done();
            });
      });

      it('Checking Commands', function (done) {
            assert.equal(commands[0].split(" ")[0], "create_parking_lot");
            assert.equal(commands[1].split(" ")[0], "park");
            assert.equal(commands[7].split(" ")[0], "leave");
            assert.equal(commands[8], "status\r");
            done();
      });
});

describe("Testing Functions", function () {
      it('Create a Parking lot', function (done) {
            totalParkings = utils.create_parking_lot(commands[0]);
            for (var i = 0; i < totalParkings; i++) {
                  var obj = new Object();
                  obj[parseInt(i)] = null;
                  parkingArr.push(obj);
            }
            assert.equal(totalParkings, 6);
            assert.equal(parkingArr.length, 6);
            done();
      });

      it('Allocating parking slot 1', function (done) {
            var ele = utils.park(totalParkings, parkingArr, commands[1]);
            assert.equal(ele, 1, 'these numbers are equal');
            done();
      });

      it('Allocating parking slot 2', function (done) {
            var ele = utils.park(totalParkings, parkingArr, commands[2]);
            assert.equal(ele, 2);
            done();
      });

      it('Allocating parking slot 3', function (done) {
            var ele = utils.park(totalParkings, parkingArr, commands[3]);
            assert.equal(ele, 3);
            done();
      });

      it('Allocating parking slot 4', function (done) {
            var ele = utils.park(totalParkings, parkingArr, commands[4]);
            assert.equal(ele, 4);
            done();
      });

      it('Allocating parking slot 5', function (done) {
            var ele = utils.park(totalParkings, parkingArr, commands[5]);
            assert.equal(ele, 5);
            done();
      });

      it('Allocating parking slot 6', function (done) {
            var ele = utils.park(totalParkings, parkingArr, commands[6]);
            assert.equal(ele, 6);
            done();
      });

      it('Leaving KA-01-HH-3141 in 4 hours with charge 30', function (done) {
            var obj = { regNo: 'KA-01-HH-3141', charge: 30, slotNumber: 6 };
            var ele = utils.leave(totalParkings, parkingArr, commands[7]);
            assert.deepEqual(ele, obj)
            done();
      });

      it('Checking status', function (done) {
            var ele = utils.status(totalParkings, parkingArr);
            assert.equal(ele.length, 6);
            done();
      });

      it('Allocating parking slot 6. Should Reallocate the nearest empty postion 6', function (done) {
            var ele = utils.park(totalParkings, parkingArr, commands[9]);
            assert.equal(ele, 6);
            assert.notEqual(ele, 7);
            done();
      });

      it('Allocating parking slot. Should indicate Parking is full.', function (done) {
            var ele = utils.park(totalParkings, parkingArr, commands[10]);
            assert.equal(ele, null);
            assert.notEqual(ele, 8);
            done();
      });
});