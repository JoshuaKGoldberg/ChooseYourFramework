import { createClock } from "@sinonjs/fake-timers";
import { EightBittrConstructorSettings } from "eightbittr";
import { createStorage } from "itemsholdr";

import { Menu } from "./sections/Menus";
import { Player } from "./sections/Actors";
import { ChooseYourFramework } from "./ChooseYourFramework";

export interface StubChooseYourFrameworkSettings extends Partial<EightBittrConstructorSettings> {
    /**
     * Whether to enable MenuGraphr's finishAutomatically and finishLinesAutomatically.
     */
    automaticallyAdvanceMenus?: boolean;
}

/**
 * Creates a stubbed instance of the ChooseYourFramework class.
 *
 * @param settings   Size settings, if not a default small window size.
 * @returns A new instance of the ChooseYourFramework class.
 */
export const stubChooseYourFramework = (settings: StubChooseYourFrameworkSettings = {}) => {
    settings = {
        width: 256,
        height: 256,
        ...settings,
    };

    const clock = createClock();
    const prefix = `${new Date().getTime()}`;
    const storage = createStorage();
    const fsp = new ChooseYourFramework({
        height: settings.height || 256,
        components: {
            frameTicker: {
                timing: {
                    cancelFrame: clock.clearTimeout,
                    getTimestamp: () => clock.now,
                    requestFrame: (callback) =>
                        clock.setTimeout(() => {
                            callback(clock.now);
                        }, 1),
                },
            },
            itemsHolder: { prefix, storage },
            pixelDrawer: {
                framerateSkip: 9000001,
            },
        },
        width: settings.width || 256,
    });

    // Makes menus auto-complete during unit tests without extra ticks or waiting
    if (settings.automaticallyAdvanceMenus) {
        const menuPrototype = fsp.objectMaker.getPrototypeOf<Menu>(fsp.actors.names.menu);

        menuPrototype.textSpeed = 0;
        menuPrototype.finishAutomatically = true;
        menuPrototype.finishLinesAutomatically = true;
    }

    return { clock, fsp, prefix, storage };
};

/**
 * Creates a new instance of the ChooseYourFramework class in the Blank map.
 *
 * @param settings   Size settings, if not a default small window size.
 * @returns A new instance of the ChooseYourFramework class with an in-progress game.
 */
export const stubBlankGame = (settings?: StubChooseYourFrameworkSettings) => {
    const { fsp, ...options } = stubChooseYourFramework(settings);

    fsp.itemsHolder.setItem(fsp.storage.names.name, "Test".split(""));

    fsp.maps.setMap("Blank");
    fsp.maps.addPlayer(0, 0);

    const player: Player = fsp.players[0];

    return { fsp, player, ...options };
};

export const stubGameForMapsTest = () => stubChooseYourFramework().fsp;
