import { member } from "autofieldr";
import { Graphics as EightBittrGraphics } from "eightbittr";
import { Palette } from "pixelrendr";

import { ChooseYourFramework } from "../ChooseYourFramework";

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
    @member(Flipping)
    public readonly flipping: Flipping;
}
