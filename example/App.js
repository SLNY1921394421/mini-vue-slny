export const App = {
	render() {
		h("div", 'hello,' + this.msg)
	},
	setup() {
		return {
			msg: 'mini-vue3'
		}
	}
}