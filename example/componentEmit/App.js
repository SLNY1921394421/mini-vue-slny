import { h, createTextVNode } from "../../lib/guide-mini-vue.esm.js"
import { Foo } from "./Foo.js"

export default {
	name: 'App',
	setup() {
		return
	},
	render() {
		// emit
		// const foo = h(Foo, {
		// 	onAdd(a, b) {
		// 		console.log('onAdd', a, b)
		// 	},
		// 	onAddFoo() {
		// 		console.log('onAddFoo')
		// 	}
		// })

		// slot
		// const foo = h(Foo, {}, [h('p', {}, '123'), h('p', {}, '456')]);
		// const foo = h(Foo, {}, h('p', {}, '123'));
		// const foo = h(Foo, {}, {
		// 	header: h('p', {}, 'header'),
		// 	footer: h('p', {}, 'footer')
		// })

		const foo = h(Foo, {}, {
			header: ({ age }) => [
				h('p', {}, 'header' + age),
				createTextVNode('你好呀！！！')
			],
			footer: () => h('p', {}, 'footer')
		})

		return h("div", {}, [h("div", {}, "app"), foo])
	}
}