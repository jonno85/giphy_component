# Getting Started with Create React App

I initially tried the giphy component but I was not satisfied by the capability of not passing multiple words at the same time.
I decided to write my own component leveraging `bricks.js` to build the Masonry layout, the `@giphy/js-fetch-api` for the fecthing to giphy packed in Promise.all and `lodash.debounce` to filter the end of the page scrolling to do infinite scroll.
`react-loader-spinner` to show a spinner on loading content and to emulate a bit of network delay, I added the setItems with 1 second delay.

