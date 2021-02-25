'use strict';

const { CustomConsole } = require('@jest/console');
let input = require('./input.json');

let checkAllIncridentsAvailbility = (incredentsQuantity, beverage) => {
	let ingridentInsufficient = [];
	let incridentsNotAvailable = [];
	let toRevertbackIncrident;
	let totalIngridents;
	if (incredentsQuantity) {
		toRevertbackIncrident = JSON.parse(JSON.stringify(incredentsQuantity))
		totalIngridents = JSON.parse(JSON.stringify(incredentsQuantity));
	}
	let flag = false;
	if (totalIngridents && beverage) {
		for (const incrident in beverage) {
			if (totalIngridents[incrident]) {
				if (totalIngridents[incrident] >= beverage[incrident]) {
					totalIngridents[incrident] -= beverage[incrident];
				} else {
					ingridentInsufficient.push(incrident);
					flag = true;
				}
			} else {
				incridentsNotAvailable.push(incrident)
				flag = true;
			}
		}
	}
	if (flag) {
		totalIngridents = toRevertbackIncrident;
	}
	return {
		incredentsQuantity: totalIngridents,
		ingridentInsufficient,
		incridentsNotAvailable
	}
}

let startCreatingBeverages = (incredentsQuantity, beveragesOrders) => {
	let response = []
	if (incredentsQuantity && beveragesOrders) {
		let checkIncAvailable = {
			incredentsQuantity,
			ingridentInsufficient: [],
			incridentsNotAvailable: []
		}
		for (const beverage in beveragesOrders) { // Can also do by recursive method
			checkIncAvailable = checkAllIncridentsAvailbility(checkIncAvailable.incredentsQuantity, beveragesOrders[beverage]);
			if (checkIncAvailable.ingridentInsufficient.length === 0 && checkIncAvailable.incridentsNotAvailable == 0) {
				// TODO: for actual machine create Order;
				response.push(`${beverage} is prepared`);
			} else {
				if (checkIncAvailable.ingridentInsufficient.length && checkIncAvailable.incridentsNotAvailable.length) {
					response.push(`${beverage} cannot be prepared because ${checkIncAvailable.incridentsNotAvailable.toString()} is not available and ${checkIncAvailable.ingridentInsufficient.toString()} is not sufficient`);
				} else if (checkIncAvailable.ingridentInsufficient.length) {
					response.push(`${beverage} cannot be prepared because ${checkIncAvailable.ingridentInsufficient.toString()} is not sufficient`);
				} else if (checkIncAvailable.incridentsNotAvailable.length) {
					response.push(`${beverage} cannot be prepared because ${checkIncAvailable.incridentsNotAvailable.toString()} is not available`);
				}
			}
		}
		return response;
	};
	return response
}

let createBeverages = (input) => {
	if (input) {
		let incredentsQuantity = input.machine.total_items_quantity;
		let beveragesOrders = input.machine.beverages;
		return startCreatingBeverages(incredentsQuantity, beveragesOrders)
	}
	return [];
}

module.exports = {
	createBeverages,
	startCreatingBeverages,
	checkAllIncridentsAvailbility
}
