import { h } from '../lib/guide-mini-vue.esm.js';
import { Foo } from './Foo.js';
window.self = null;
export default {
	name: 'App',
	render() {
		window.self = this;
		return h("div",
		{
			id: "root",
			class: ["red", "blue"],
			onClick: () => {
				console.log('onClick')
			},
			onMouseout: () => {
				console.log('onmouseout')
			}
		},
		// string

		// 'hello, mini-vue'
		// 'hello,' + this.msg

		// array
		[h("div", {}, 'hi' + this.msg), h(Foo, {count: 1})]
		// [h("p", { class: 'red'}, 'hi'), h("p", { class: "blue" }, "mini-vue")]
		)
	},
	setup() {
		return {
			msg: 'mini-vue3'
		}
	}
}