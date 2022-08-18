const fs = require("fs-extra");
const path = require("path");

const distDir = path.join(__dirname, "dist");
const indexCssPath = path.join(distDir, "index.css");
const indexHtmlPath = path.join(distDir, "index.html");

// 1. Mess with dist/index.html: replace "../node_modules/"" paths with "./" in index.html
fs.writeFileSync(
    indexHtmlPath,
    fs.readFileSync(indexHtmlPath).toString().replaceAll("../node_modules", "./")
);

// 2. Mess with dist/index.html: improve the messaging a bit
fs.writeFileSync(
    indexHtmlPath,
    fs
        .readFileSync(indexHtmlPath)
        .toString()
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
        .replaceAll(">ChooseYourFramework<", ">Choose Your Framework<")
);

// 3. Mess with dist/index.css: fix game height, pending shenanigans-manager settings
fs.writeFileSync(indexCss, fs.readFileSync(indexCss).toString().replace(`210px`, `515px`));

// 4. Copy required node_modules/* packages into dist/
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
