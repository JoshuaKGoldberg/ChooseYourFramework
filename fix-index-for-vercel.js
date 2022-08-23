// This file is a collection of annoying hacks to get the deployed site working.
// Eventually this will all be handled by shenanigans-manager:
// https://github.com/FullScreenShenanigans/EightBittr/tree/main/packages/shenanigans-manager
//
// Most importantly, it fixes up node_modules import paths.
// It also minifies CSS+HTML and tweaks some visuals.

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
    Have you ever felt choosing a JavaScript UI framework was a lot like picking a starter Pokemon?
    <br />
    Most of us don't deeply understand how they compare.
    <br />
    We pick one and spend the next few years convinced it was the best choice.
</section>
`
        )
        .replaceAll("ChooseYourFramework,", "Choose Your Framework,")
        .replaceAll(">ChooseYourFramework<", ">Choose Your Framework<")
        // Add SEO/social meta tags
        .replace(
            `<meta name="description" content="">`,
            `
<meta name="description" content="Choosing a modern JavaScript UI framework, Pokemon-style." />
<meta property="og:description" content="Choosing a modern JavaScript UI framework, Pokemon-style." />
<meta property="og:image" content="https://www.chooseyourframework.dev/preview.png" />
<meta property="og:image:alt" content="Screenshot of a grayscale retro Pokemon-like game in a professor's lab, with UI framework libraries on a table." />
<meta property="og:title" content="Choose Your Framework" />
<meta property="og:url" content="https://www.chooseyourframework.dev" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:creator" content="@JoshuaKGoldberg" />
<meta name="twitter:description" content="Choosing a modern JavaScript UI framework, Pokemon-style." />
<meta name="twitter:title" content="Choose Your Framework" />
<meta name="twitter:image" content="https://www.chooseyourframework.dev/preview.png" />
<meta name="twitter:title:alt" content="Screenshot of a grayscale retro Pokemon-like game in a professor's lab, with UI framework libraries on a table." />
        `
        )
        // Use the minified require.js, pending shenanigans-manager adding that
        .replaceAll("requirejs/require.js", "requirejs/require.min.js")
        // Get rid of the pesky extra spaces, too...
        // (I'm really counting the kB here - every byte counts...!)
        .replaceAll("    ", "")
        // Add Fathom analytics
        .replace(
            "</body>",
            `<script async data-site="FLSZGVKG" src="https://cdn.usefathom.com/script.js"></script></body>`
        )
);

// 2. Copy the accompanying src/preview.png over
fs.cpSync("./src/preview.png", "./dist/preview.png");

// 3. Mess with dist/index.css...
fs.writeFileSync(
    indexCssPath,
    minifyCss(
        fs
            .readFileSync(indexCssPath)
            .toString()
            // Fix the game being relative, for button displays
            .replace(`section#game{`, `section#game{position:relative;`)
            // Fix game height, pending shenanigans-manager settings
            .replace(`210px`, `515px`) +
            // Fix responsive header height, pending shenanigans-manager settings
            `
        header {
            height: 3.5rem;
        }
        
        @media (min-width: 688px) {
            header {
                height: 1.5rem;
            }
        }
        `
    )
);

// 4. Copy required node_modules/* packages into dist/
const nodeModulesToCopy = ["requirejs", "preact", "userwrappr"];

for (const packageName of nodeModulesToCopy) {
    const source = path.join(__dirname, "node_modules", packageName);
    const destination = path.join(distDir, packageName);
    console.log("Will attempt to copy", source, "to", destination);

    fs.copySync(source, destination, {
        filter: (src) => !src.includes(".bin"),
    });
}
