# Development
> Notes for developers


## Structure

This project deviates from the typical Vue CLI quickstart app. Part of the intention here is to show to add Vue to an existing HTML page without rewriting the site as a Node app.

Some content has been added directly to [index.html](/index.html) outside of the app, since it is fixed and improves the loading experience of app. And therefore the CSS has been adjusted to be on `body` and not `#app`.

See [About](about.md) for more info on the template's structure.

## Vue source

Find the latest Vue releases:

- https://github.com/vuejs/vue-next/releases

Then update the [main.js](/assets/js/main.js) script with your version.

Browse the available builds on Unpkg CDN for a target version e.g.

- `3.0.7` - https://unpkg.com/browse/vue@3.0.7/dist/
- `3.2` - https://unpkg.com/browse/vue@3.2/dist/ (redirects to `3.2.2` or similar)

The `vue.esm-browser.js` build was selected for this project - to get ES Module to load in the browser and because it includes a template compiler which is needed on the frontend.

Using `vue.runtime.esm-browser.js` gave an error:

    [Vue warn]: Component provided template option but runtime compilation is not supported in this build of Vue. Use "vue.esm-browser.js" instead.
    at <App> vue.runtime.esm-browser.js:1186:17

Also, I tried using JSPM for CDN but gave errors importing Vue - switching to unpkg with ESModule type was fine.


## Dev tooling

To prettify your JS, you can run `npx prettier -w .` (to reference a global install or to download the latest). Or use your IDE to prettify your script. You can do the same for linting with `npx eslint .` or you IDE.

Maybe you want the dev tooling you're used to (linting, minification, using `.vue` files, running tests, TypeScript). Or have a large site. Then a traditional Node and NPM approach to Vue might suit your needs better. In that case, use this repo:

- [![MichaelCurrin - vue-quickstart](https://img.shields.io/static/v1?label=MichaelCurrin&message=vue-quickstart&color=blue&logo=github)](https://github.com/MichaelCurrin/vue-quickstart)


## Multi-page site

If you want a multi-page site, you can still do this with the frontend-only approach (i.e. no Node).

Some ideas:

- Add Vue Router.
- Use multiple HTML pages, each with a different app to mount.
- Use a static site generator like Jekyll or Hugo to generate your HTML pages.
