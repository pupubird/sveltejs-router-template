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

```bash
npm run dev
```

or

```bash
npm run start
```

You should see a server spun up in your localhost!

### Build

To generate production build, run:

```bash
npm run build
```

Do note that this is a Single-Page-Application, hence you will have to enable SPA mode for your server, `sirv` had been installed in this package hence you can run `sirv public --single` ( or `npm run start` ) to serve the files in SPA mode

### PWA

To eject PWA mode, simply run the command `DISABLE_PWA=true npm run build`

## 🛠 Usage <a name = "usage"></a>

This template is made with the philosophy of Encapsulation, all units should be able to deploy anywhere.
Hence, a general folder structure for a unit will be like this, with an example:

```folder
src
|_components - All your global components
|_config - All your custom configuration
|_utils - All global utils
|_App.svelte - Main app
|_index.js - Main script
|_routes.js - Global routes
|_<All your other units' folder> - e.g. profile, event, marketplace...
```

A sample file for the unit's routes is inside `/src/routes.sample.js`. Simply copy that file and paste it into your unit's folder!

After that, if it's a first-level router ( such as the routes inside `/event` in this template ), add it in the `/src/routes.js` as shown in this template.

And that's it! 🥳 no need to import any sveltejs routing component and you get routing for free!

### Routing pattern

For more information on how to achive pattern-base routing ( e.g. `/users/:id` ), please refer to [Navaid pattern](https://github.com/lukeed/navaid#pattern)

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
