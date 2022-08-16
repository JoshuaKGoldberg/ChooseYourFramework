import { Frames as EightBittrFrames } from "eightbittr";

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
export class Frames<Game extends ChooseYourFramework> extends EightBittrFrames<Game> {
    // 2. Groups are updated for velocities and pruned.
    public maintain() {
        super.maintain();
        this.game.players.forEach(this.game.maintenance.maintainPlayer);
    }
}
