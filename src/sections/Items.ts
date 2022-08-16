import { Items as EightBittrItems } from "eightbittr";

import { ChooseYourFramework } from "../ChooseYourFramework";

// TODO: declare item interface here (or at bottom of file?)
// ...then put that in ChooseYourFramework.ts

/**
 * Storage keys and value settings.
 */
export class Items<Game extends ChooseYourFramework> extends EightBittrItems<Game> {
    /**
     * Prefix to add before keys in storage.
     */
    public readonly prefix = "ChooseYourFramework::";

    /**
     * Initial settings for item values to store.
     */
    public readonly values = {
        [this.game.storage.names.area]: {
            valueDefault: "",
        },
        [this.game.storage.names.gameStarted]: {
            valueDefault: false,
        },
        [this.game.storage.names.items]: {
            valueDefault: [],
        },
        [this.game.storage.names.location]: {
            valueDefault: "",
        },
        [this.game.storage.names.name]: {},
        [this.game.storage.names.time]: {
            valueDefault: 0,
        },
    };
}
