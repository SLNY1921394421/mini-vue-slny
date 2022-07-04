import { cameLize, toHanderKey } from "../shared";

export function emit(instance, event, ...args) {
	// console.log('emit add');
	const { props } = instance;



	const handerName = toHanderKey(cameLize(event))

	const hander = props[handerName];
	hander && hander(...args);
}