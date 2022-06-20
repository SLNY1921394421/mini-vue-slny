import { track, trigger } from "./effect";

function createGetter(readonly = false) {
	return function get(target, key) {
		const res = Reflect.get(target, key);
		if(!readonly) {
			track(target, key);
		}
		return res;
	}
};

function createSetter() {
	return function set(target, key, value) {
		const res = Reflect.set(target, key, value);
		trigger(target, key);
		return res;
	}
};

export const mutableHandlers = {
	get: createGetter(),
	set: createSetter(),
}

export const readonlyHandlers = {
	get: createGetter(true),
		set(target, key, value) {
			return true
		}
}