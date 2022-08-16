import { Section } from "eightbittr";

import { ChooseYourFramework } from "../ChooseYourFramework";

import { Character } from "./Actors";

/**
 * Common equations.
 */
export class Equations extends Section<ChooseYourFramework> {
    /**
     * Calculates how many game ticks it will take for a Character to traverse a block.
     *
     * @param actor   A walking Character.
     * @returns how many game ticks it will take for actor to traverse a block.
     */
    public walkingTicksPerBlock(actor: Character): number {
        return 32 / actor.speed;
    }
}
