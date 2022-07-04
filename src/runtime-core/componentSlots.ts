import { ShapeFlags } from "../shared/ShapeFlags"

export function initSlots(instace, children) {
	const { vnode } = instace

	if(vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN) {
		normalizeObjectSlots(children, instace.slots)
	}
}

function normalizeObjectSlots(children: any, slots: any) {
	for (const key in children) {
		const value = children[key]
		slots[key] = (props) => normalizeSlots(value(props))
	}
}

function normalizeSlots(value) {
	return Array.isArray(value) ? value : [value]
}
