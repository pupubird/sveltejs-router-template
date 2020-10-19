import run from "@/utils/run";
import Router from "@/utils/generateRouter";

let ROUTES = [
    // Current routes go here
    ['/', () => run(import("./Index.svelte"))]
]
export default Router(ROUTES)