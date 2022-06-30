import { isObject } from "../shared";
import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from "./baseHandlers";
// import { track, trigger } from "./effect";


export const enum ReactiveFlags {
	IS_REACTIVE = '__v-isReactive',
	IS_READONLY = '__v_isReadonly',
	RAW = '__v-raw',
}

export function reactive(raw) {
	// return new Proxy(raw, mutableHandlers)

	return createActiveObject(raw, mutableHandlers);

	// return new Proxy(raw, {
	// 	// get(target, key) {
	// 	// 	const res = Reflect.get(target, key);
	// 	// 	// 依赖收集
	// 	// 	track(target, key)
	// 	// 	return res;
	// 	// },

	// 	get: createGetter(),

	// 	// set(target, key, value) {
	// 	// 	const res = Reflect.set(target, key, value);
	// 	// 	// 触发依赖
	// 	// 	trigger(target, key)
	// 	// 	return res;
	// 	// },

	// 	set: createSetter()
	// })
};
export function shallowReadonly(raw) {
	return createActiveObject(raw, shallowReadonlyHandlers);
};

export function readonly(raw) {
	// return new Proxy(raw, readonlyHandlers)

	return createActiveObject(raw, readonlyHandlers);

	/**return new Proxy(raw, {
		// get(target, key) {
		// 	const res = Reflect.get(target, key);
		// 	return res;
		// },
		get: createGetter(true),
		set(target, key, value) {
			return true
		}
	})*/
};

function createActiveObject(target, baseHandlers) {
	if(!isObject(target)) {
		console.warn(`target ${target}必须是一个对象}`);
		return target;
	}
	return new Proxy(target, baseHandlers);
}

export function isReactive(value) {
	return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value) {
	return !!value[ReactiveFlags.IS_READONLY]
}

export function isProxy(value) {
	return isReactive(value) || isReadonly(value)
}