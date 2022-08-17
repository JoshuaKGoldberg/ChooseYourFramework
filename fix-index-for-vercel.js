const fs = require("fs-extra");
const path = require("path");

const distDir = path.join(__dirname, "dist");
const indexPath = path.join(distDir, "index.html");

// 1. Replace "../node_modules/"" paths with "./" in index.html
fs.writeFileSync(
    indexPath,
    fs.readFileSync(indexPath).toString().replaceAll("../node_modules", "./")
);

// 2. Mess with dist/index.html's message
fs.writeFileSync(indexPath, fixIndexContents(fs.readFileSync(indexPath).toString()));

/** @param {string} contents */
function fixIndexContents(contents) {
    return contents
        .replace(
            `<section id="explanation" class="section-text"></section>`,
            `<section id="explanation" class="section-text">
    Have you ever felt choosing a modern JavaScript UI framework was a lot like picking a starter Pokemon?
    <br />
    They all have their strengths and weaknesses.
    Most of us don't deeply understand how they compare.
    We just pick one at the beginning and spend the next few years convinced it was the best choice.
</section>
`
        )
        .replaceAll("ChooseYourFramework,", "Choose Your Framework,")
        .replaceAll(">ChooseYourFramework<", ">Choose Your Framework<");
}

// 3. Copy required node_modules/* packages into dist/
const nodeModulesToCopy = [
    // Scaffolding
    "requirejs",
    // EightBittr modules
    "actorhittr",
    "areaspawnr",
    "autofieldr",
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
    "preact",
];

for (const packageName of nodeModulesToCopy) {
    const source = path.join(__dirname, "node_modules", packageName);
    const destination = path.join(distDir, packageName);
    console.log("Will attempt to copy", source, "to", destination);

    fs.copySync(source, destination, {
        filter: (src) => !src.includes(".bin"),
    });
}
