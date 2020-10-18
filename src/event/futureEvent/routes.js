import run from "@/utils/run";
import Router from "@/utils/generateRouter";
import FutureEventSettingsRouter from './settings/routes';

let ROUTES = [
    // Current routes go here
    ['/', () => run(import("./Index.svelte"))]
]
export default Router(ROUTES, [ // Optional 
    // All sub-routers go here

    // You are free to decide if it worth to be a sub-router
    ['/settings', FutureEventSettingsRouter]
])