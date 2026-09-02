import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as Route$1 } from "./router-B0ak4PzA.mjs";
import { t as DetalleSkeleton } from "./Skeletons-D9bSW7Ls.mjs";
import { s as obtenerSerie } from "./api-B8lcdUtq.mjs";
import { t as FichaMedia } from "./FichaMedia-BTgHXsfx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/serie._id-CCsQDyZ9.js
var import_jsx_runtime = require_jsx_runtime();
function SeriePage() {
	const { id } = Route$1.useParams();
	const query = useQuery({
		queryKey: ["serie", id],
		queryFn: () => obtenerSerie(Number(id))
	});
	if (query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetalleSkeleton, {});
	if (query.isError || !query.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-4 py-20 text-center text-sm text-danger",
		children: "No se encontró esta serie."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FichaMedia, {
		media: query.data,
		tipo: "tv"
	});
}
//#endregion
export { SeriePage as component };
