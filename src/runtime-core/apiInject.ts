import { getCurrentInstance } from "./component";

export function provide (key, value) {
	const currentInstance: any = getCurrentInstance()
	if(currentInstance) {
		let { provides } = currentInstance;
		const parentProvides = currentInstance.parent.provides;
		// init
		if(provides === parentProvides) {
			provides = currentInstance.provides = Object.create(parentProvides);
		}
		provides[key] = value;
	}
};

export function inject(key, defaultVal) {
	const currentInstance: any = getCurrentInstance();
	if(currentInstance) {
		const parentProvides = currentInstance?.parent?.provides;
		if(key in parentProvides) {
			return parentProvides[key];
		} else if(defaultVal) {
			if(typeof defaultVal === 'function') {
				return defaultVal();
			}
			return defaultVal;
		}
	}
}