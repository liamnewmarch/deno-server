# Deno server 🦕

Deno server is a lightweight content server framework for [Deno][deno]. It supports:

* Regular expression URL matching.
* Static and dynamic handlers.
* Content Type detection for static files.
* Templating for dynamic routes.

The project is still under development and its API will probably change, but you’re more than welcome to check it out and play with the example project for a flavour of how it works.

## Third-party dependencies

* [mime-db][mime-db] for serving files with the correct Content-Type.

The example project also depends on:

* [marked][marked] for parsing Markdown files.

[deno]: https://deno.land
[mime-db]: https://unpkg.com/browse/mime-db@1.44.0/
[marked]: https://unpkg.com/browse/marked@1.0.0/
