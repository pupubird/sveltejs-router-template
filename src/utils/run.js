import { Route, params } from '@/components/stores.js';
function Run(moduleImportedPromise, obj) {
    moduleImportedPromise.then((m) => {
        params.set(obj || {});
        if (m.preload) {
            m.preload({ params }).then(() => {
                Route.set(m.default);
                window.scrollTo(0, 0);
            });
        } else {
            Route.set(m.default);
            window.scrollTo(0, 0);
        }
    });
}
export default function run(moduleImportedPromise) {
    return (obj) => Run(moduleImportedPromise, obj)
}