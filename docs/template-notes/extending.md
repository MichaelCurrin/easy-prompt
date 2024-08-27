# Extending
> Ideas for what to do next after you've made a project from this template


## Add functionality

To make the app more interactive, see code samples in the [Getting Started](https://v3.vuejs.org/guide/introduction.html#getting-started) docs.


## Components

To load components on the frontend as `.vue` files, see my [No build step](https://michaelcurrin.github.io/code-cookbook/recipes/javascript/packages/vue/no-build-step.html) guide. That also makes it easier to use scoped CSS.

Though, if you have a couple of components or your entire site is Vue pages (compared with adding Vue to HTML), then consider structuring your application as a Vue Node app that uses Vue CLI for developing tooling and optimized production builds (like for compiling and minifying).


## Optimize

If you have a site with a small amount of JS code and files, then using this frontend approach might suit you fine. You won't get much benefit out of bundling and minifying your scripts if the volume is small. Though maybe you'll get a benefit out of bundling external Vue code in your own bundle.

For a production app, add the following to the URL when loading Vue: `.prod.js`.

If you have a larger project, consider using the Vue CLI approach as covered in [Related projects](#related-projects).

If you want to avoid structuring your project as a Node project but you want some production-optimization, consider using [Deno](https://deno.land/). See tips for [Migrating from Node to Deno](https://michaelcurrin.github.io/dev-resources/resources/javascript/deno/).
