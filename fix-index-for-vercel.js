const fs = require("fs-extra");
const path = require("path");

const libDir = path.join(__dirname, "lib");
const indexPath = path.join(libDir, "index.html");

// 1. Replace "../node_modules/"" paths with "./" in index.html
fs.writeFileSync(
    indexPath,
    fs.readFileSync(indexPath).toString().replaceAll("../node_modules", "./")
);

// 2. Mess with lib/index.html's message
fs.writeFileSync(indexPath, fixIndexContents(fs.readFileSync(indexPath).toString()));

/** @param {string} contents */
function fixIndexContents(contents) {
    const lines = contents.split("\n");

    lines.splice(
        25,
        9,
        `<section id="social" class="section-text">
        A fun little experiment by
    <a class="link-github" href="http://joshuakgoldberg.com">Josh Goldberg</a>
    (<a class="link-github" href="https://twitter.com/joshuakgoldberg">@JoshuaKGoldberg</a>) based on some
    <a class="link-github" href="https://github.com/FullScreenShenanigans/FullScreenPokemon">very old code</a
    >. 💖
    </section>
    <script>
        console.log("Yes, performance is really bad. This is basically a dev build. I never got around to implementing production EightBittr builds...")
    </script>`
    );

    return lines.join("\n");
}

// 3. Copy required node_modules/* packages into lib/
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
