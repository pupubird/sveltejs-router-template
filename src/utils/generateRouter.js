function Router(routes, extras) {
    // Generate a function that accepts a base parameter to append to routes
    return function (base) {
        extras && extras.map(r => {
            let router = r[1](base + r[0]);
            routes = [...routes, ...router];
        })
        routes = routes.map(route => {
            route[0] = base + route[0]
            return route
        })
        return routes
    }
}
export default Router