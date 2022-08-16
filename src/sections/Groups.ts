import { Groups as EightBittrGroups } from "eightbittr";

import { ChooseYourFramework } from "../ChooseYourFramework";

import { Character, Actor } from "./Actors";

export interface ActorGroups {
    Character: Character;
    Scenery: Actor;
    Solid: Actor;
    Terrain: Actor;
    Text: Actor;
    [i: string]: Actor;
}

/**
 * Collection settings for Actor group names.
 */
export class Groups<Game extends ChooseYourFramework> extends EightBittrGroups<Game> {
    /**
     * Names of known Actor groups, in drawing order.
     */
    public readonly groupNames = ["Terrain", "Scenery", "Solid", "Character", "Text"];
}
