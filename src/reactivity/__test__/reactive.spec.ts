import { reactive } from "../reactive";

describe("reactive", () => {
	it("happy path", () => {
		const original = { foo: 1 };
		const obverseOriginal = reactive(original);

		expect(obverseOriginal).not.toBe(original);
		expect(obverseOriginal.foo).toBe(1)
	})
})