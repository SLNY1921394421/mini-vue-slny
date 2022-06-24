import h from '../lib/guide-mini-vue.esm.js';
export default {
	render() {
		h("div", 'hello,' + this.msg)
	},
	setup() {
		return {
			msg: 'mini-vue3'
		}
	}
}