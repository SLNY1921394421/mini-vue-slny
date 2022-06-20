export const extend = Object.assign;

// 判断是否为对象
export const isObject = (val) => {
	return val !== null && typeof val === 'object';
}