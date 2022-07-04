import { h, renderSlots } from "../../lib/guide-mini-vue.esm.js"

export const Foo = {
	/**
	 * // emit
	setup(props, { emit }) {
		const emitAdd = () => {
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
	*/
	// slot
	setup() {
		return {}
	},
	render() {
		const foo = h('p', {}, 'foo')
		console.log(this.$slots)
		const age = 18;
		return h('div', {}, [renderSlots(this.$slots, 'header', {
			age
		}),
		foo,
		renderSlots(this.$slots, 'footer')
	])
	}
}