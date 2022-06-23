import { createComponetInstance, setupComponent } from "./component";

export function render(vnode, container) {
	patch(vnode, container);
}
// 后续递归处理
function patch(vnode, container) {
	processComponent(vnode, container)
}


function processComponent(vnode: any, container: any) {
	mountComponent(vnode, container)
}

function mountComponent(vnode: any, container) {
	const instance = createComponetInstance(vnode)
	setupComponent(instance)
	setupRenderEffect(instance, container)
}

function setupRenderEffect(instance: any, container) {
	const subTree = instance.render()
	patch(subTree, container)
}

