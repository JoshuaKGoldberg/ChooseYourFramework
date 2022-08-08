const fs = require("fs-extra");
const path = require("path");

const libDir = path.join(__dirname, "lib");

// 1. Replace "../node_modules/"" paths with "./" in index.html
const indexPath = path.join(libDir, "index.html");
const indexContents = fs.readFileSync(indexPath).toString();
fs.writeFileSync(indexPath, indexContents.replaceAll("../node_modules", "./lib"));

// 2. Copy required node_modules/* packages into lib/
const nodeModulesToCopy = [
    // Scaffolding
    "requirejs",
    // EightBittr modules
    "actorhittr",
    "areaspawnr",
    "audioplayr",
    "babyioc",
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
    // UI
    "mobx",
    "mobx-react",
    "react",
    "react-dom",
];

for (const packageName of nodeModulesToCopy) {
    fs.copySync(
        path.join(__dirname, "node_modules", packageName),
        path.join(libDir, packageName),
        {
            filter: (src) => !src.includes(".bin"),
        }
    );
}
