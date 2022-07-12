import { h, getCurrentInstance, } from "../../lib/guide-mini-vue.esm.js"
import { Foo } from "./Foo.js";

export default {
	name: 'App',
	setup() {
		const instance = getCurrentInstance();
		console.log('App', instance)
	},
	render() {
		return h('div', {}, [h('p', {}, "currentInstance demo"), h(Foo)])
	}
}