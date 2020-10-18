import run from "@/utils/run";
import Router from "@/utils/generateRouter";
import FutureEventSettingsRouter from './settings/routes';

let ROUTES = [
    // Current routes go here
    ['/', () => run(import("./Index.svelte"))]
]
export default Router(ROUTES, [ // Optional 
    // All sub-routers go here
    ['/settings', FutureEventSettingsRouter]
])