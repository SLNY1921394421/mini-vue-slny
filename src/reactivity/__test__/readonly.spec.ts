import { readonly } from "../reactive";

describe("readonly", () => {
	it("happy path", () => {
		const original = {foo: 1, bar: { baz: 2 }};
		const warped = readonly(original);
		expect(warped).not.toBe(original);
		expect(warped.foo).toBe(1);
	})
})