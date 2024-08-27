# Structure

## Minimum

You could even mix your JS and CSS into one HTML file, if you wanted to only have one file. But you'll probably want to separate those for easier management.

A Vue frontend project only needs 3 files to run, as set up in this template:

- [index.html](/index.html)
    - HTML homepage.
    - Loads the JS and CSS.
- [assets/js/main.js](/assets/js/main.js)
    - The app logic in a JS script.
    - This loads dependencies, constructs the app and then mounts it on an element in the body. The demo components are based on the [Introduction](https://v3.vuejs.org/guide/introduction.html) tutorial on the Vue 3 docs. But without IDs - as those are for the app level rather than reusable component level.
- [assets/css/styles.css](/assets/css/styles.css)
    - Some minimal CSS styling, to match the Vue CLI quickstart app.

## Logo

The [assets](/assets/) directory was set up with a logo, to match the structure and appearance of the Vue CLI quickstart app. But you can delete that on your copy of this template.

## JS modules

See also the [assets/js/ConsumeApi.js](/assets/js/ConsumeApi.js) module.

This file exists to show how the `main.js` file loaded on the frontend will then fetch another
module and import it. So the `import` statements works on the frontend similarly to running in a
Node app.

This means you can spread your Vue components or views out across a few files, instead of all in a
single long JS file. This spreading of modules is done at the cost of loading each file separately
rather than a single bundled (and possibly minified) file. But should hopefully be negligible for
small and simple projects.
