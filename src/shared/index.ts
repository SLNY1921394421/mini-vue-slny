export const extend = Object.assign;

// 判断是否为对象
export const isObject = (val) => {
	return val !== null && typeof val === 'object';
}

// 判断值是否改变
export const hasChanged = (val, newVal) => {
	return !Object.is(val, newVal)
}

export const cameLize = (str: string) => {
	return str.replace(/-(\w)/g, (_, c: string) => {
		return c ? c.toUpperCase() : "";
	})
}

export const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export const toHanderKey = (str: string) => {
	return str ? `on${capitalize(str)}` : ''
}