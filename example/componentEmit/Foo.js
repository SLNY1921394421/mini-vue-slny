import { h } from "../../lib/guide-mini-vue.esm.js"

export const Foo = {
	setup(props, { emit }) {
		const emitAdd = () => {
			console.log('emit add');
			emit('add', 1, 2);
			emit('add-foo')
		}
		return {
			emitAdd,
		}
	},
	render() {
		const Btn = h("button", {
			onClick: this.emitAdd
		}, 'emitAdd')
		const Foo = h("p", {}, "foo")
		return h("div", {}, [Foo, Btn])
	}
}