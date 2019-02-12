# --Integration-Test

This package is for running integration tests only. It shall never be published.

## Notes

Currently there are some problems.
- Running `node index.js` or similar commands will fail, because importing named functions cannot be processed.
- Using `node --experimental-modules index.mjs` instead, will help in *index.mjs*, but will fail inside similar import statements within the *node_modules* folder.
- Running tests with *Jest* is OK, but they will only be successful for normal packages. Packages containing PlayCanvas scripts will fail, because of undefined variables, like *pc*.
