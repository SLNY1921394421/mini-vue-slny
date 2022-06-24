import { isObject } from "../shared";
import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
	patch(vnode, container);
}

/**
 * @description 两种
 * @param vnode
 * @param container
 */
function patch(vnode, container) {
	if(typeof vnode.type === 'string') {
		processElement(vnode, container)
	} else if(isObject(vnode.type)) {
		processComponent(vnode, container)
	}
}


function processComponent(vnode: any, container: any) {
	mountComponent(vnode, container)
}

function mountComponent(vnode: any, container) {
	const instance = createComponentInstance(vnode)
	setupComponent(instance)
	setupRenderEffect(instance, container)
}

function setupRenderEffect(instance: any, container) {
	const subTree = instance.render()
	patch(subTree, container)
}

function processElement(vnode: any, container: any) {
	mountElement(vnode, container)
}

function mountElement(vnode: any, container: any) {
	const el = document.createElement(vnode.type);
	const { children, props } = vnode;
	el.textContent = children;
	for (const key in props) {
		const val = props[key];
		el.setAttribute(key, val);
	}
	container.append(el);
}

