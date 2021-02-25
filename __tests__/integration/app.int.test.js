const { it } = require('@jest/globals');
const { createBeverages } = require('../../createBeverage');
const input = require('../../input.json');


describe("createBeverage", () => {
	it("should return Response", () => {
		console.log('--------final response-------');
		console.log(createBeverages(input));
		console.log('--------final response---end----');
		expect(createBeverages(input) instanceof Array).toBe(true);
		expect(createBeverages(input).length).not.toBe(0);
	})
})
