import { h, provide, inject } from '../../lib/guide-mini-vue.esm.js';

const Provider = {
	name: 'Provider',
	setup() {
		provide('foo', 'fooVal');
		provide('bar', 'barVal');
	},
	render() {
		return h('div', {}, [h('p', {}, 'Provider'), h(ProviderTwo)]);
	},
};

const ProviderTwo = {
	name: 'Provider',
	setup() {
		provide('foo', 'fooTwo');
		const foo = inject('foo');
		return {
			foo,
		}
	},
	render() {
		return h('div', {}, [h('p', {}, `ProviderTwo foo: ${this.foo}`), h(Constomer)]);
	},
};

const Constomer = {
	name: 'Constomer',
	setup() {
		const foo = inject('foo');
		const bar = inject('bar');
		const baz = inject('baz', () => 'bazVal');
		return {
			foo,
			bar,
			baz,
		}
	},
	render() {
		return h('div', {}, `Constomer: - ${this.foo} - ${this.bar} - ${this.baz}`)
	},
};

export default {
	name: 'App',
	setup() {},
	render() {
		return h('div', {}, [h('p', {}, 'apiInject'), h(Provider)]);
	},
}