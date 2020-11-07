/*
 Global router, see routes.sample.js if you would like to create new routes in folder.
*/
import Navaid from "navaid";
import HomeRouter from '@/home/routes'
import EventRouter from '@/event/routes'
import ProfileRouter from '@/profile/routes'
import run from '@/utils/run';

const router = Navaid("/", run(import("./404.svelte")));

// Add first-level child routers here
[
    ...HomeRouter(''),
    ...EventRouter('/event'),
    ...ProfileRouter('/profile')
].map(route => {
    router.on(route[0], route[1])
});


export default router
