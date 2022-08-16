import { member } from "autofieldr";
import { Graphics as EightBittrGraphics } from "eightbittr";
import { Palette } from "pixelrendr";

import { ChooseYourFramework } from "../ChooseYourFramework";

import { Collections } from "./graphics/Collections";
import { Flipping } from "./graphics/Flipping";
import { graphicsLibrary } from "./graphics/GraphicsLibrary";

/**
 * Changes the visual appearance of Actors.
 */
export class Graphics<Game extends ChooseYourFramework> extends EightBittrGraphics<Game> {
    /**
     * What class name should indicate an Actor is to be flipped horizontally.
     */
    public readonly flipHorizontal = "flip-horizontal";

    /**
     * What class name should indicate an Actor is to be flipped verticall.
     */
    public readonly flipVertical = "flip-vertical";

    /**
     * A nested library of sprites to process.
     */
    public readonly library = graphicsLibrary;

    /**
     * The default palette of colors to use for sprites.
     */
    public readonly paletteDefault: Palette = [
        [0, 0, 0, 0],
        // Grayscales (1-4)
        [255, 255, 255, 255],
        [0, 0, 0, 255],
        [188, 188, 188, 255],
        [116, 116, 116, 255],
        // Reds & Browns (5-11)
        [252, 216, 168, 255],
        [252, 152, 56, 255],
        [252, 116, 180, 255],
        [216, 40, 0, 255],
        [200, 76, 12, 255],
        [136, 112, 0, 255],
        [124, 7, 0, 255],
        // Greens (12-14, and 21)
        [168, 250, 188, 255],
        [128, 208, 16, 255],
        [0, 168, 0, 255],
        // Blues (15-20)
        [24, 60, 92, 255],
        [0, 128, 136, 255],
        [32, 56, 236, 255],
        [156, 252, 240, 255],
        [60, 188, 252, 255],
        [92, 148, 252, 255],
        // Green (21) for Luigi
        [0, 130, 0, 255],
        // Pinkish tan (22) for large decorative text
        [252, 188, 176, 255],
    ];

    /**
     * Amount to expand sprites by when processing.
     */
    public readonly scale = 2;

    /**
     * What key in attributions should contain sprite heights.
     */
    public readonly spriteHeight = "spriteHeight";

    /**
     * What key in attributions should contain sprite widths.
     */
    public readonly spriteWidth = "spriteWidth";

    /**
     * Maximum size of a SpriteMultiple to pre-render.
     */
    public readonly spriteCacheCutoff = 2048;

    /**
     * Collects Actors to change visuals en masse.
     */
    @member(Collections)
    public readonly collections: Collections;

    /**
     * Collects Actors to change visuals en masse.
     */
    @member(Flipping)
    public readonly flipping: Flipping;
}
