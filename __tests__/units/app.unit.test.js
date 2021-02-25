const { createBeverages, startCreatingBeverages, checkAllIncridentsAvailbility } = require('../../createBeverage');
const input = require('../../input.json');

describe("createBeverage", () => {
	it("should have a startCreatingBeverages functiion", () => {
		expect(typeof createBeverages).toBe('function')
	})
	it("should return a array with input json", () => {
		expect(createBeverages(input) instanceof Array).toBe(true);
		expect(createBeverages(input).length).not.toBe(0);
	})
	it("should return blank array if no inputjson is passed", () => {
		expect(createBeverages() instanceof Array).toBe(true);
		expect(createBeverages().length).toBe(0);
	})
})

describe("startCreatingBeverages", () => {
	it("start creating startCreatingBeverages", () => {
		expect(typeof startCreatingBeverages).toBe('function')
	})
	it("should return blank array if incredentsQuantity is undefined", () => {
		let incredentsQuantity = undefined;
		let beveragesOrders = input.machine.beverages;
		expect(startCreatingBeverages(incredentsQuantity, beveragesOrders) instanceof Array).toBe(true);
		expect(startCreatingBeverages(incredentsQuantity, beveragesOrders).length).toBe(0);
	})
	it("should return blank array if beveragesOrders is undefined", () => {
		let incredentsQuantity = input.machine.total_items_quantity;
		let beveragesOrders = undefined;
		expect(startCreatingBeverages(incredentsQuantity, beveragesOrders) instanceof Array).toBe(true);
		expect(startCreatingBeverages(incredentsQuantity, beveragesOrders).length).toBe(0);
	})
	it("should return array if both input are defined", () => {
		let incredentsQuantity = input.machine.total_items_quantity;
		let beveragesOrders = input.machine.beverages;
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
		};
		expect(response instanceof Array).toBe(true);
		expect(response.length).not.toBe(0);
	})
})


describe("checkAllIncridentsAvailbility", () => {
	it("checkAllIncridentsAvailbility", () => {
		expect(typeof startCreatingBeverages).toBe('function')
	})
	it("should return blank array if incredentsQuantity is undefined", () => {
		let incredentsQuantity = undefined;
		let beverage = {
			"green_tea": {
				"hot_water": 100,
				"ginger_syrup": 30,
				"sugar_syrup": 50,
				"green_mixture": 30
			}
		};

		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).ingridentInsufficient instanceof Array).toBe(true);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).ingridentInsufficient.length).toBe(0);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).incridentsNotAvailable instanceof Array).toBe(true);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).incridentsNotAvailable.length).toBe(0);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).incredentsQuantity).toBeUndefined();
	})
	it("should return blank array if beverage is undefined", () => {
		let incredentsQuantity = input.machine.total_items_quantity;
		let beverage = undefined;
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).ingridentInsufficient instanceof Array).toBe(true);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).ingridentInsufficient.length).toBe(0);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).incridentsNotAvailable instanceof Array).toBe(true);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).incridentsNotAvailable.length).toBe(0);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).incredentsQuantity).toEqual(incredentsQuantity);
	})
	it("should return data in incridentsNotAvailable if beverage incrident is not availabe in machine", () => {
		let incredentsQuantity = {
			"hot_water": 300,
			"hot_milk": 500,
			"ginger_syrup": 100,
			"sugar_syrup": 100,
			"tea_leaves_syrup": 100
		};
		let beverage = {
			"hot_water": 100,
			"ginger_syrup": 30,
			"sugar_syrup": 50,
			"green_mixture": 30
		};
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).ingridentInsufficient instanceof Array).toBe(true);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).ingridentInsufficient.length).toBe(0);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).incridentsNotAvailable instanceof Array).toBe(true);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).incridentsNotAvailable.length).not.toBe(0);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).incredentsQuantity).toEqual(incredentsQuantity);
	})

	it("should return data in ingridentInsufficient if beverage ingrident is not sufficient in machine", () => {
		const incredentsQuantity = {
			"hot_water": 50,
			"hot_milk": 500,
			"ginger_syrup": 100,
			"sugar_syrup": 100,
			"tea_leaves_syrup": 100
		};
		const beverage = {
			"hot_water": 100,
			"ginger_syrup": 30,
			"sugar_syrup": 50,
			"hot_milk": 30
		};
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).incridentsNotAvailable instanceof Array).toBe(true);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).incridentsNotAvailable.length).toBe(0);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).ingridentInsufficient instanceof Array).toBe(true);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).ingridentInsufficient.length).not.toBe(0);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).incredentsQuantity).toEqual(incredentsQuantity);
	})
	it("should return data in beverage incrident is availabe in machine", () => {
		const incredentsQuantity = {
			"hot_water": 100,
			"hot_milk": 500,
			"ginger_syrup": 100,
			"sugar_syrup": 100,
			"tea_leaves_syrup": 100
		};
		const beverage = {
			"hot_water": 100,
			"ginger_syrup": 30,
			"sugar_syrup": 50,
			"hot_milk": 30
		};
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).incridentsNotAvailable instanceof Array).toBe(true);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).incridentsNotAvailable.length).toBe(0);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).ingridentInsufficient instanceof Array).toBe(true);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).ingridentInsufficient.length).toBe(0);
		expect(checkAllIncridentsAvailbility(incredentsQuantity, beverage).incredentsQuantity).toEqual({
			"hot_water": 0,
			"ginger_syrup": 70,
			"sugar_syrup": 50,
			"hot_milk": 470,
			"tea_leaves_syrup": 100
		});
	})
})