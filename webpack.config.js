const path = require("path");
const { shenanigans } = require("./package.json");

const corePackages = [
    "actorhittr",
    "areaspawnr",
    "battlemovr",
    "classcyclr",
    "devicelayr",
    "eightbittr",
    "flagswappr",
    "fpsanalyzr",
    "frametickr",
    "groupholdr",
    "inputwritr",
    "itemsholdr",
    "mapscreatr",
    "mapscreenr",
    "menugraphr",
    "modattachr",
    "numbermakr",
    "objectmakr",
    "pixeldrawr",
    "pixelrendr",
    "quadskeepr",
    "sceneplayr",
    "stateholdr",
    "stringfilr",
    "timehandlr",
    "touchpassr",
    "userwrappr",
    "autofieldr",
];

const resolveAliasBase = path.join(__dirname, "node_modules");

module.exports = {
    devtool: "source-map",
    entry: Object.fromEntries(
        (
            shenanigans.loading?.entries ?? [
                {
                    entry: `./src/main.ts`,
                    name: shenanigans.loading?.name || shenanigans.name,
                },
            ]
        ).map((pair) => [pair.name, pair.entry])
    ),
    externals: Object.fromEntries(
        shenanigans.loading?.externals?.map((external) => [external.name, external.name]) ?? []
    ),
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(tsx?)|(jsx?)$/,
                use: {
                    loader: require.resolve("ts-loader"),
                    options: {
                        transpileOnly: true,
                    },
                },
            },
        ],
    },
    output: {
        filename: `[name].js`,
        libraryTarget: shenanigans.game ? undefined : "amd",
        publicPath: "dist/",
    },
    resolve: {
        alias: Object.fromEntries(
            corePackages.map((corePackage) => [
                corePackage,
                path.join(resolveAliasBase, corePackage, "src/index.ts"),
            ])
        ),
        extensions: [".ts", ".tsx", ".json"],
        symlinks: true,
    },
};
