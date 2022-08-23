import { UserWrappr } from "userwrappr";

import { createUserWrapprSettings } from "./InterfaceSettings";

/**
 * Creates a UserWrappr interface around an CYF game.
 *
 * @param container   HTML element to create within.
 * @returns A Promise for creating the game interface.
 */
export const createCypInterface = async (container: HTMLElement): Promise<void> => {
    const userWrapper = new UserWrappr(createUserWrapprSettings());

    console.log(
        `%c👋 Hello! Thanks for looking at ChooseYourFramework in your developer tools. ✨%c 
The game is available as the global CYF variable. Its properties can be used to mess around with the game.
For example:

* %cCYF.frameTicker.setInterval(1);%c sets game speed to very fast
* %cCYF.frameTicker.setInterval(100);%c sets game speed to very slow
* %cCYF.groupHolder.getActor("Lady").dialog = "All hail Lord Helix!";%c overrides that character's dialog
* %cCYF.inputWriter.callEvent("onkeydown", "up");%c presses the 'up' key
* %cCYF.inputWriter.callEvent("onkeyup", "up");%c lifts the 'up' key

See https://github.com/JoshuaKGoldberg/ChooseYourFramework for the game's source.
See https://github.com/FullScreenShenanigans/EightBittr for its underlying game engine.

%cEnjoy! 💖`,
        "font-weight: bold",
        "font-weight: normal",
        "font-weight: bold",
        "font-weight: normal",
        "font-weight: bold",
        "font-weight: normal",
        "font-weight: bold",
        "font-weight: normal",
        "font-weight: bold",
        "font-weight: normal",
        "font-weight: bold",
        "font-weight: normal",
        "font-weight: bold"
    );

    return userWrapper.createDisplay(container);
};
