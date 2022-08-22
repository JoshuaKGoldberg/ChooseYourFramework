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

    console.log(`👋 Hello! Thanks for looking ChooseYourFramework in your developer tools. ✨ 
The game is available as the global CYF variable. Its properties can be used to mess around with the game.
For example:

* \`CYF.frameTicker.setInterval(1)\` speeds the game up
* \`CYF.groupHolder.getActor("Lady").dialog = "All hail Lord Helix!"\` overrides that character's dialog

See https://github.com/JoshuaKGoldberg/ChooseYourFramework for the game's source.
See https://github.com/FullScreenShenanigans/EightBittr for its underlying game engine.

Enjoy! 💖
`);

    return userWrapper.createDisplay(container);
};
