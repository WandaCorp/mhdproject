import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useInfiniteSentinel-Dn_lx4fK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/** Observa un nodo sentinela para infinite scroll. */
function useInfiniteSentinel(onIntersect, enabled) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!enabled) return;
		const node = ref.current;
		if (!node) return;
		const obs = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting) onIntersect();
		}, { rootMargin: "600px 0px" });
		obs.observe(node);
		return () => obs.disconnect();
	}, [onIntersect, enabled]);
	return ref;
}
//#endregion
export { useInfiniteSentinel as t };
