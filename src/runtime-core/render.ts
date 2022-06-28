import { isObject } from "../shared";
import { ShapeFlags } from "../shared/ShapeFlags";
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
	const { shapeFlag } = vnode
	if(shapeFlag & ShapeFlags.ELEMENT) {
		processElement(vnode, container)
	} else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
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
	const { children, props, shapeFlag } = vnode;
	if(shapeFlag & ShapeFlags.TEXT_CHILDREN) {
		el.textContent = children;
	} else if(shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
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

