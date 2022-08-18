import { Utilities as EightBittrUtilities } from "eightbittr";

import { ChooseYourFramework } from "../ChooseYourFramework";

import { Actor } from "./Actors";

/**
 * Miscellaneous utility functions.
 */
export class Utilities<Game extends ChooseYourFramework> extends EightBittrUtilities<Game> {
    /**
     * Gets An Actor known to exist by its ID.
     *
     * @template TActor   Type of Actor to retrieve.
     * @param id   ID of An Actor.
     * @returns Actor under the ID.
     */
    public getExistingActorById<TActor extends Actor = Actor>(id: string): TActor {
        return this.game.groupHolder.getActor<TActor>(id)!;
    }
}
