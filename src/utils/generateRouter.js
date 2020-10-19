function Router(routes, extras) {
    // Generate a function that accepts a base parameter to append to routes
    return function (base) {
        routes = routes.map(route => {
            route[0] = base + route[0]
            return route
        })
        extras && extras.map(r => {
            let router = r[1](base + r[0]);
            routes = [...routes, ...router];
        })
        return routes
    }
}
export default Router