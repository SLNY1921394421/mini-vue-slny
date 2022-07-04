import { isObject } from "../shared";
import { ShapeFlags } from "../shared/ShapeFlags";
import { createComponentInstance, setupComponent } from "./component";
import { Fragment, Text } from "./vnode";

export function render(vnode, container) {
	patch(vnode, container);
}

/**
 * @description 两种
 * @param vnode
 * @param container
 */
function patch(vnode, container) {
	const { shapeFlag, type } = vnode

	switch (type) {
		case Fragment:
			processFragment(vnode, container);
			break;
		case Text:
			processText(vnode, container);
			break;

		default:
			if(shapeFlag & ShapeFlags.ELEMENT) {
				processElement(vnode, container)
			} else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
				processComponent(vnode, container)
			}
			break;
	}
}

function processFragment(vnode: any, container: any) {
	mountChildren(vnode.children, container);
}

function processText(vnode: any, container: any) {
	const { children} = vnode;
	const textNode = (vnode.el = document.createTextNode(children));
	container.append(textNode);
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
		console.log(key)

		// 判断是否以on开头
		const isOn = (key: any) => /^on[A-Z]/.test(key);
		if(isOn(key)) {
			const event = key.slice(2).toLowerCase();
			el.addEventListener(event, val)
		} else {
			el.setAttribute(key, val);
		}

	}

	container.append(el);
}

function mountChildren(vnode, container) {
	vnode.forEach(v => {
		patch(v, container);
	})
}

