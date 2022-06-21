import { hasChanged, isObject } from "../shared";
import { isTracking, trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";

class refImp {
	private _value: any;
	public dep;
	private _rawValue: any;
	public __v_isRef = true;
	constructor(value) {
		this._rawValue = value
		this._value = convert(value);
		this.dep = new Set();
	}
	get value() {
		trackRefValue(this)
		return this._value;
	}

	set value(newValue) {
		// 重复值判断
		// if(Object.is(this._value, newValue)) return;
		// if(!hasChanged(this._value, newValue)) return
		if(hasChanged(this._rawValue, newValue)) {
			this._rawValue = newValue;
			this._value = convert(newValue);
			triggerEffects(this.dep);
		}

		// return newValue;
	}
};

function convert(value) {
	return isObject(value) ? reactive(value) : value;
};

function trackRefValue(ref) {
	if(isTracking()) {
		trackEffects(ref.dep);
	}
};

export function ref(value) {
	return new refImp(value);
};

// 检查值是否为一个 ref 对象
export function isRef(ref) {
	return !!ref.__v_isRef;
}

// 如果参数是一个 ref，则返回内部值，否则返回参数本身
export function unRef(ref) {
	return isRef(ref) ? ref.value : ref
}