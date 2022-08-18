import { UserWrappr } from "userwrappr";

import { createUserWrapprSettings } from "./InterfaceSettings";

/**
 * Creates a UserWrappr interface around an CYF game.
 *
 * @param container   HTML element to create within.
 * @returns A Promise for creating the game interface.
 */
export const createCypInterface = async (container: HTMLElement): Promise<void> =>
    new UserWrappr(createUserWrapprSettings()).createDisplay(container);
