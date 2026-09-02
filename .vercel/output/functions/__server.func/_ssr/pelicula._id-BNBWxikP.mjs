import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as Route$3 } from "./router-B0ak4PzA.mjs";
import { t as DetalleSkeleton } from "./Skeletons-D9bSW7Ls.mjs";
import { a as obtenerPelicula } from "./api-B8lcdUtq.mjs";
import { t as FichaMedia } from "./FichaMedia-BTgHXsfx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pelicula._id-BNBWxikP.js
var import_jsx_runtime = require_jsx_runtime();
function PeliculaPage() {
	const { id } = Route$3.useParams();
	const query = useQuery({
		queryKey: ["pelicula", id],
		queryFn: () => obtenerPelicula(Number(id))
	});
	if (query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetalleSkeleton, {});
	if (query.isError || !query.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-4 py-20 text-center text-sm text-danger",
		children: "No se encontró esta película."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FichaMedia, {
		media: query.data,
		tipo: "movie"
	});
}
//#endregion
export { PeliculaPage as component };
