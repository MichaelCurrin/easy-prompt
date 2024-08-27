# Packages

[ES Modules][] are used in this project, which means packages are loaded in JS in the browser, using `import` syntax.

You don't have to check that `src` tags in HTML are adding stuff to the global namespace for your JS scripts to manage, instead you can import a package in a script right where it gets used. No HTML that needs validation.

There is no `package.json` for package management and `node_modules` to download and host.

There are also no dev dependencies to manage, which makes means fewer security vulnerabilities to patch and a smaller dependency tree to manage.

See [vue-quickstart package.json][] in my Node-based Vue Quickstart and you'll see how package management is lighter.

A comparison:

| Area                  | Vue Node app                    | Vue frontend app |
| --------------------- | ------------------------------- | ---------------- |
| ESLint and Prettier   | Run as project dev dependencies | Run separately   |
| Webpack               | Yes                             | No               |
| Direct dependencies   | 2 production and 10 dev         | 1                |
| Indirect dependencies | Over 800                        | 0                |

A note on the indirect dependencies - note that the [Vue 3 package.json][] file has _zero_ prod dependencies and the compiled [vue.esm-browser.js][] script used in [main.js](/asset/js/main.js) has _zero_ imports.


[vue-quickstart package.json]: https://github.com/MichaelCurrin/vue-quickstart/blob/master/package.json
[Vue 3 package.json]: https://github.com/vuejs/vue-next/blob/master/package.json
[vue.esm-browser.js]: https://unpkg.com/vue/dist/vue.esm-browser.js
[ES Modules]: https://michaelcurrin.github.io/dev-cheatsheets/cheatsheets/javascript/general/modules/es-modules.html
