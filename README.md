# 🧭 Sveltejs Router Template

A declarative router for Sveltejs, no component importing required. Now with PWA support! 🥳

## 📃 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)
- [Deploy](#deploy)

## 💡 About <a name = "about"></a>

A Sveltejs template with built-in declarative routers, no component importing needed, just call `<a href="">` as many times you want! 😎

## 🔥 Getting Started <a name = "getting_started"></a>

Run `npx degit pupubird/sveltejs-router-template .` to clone this template locallly!

### Installing

Simply run:

```bash
npm install
```

This repo is configured with `sirv` with SPA mode, hence simply run:

### Development

```bash
npm run dev
```

### Build

To generate production build, run:

```bash
npm run build
```

Do note that this is a Single-Page-Application, hence you will have to enable SPA mode for your server, `sirv` had been installed in this package hence you can run `sirv public --single` ( or `npm run start` ) to serve the files in SPA mode

### Serve

```bash
npm run start
```

You should see a server spun up in your localhost!

### PWA

To eject PWA mode, simply run the command `DISABLE_PWA=true npm run build`

## 🛠 Usage <a name = "usage"></a>

This template is made with the philosophy of Encapsulation, all units should be able to deploy anywhere.

A sample file for the unit's routes is inside `/src/routes.sample.js`. Simply copy that file and paste it into your unit's folder!

After that, if it's a first-level router ( such as the routes inside `/event` in this template ), add it in the `/src/routes.js` as shown in this template.

And that's it! 🥳 no need to import any sveltejs routing component and you get routing for free!

### routes.js

An example of a `routes.js` is as below:

```javascript
import run from "@/utils/run";
import Router from "@/utils/generateRouter";

// Another `routes.js` file
import EventFutureRouter from './futureEvent/routes';

let ROUTES = [
    // Current routes go here
    ['/', run(import("./Index.svelte"))],

    // Alternatively, use pattern
    ['/:event_id', run(import('./Index.svelte')]
]
export default Router(ROUTES, [ // Optional
    // All child routers go here
    // Which, is another `routes.js` file
    ['/future', EventFutureRouter]
])
```

1. `@/` is an alias that I created pointing to `src/`, it will be replace by rollup from `@/` into `src/` as absolute path, so you won't need to do long relative import anymore.
2. `Router` function will return a function for the parent to adjust it's base url, so as a child router you won't need to worry about putting all the base url --- it's all relative url!

And that's all about routes.js! You can even do it recursively!
Once you had done the setup, in the future if you would only just want to test out this particular unit, just drag and drop it and it will work as expected ( as there will be no more worried on routing modification! )!

### rootRoutes.js

An example of `rootRoutes.js` is as below:

```javascript
/*
 Global router, see routes.sample.js if you would like to create new routes in folder.
*/
import Navaid from "navaid";
import HomeRouter from '@/home/routes'
import EventRouter from '@/event/routes'
import ProfileRouter from '@/profile/routes'

const router = Navaid("/");

// Add first-level child routers here
[
    ...HomeRouter(''),
    ...EventRouter('/event'),
    ...ProfileRouter('/profile')
].map(route => {
    router.on(route[0], route[1])
})


export default router
```

- The main difference between a `rootRoutes.js` and `routes.js` is, `rootRoutes.js` is the **root of all the routes**, and a `routes.js` are the **children** of the `rootRoutes.js`

- You do **NOT** need to include the routers of all the child routers, only **first-level** child routers are required to import.

### Routing pattern

For more information on how to achive pattern-base routing ( e.g. `/users/:id` ), please refer to [Navaid pattern](https://github.com/lukeed/navaid#pattern)

To access to the params ( e.g.: The `/:id` ):

```html
<script>
    import { params } from "@/components/stores.js";

    // Accessing to the Route component directly is also possible
    // You can think of route component be the <body> tag of the web app
	// import { Route, params } from "@/components/stores.js";

</script>
```

## 🚀 Deploy <a name = "deploy"></a>

### With [Vercel](https://vercel.com/)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

run `vercel` to configure your credential, else you do not have an account, simply go to their website and sign up one!

then, simply run:

```bash
vercel deploy
```

And configure each settings to your own preferences.
