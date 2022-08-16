import { FlagSwappr } from "flagswappr";

import { ChooseYourFramework } from "../ChooseYourFramework";

/**
 * Generation-specific flags.
 */
export interface Flags {
    /**
     * Whether HM moves can be activated by pressing the A key.
     */
    readonly keyActivatedHmMoves: boolean;

    /**
     * Whether Pokemon are able to hold items.
     */
    readonly heldItems: boolean;
}

export const createFlagSwapper = (fsp: ChooseYourFramework): FlagSwappr<Flags> =>
    new FlagSwappr({
        generation: "I",
        generations: {
            I: {
                keyActivatedHmMoves: false,
                heldItems: false,
            },
            II: {
                keyActivatedHmMoves: true,
                heldItems: true,
            },
        },
        ...fsp.settings.components.flagSwapper,
    });
