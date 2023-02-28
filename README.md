# Developer_Exercise_Clyde

This is my Implementation of the Retail InStore Developer Exercise. This project contains optimizations to run best in
Safari.

# How to Run

You won't be able to run the HTML file directly in the browser due to CORS issues. This project is instead ran by
generating a local server with [http-server](https://www.npmjs.com/package/http-server).

- Run `npm i` to install dependencies
- Start a local server from the terminal with `npm run host` or `http-server`
- Access the project on [localhost:8080](http://127.0.0.1:8080) or another url returned by the command
- This project uses Sass so make sure to update stylesheets in `./sass` to avoid having changes overwritten

I used quite a few references for my implementation. In particular:
[This stack overflow question](https://stackoverflow.com/questions/48073151/read-local-json-file-into-variable) for
parsing the local json file,
[this codepen](https://codepen.io/noonii/pen/MEepKE) for the sliding
underline, [Alvaro Trigo](https://alvarotrigo.com/blog/hamburger-menu-css/) for the css-only hamburger menu,
and [this codepen](https://alvarotrigo.com/blog/hamburger-menu-css/) for the clock.

In all there were a few things I wish I did differently. Some files could be trimmed down, and parts of the experience
made smoother. Importing the local JSON file into safari was also quite a headache. At the end of the day, this was a
great learning experience, and I am very happy that I took it on.

## Other references:

- Sliding Underline CSS only: https://codepen.io/rm/pen/AXpmja
- Importing Local Json into Chrome: https://blog.bitsrc.io/how-to-import-json-file-as-a-module-e4965295a7b3
- Hamburger menu: https://codepen.io/erikterwan/pen/EVzeRP
- Clocks: https://codepen.io/tag/clock
