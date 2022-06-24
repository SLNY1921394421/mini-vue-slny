import { h } from '../lib/guide-mini-vue.esm.js';
export default {
	render() {
		h("div",
		{
			id: "root",
			class: ["red", "hard"]
		},
		'hello,' + this.msg)
	},
	setup() {
		return {
			msg: 'mini-vue3'
		}
	}
}