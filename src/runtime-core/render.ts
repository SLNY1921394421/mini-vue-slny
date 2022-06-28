import { isObject } from "../shared";
import { createComponentInstance, setupComponent } from "./component";
import { createVnode } from "./vnode";

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

function mountComponent(initialVNode: any, container) {
	const instance = createComponentInstance(initialVNode)
	setupComponent(instance)
	setupRenderEffect(initialVNode, instance, container)
}

function setupRenderEffect(initialVNode, instance: any, container) {
	const { proxy } = instance
	const subTree = instance.render.call(proxy)
	patch(subTree, container);
	initialVNode.el = subTree.el;
}

function processElement(vnode: any, container: any) {
	mountElement(vnode, container)
}

function mountElement(vnode: any, container: any) {
	const el = (vnode.el =  document.createElement(vnode.type));
	const { children, props } = vnode;
	if(typeof children === 'string') {
		el.textContent = children;
	} else if(Array.isArray(children)) {
		// children.forEach(v => {
		// 	patch(v, el);
		// })
		mountChildren(children, el)
	}

	for (const key in props) {
		const val = props[key];
		el.setAttribute(key, val);
	}
	container.append(el);
}

function mountChildren(vnode, container) {
	return vnode.forEach(v => {
		patch(v, container);
	})
}

