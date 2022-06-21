import { isProxy, isReactive, reactive } from "../reactive";

describe("reactive", () => {
	it("happy path", () => {
		const original = { foo: 1 };
		const obverseOriginal = reactive(original);

		expect(obverseOriginal).not.toBe(original);
		expect(obverseOriginal.foo).toBe(1);
		expect(isReactive(obverseOriginal)).toBe(true);
		expect(isReactive(original)).toBe(false);
		expect(isProxy(obverseOriginal)).toBe(true);
	});
	test("nested", () => {
		const original = {
			nested: {
				foo: 1,
			},
			array: [{ bar: 2 }],
		};

		const observed = reactive(original);

		expect(isReactive(observed.nested)).toBe(true);
		expect(isReactive(observed.array)).toBe(true);
		expect(isReactive(observed.array[0])).toBe(true);
	});
})