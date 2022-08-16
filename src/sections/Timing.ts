import { Timing as EightBittrTiming } from "eightbittr";

import { ChooseYourFramework } from "../ChooseYourFramework";

/**
 * Timing constants for delayed events.
 */
export class Timing<Game extends ChooseYourFramework> extends EightBittrTiming<Game> {
    /**
     * Default time separation between repeated events.
     */
    public readonly timingDefault = 9;
}
