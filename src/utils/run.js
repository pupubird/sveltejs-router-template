import { Route, params } from '@/components/stores.js';
export default function run(moduleImportedPromise, obj) {
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