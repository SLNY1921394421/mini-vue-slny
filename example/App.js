import { h } from '../lib/guide-mini-vue.esm.js';
export default {
	render() {
		return h("div",
		{
			id: "root",
			class: ["red", "hard"]
		},
		// 'hello,' + this.msg
		'hello, mini-vue'
		)
	},
	setup() {
		return {
			msg: 'mini-vue3'
		}
	}
}