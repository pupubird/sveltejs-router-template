import run from "@/utils/run";
import Router from "@/utils/generateRouter";
import EventFutureRouter from './futureEvent/routes';

let ROUTES = [
    // Current routes go here
    ['/', () => run(import("./Index.svelte"))]
]
export default Router(ROUTES, [ // Optional 
    // All child routers go here
    ['/future', EventFutureRouter]
])