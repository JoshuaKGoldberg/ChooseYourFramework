const minifyCss = require("cssmin");
const fs = require("fs-extra");
const { minify: minifyHtml } = require("html-minifier");
const path = require("path");

const distDir = path.join(__dirname, "dist");
const indexCssPath = path.join(distDir, "index.css");
const indexHtmlPath = path.join(distDir, "index.html");

// 1. Mess with dist/index.html...
fs.writeFileSync(
    indexHtmlPath,
    minifyHtml(fs.readFileSync(indexHtmlPath).toString(), {
        collapseWhitespace: true,
    })
        // Replace "../node_modules/"" paths with "./" in index.html
        .replaceAll("../node_modules/", "./")
        // Mess with dist/index.html: improve the messaging a bit
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
        // Use the minified require.js, pending shenanigans-manager adding that
        .replaceAll("requirejs/require.js", "requirejs/require.min.js")
        // Get rid of the pesky extra spaces, too...
        // (I'm really counting the kB here - at this point it was 251...!)
        .replaceAll("    ", "")
);

// 3. Mess with dist/index.css...
fs.writeFileSync(
    indexCssPath,
    minifyCss(fs.readFileSync(indexCssPath).toString())
        // Fix game height, pending shenanigans-manager settings
        .replace(`210px`, `515px`)
);

// 4. Copy required node_modules/* packages into dist/
const nodeModulesToCopy = [
    // Scaffolding
    "requirejs",
    // EightBittr modules
    "actorhittr",
    "areaspawnr",
    "autofieldr",
    "classcyclr",
    "devicelayr",
    "eightbittr",
    "fpsanalyzr",
    "frametickr",
    "groupholdr",
    "inputwritr",
    "itemsholdr",
    "mapscreatr",
    "mapscreenr",
    "menugraphr",
    "numbermakr",
    "objectmakr",
    "pixeldrawr",
    "pixelrendr",
    "quadskeepr",
    "sceneplayr",
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
