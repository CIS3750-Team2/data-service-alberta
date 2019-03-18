# Generic data-service

## Developing

1. Clone repo.
2. Copy `.env.sample` to `.env` and adjust for your environment.
3. Set province name in `src/constants.js`.
4. Modify function in `startup.js` if you need any startup hooks. You can use the `state` variable to pass around any required information.
5. Modify function in `retrieve.js` to fetch data from the provincial data source. You can access the `state` variable here as well.
6. Use `yarn` to install libraries.
7. Run your data-service using `yarn dev`.

### `index.js` and `processor.js` should *not* be modified!

