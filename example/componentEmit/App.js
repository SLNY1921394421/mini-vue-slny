import { h } from "../../lib/guide-mini-vue.esm.js"
import { Foo } from "./Foo.js"

export default {
	name: 'App',
	setup() {
		return
	},
	render() {
		return h("div", {}, [h("div", {}, "app"), h(Foo, {
			onAdd(a, b) {
				console.log('onAdd', a, b)
			},
			onAddFoo() {
				console.log('onAddFoo')
			}
		})])
	}
}