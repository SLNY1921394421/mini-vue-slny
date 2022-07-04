import { shallowReadonly } from "../reactivity/reactive";
import { emit } from "./componentEmit";
import { initProps } from "./componentProps";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";

export function createComponentInstance(vnode) {
	const component = {
		type: vnode.type,
    vnode,
		setupState: {},
		emit: () => {}
	}
	component.emit = emit.bind(null, component) as any
	return component;
}

export function setupComponent(instance) {
	// @TODO
	// initSlots()

	initProps(instance, instance.vnode.props);
	setupStatefulComponent(instance )
}

function setupStatefulComponent(instance: any) {
	instance.proxy =  new Proxy({_: instance}, PublicInstanceProxyHandlers)
	const Component = instance.type;
	const { setup } = Component
	if(setup) {
		const setupResult = setup(shallowReadonly(instance.props), {
			emit: instance.emit
		})
		handleSetupResult(instance, setupResult)
	}
}
function handleSetupResult(instance, setupResult: any) {
	// @TODO function和object两种
	if(typeof setupResult === 'object') {
		instance.setupState = setupResult
	}

	finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
	const Component = instance.type;
	// if(Component.render) {
		instance.render = Component.render
	// }
}

