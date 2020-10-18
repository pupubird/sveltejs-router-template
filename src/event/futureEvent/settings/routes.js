import run from "@/utils/run";
import Router from "@/utils/generateRouter";

let ROUTES = [
    ['/', () => run(import("./Index.svelte"))]
]
export default Router(ROUTES)