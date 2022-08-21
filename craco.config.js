const sassResourcesLoader = require("craco-sass-resources-loader");

module.exports = {
    mode: "development",
    output: {
        path: __dirname,
    },
    plugins: [
        {
            plugin: sassResourcesLoader,
            options: {
                resources: [
                  "./src/assets/styles/utils/_variables.scss",  
                  "./src/assets/styles/utils/_mixins.scss"
                ]
            },
        },
    ],
    module: {
        loaders: [
          {
            test: /\.json$/,
            loader: 'json-loader'
          }
        ]
    },
};