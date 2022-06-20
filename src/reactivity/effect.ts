import { extend } from "../shared";

extend
class ReactiveEffect {
	private _fn: any;
	deps = [];
	active = true;
	onStop?: () => void
	constructor(fn, public scheduler?) {
		this._fn = fn
	}
	run() {
		reactiveEffect = this
		return this._fn()
	}
	stop() {
		// this.deps.forEach((dep: any) => {
		// 	dep.delete(this)
		// })
		if(this.active) {
			cleanupEffect(this);
			if(this.onStop) {
				this.onStop()
			}
			this.active = false;
		}
	}
}

function cleanupEffect(effect) {
	effect.deps.forEach((dep: any) => {
		dep.delete(effect)
	})
}

let reactiveEffect;
export function effect(fn, options: any = {}) {
	const _effect = new ReactiveEffect(fn, options.scheduler)
	// _effect.onStop = options.onStop;
	// Object.assign(_effect, options)
	extend(_effect, options)
	_effect.run();
	const runner: any = _effect.run.bind(_effect);
	runner.effect = _effect;
	return runner;
}

// 收集依赖
const targetMap = new Map();

export function track(target, key) {
	let depsMap = targetMap.get(target)
	 if(!depsMap) {
		depsMap = new Map()
		targetMap.set(target, depsMap)
	}

	let dep = depsMap.get(key)
	if(!dep) {
		dep = new Set()
		depsMap.set(key, dep)
	}

	if(!reactiveEffect) return
	dep.add(reactiveEffect)
	reactiveEffect.deps.push(dep)
	// const deps = depsMap.get(key)
}

// 触发依赖
export function trigger(target, key) {
	let depsMap = targetMap.get(target);
	let dep = depsMap.get(key)
	for (const effect of dep) {
		if(effect.scheduler) {
			effect.scheduler()
		} else {
		effect.run();
	}
	}
}

export function stop(runner) {
	runner.effect.stop()
}