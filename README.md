# Deno server 🦕

Deno server is a lightweight content server framework for [Deno](https://deno.land). It supports:

* Regular expression URL matching.
* Static and dynamic handlers.
* Content Type detection for static files.
* Templating for dynamic routes.

The project is still under development and its API will probably change, but you’re more than welcome to check it out and play with the example project for a flavour of how it works.

## Third-party dependencies

* [mime-db](https://unpkg.com/browse/mime-db@1.44.0/) for serving files with the correct Content-Type.

The example project also depends on:

* [marked](https://unpkg.com/marked@1.0.0/lib/marked.esm.js) for parsing Markdown files.
