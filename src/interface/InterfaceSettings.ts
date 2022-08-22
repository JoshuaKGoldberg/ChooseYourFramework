import { GameWindow } from "eightbittr";
import { Aliases } from "inputwritr";
import {
    AbsoluteSizeSchema,
    MultiSelectSchema,
    RelativeSizeSchema,
    UserWrapprSettings,
    OptionType,
} from "userwrappr";

import { ChooseYourFramework } from "../ChooseYourFramework";

/**
 * Global scope around a game, such as a DOM window.
 */
export interface WrappingGameWindow extends GameWindow {
    /**
     * Game instance, once this has created it.
     */
    CYF?: ChooseYourFramework;
}

export interface InterfaceSettingOverrides {
    createGame?(size: AbsoluteSizeSchema): ChooseYourFramework;
    gameWindow?: WrappingGameWindow;
}

/**
 * Sizes the game is allowed to be, keyed by friendly name.
 */
export interface GameSizes {
    [i: string]: RelativeSizeSchema;
}

/**
 * Friendly name of the default game size.
 */
const defaultSize = "Large";

/**
 * Sizes the game is allowed to be, keyed by friendly name.
 */
const sizes: GameSizes = {
    [defaultSize]: {
        width: "100%",
        height: 512,
    },
};

/**
 * Keys that may be mapped to game inputs.
 */
const keys: string[] = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "up",
    "right",
    "down",
    "left",
    "backspace",
    "ctrl",
    "enter",
    "escape",
    "shift",
    "space",
];

/**
 * Creates settings for an IUserWrappr that will create and wrap a ChooseYourFramework instance.
 *
 * @param gameWindow   Global scope around the game interface, if not the global window.
 */
export const createUserWrapprSettings = ({
    createGame = (size: AbsoluteSizeSchema) => new ChooseYourFramework(size),
    gameWindow = window,
}: InterfaceSettingOverrides = {}): UserWrapprSettings => {
    /**
     * Game instance, once this has created it.
     */
    let game: ChooseYourFramework;

    return {
        createContents: (size: AbsoluteSizeSchema) => {
            gameWindow.CYF = game = createGame(size);

            game.inputs.initializeGlobalPipes(gameWindow);
            game.gameplay.startOptions();

            return game.container;
        },
        defaultSize: sizes[defaultSize],
        menus: [
            {
                options: ((controls): MultiSelectSchema[] =>
                    controls.map((control) => {
                        let aliases: Aliases;
                        return {
                            getInitialValue: () => {
                                return (aliases ??= game.inputs.aliases)[control].map(
                                    (keyCode: number) =>
                                        convertKeyCodeToAlias(keyCode).toLowerCase()
                                );
                            },
                            options: keys,
                            saveValue: (newValues, oldValues): void => {
                                game.inputWriter.removeEventAliasValues(
                                    control,
                                    oldValues.map(convertAliasToKeyCode)
                                );
                                game.inputWriter.addEventAliasValues(
                                    control,
                                    newValues.map(convertAliasToKeyCode)
                                );
                            },
                            selections: 2,
                            title: control,
                            type: OptionType.MultiSelect,
                        };
                    }))(["a", "b", "left", "right", "up", "down"]),
                title: "Controls",
            },
            {
                options: [
                    {
                        action: () => {
                            game.utilities.takeScreenshot(`FullScreenPokemon ${Date.now()}`);
                        },
                        title: "Save Screenshot",
                        type: OptionType.Action,
                    },
                    {
                        action: () => {
                            // https://twitter.com/intent/tweet?
                            // hashtags=demo&original_referer=https%3A%2F%2Fdeveloper.twitter.com%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&related=twitterapi%2Ctwitter&text=Hello%20world&url=https%3A%2F%2Fexample.com%2Ffoo&via=twitterdev
                            const url = new URL("/intent/tweet", "https://www.twitter.com");
                            url.searchParams.set(
                                "hashtags",
                                ["angular", "preact", "reactjs", "solidjs", "svelte", "vue"].join(
                                    ","
                                )
                            );
                            url.searchParams.set(
                                "text",
                                `I'm choosing my JavaScript UI framework over at https://chooseyouframework.dev. What's your starter?\n`
                            );
                            window.open(url.toString(), "_blank");
                        },
                        title: "Twitter",
                        type: OptionType.Action,
                    },
                ],
                title: "Share",
            },
        ],
        styles: {
            input: {
                fontFamily: "Press Start",
                minWidth: "117px",
                padding: "3px",
            },
            inputButton: {
                background: "#ffcc33",
                cursor: "pointer",
                fontFamily: "Press Start",
                padding: "7px 3px",
            },
            inputButtonAction: {
                padding: "11px 3px",
                width: "100%",
            },
            inputButtonBoolean: {
                padding: "7px 21px",
            },
            inputButtonOff: {
                background: "#ccaa33",
            },
            inputSelect: {
                minWidth: "35px",
                padding: "3px 0",
            },
            option: {
                alignItems: "center",
                margin: "auto",
                padding: "7px 0",
                maxWidth: "calc(100% - 14px)",
            },
            options: {
                left: "4px",
                right: "4px",
                width: "auto",
                padding: "4px 3px 7px 3px",
                boxShadow: ["0 3px 7px black inset", "0 0 0 4px #99ccff", "0 0 14px black"].join(
                    ", "
                ),
                background: "#005599",
            },
            optionsList: {
                marginBottom: "21px",
            },
            menu: {
                maxWidth: "385px",
                minWidth: "280px",
                padding: "7px",
            },
            menusInnerArea: {
                background: "black",
                color: "white",
                fontFamily: "Press Start",
                transition: "700ms color",
            },
            menusInnerAreaFake: {
                color: "grey",
            },
            menuTitleButton: {
                alignItems: "center",
                background: "none",
                border: "none",
                color: "white",
                display: "flex",
                fontFamily: "Press Start",
                fontSize: "16px",
                justifyContent: "center",
            },
            menuTitleButtonFake: {
                color: "grey",
            },
        },
    };
};

// Plopping these down here till a version of UserWrappr is published that exports them...

const aliasesToKeyCode: Record<string, number> = {
    backspace: 8,
    ctrl: 17,
    down: 40,
    enter: 13,
    escape: 27,
    left: 37,
    right: 39,
    shift: 16,
    space: 32,
    up: 38,
};

/**
 * @param alias   The human-readable String representing the input name,
 *                such as "a" or "left".
 * @param keyCode The alias of an input, typically a character code.
 */
export const convertAliasToKeyCode = (alias: string) => {
    return alias.length === 1 ? alias.charCodeAt(0) - 32 : aliasesToKeyCode[alias];
};

const keyCodesToAliases: Record<number, string> = {
    8: "backspace",
    13: "enter",
    16: "shift",
    17: "ctrl",
    27: "escape",
    32: "space",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
};

/**
 * @param keyCode   The alias of an input, typically a character code.
 * @returns The human-readable String representing the input name,
 *          such as "a" or "left".
 */
export const convertKeyCodeToAlias = (keyCode: number) => {
    if (keyCode > 96 && keyCode < 105) {
        return String.fromCharCode(keyCode - 48);
    }

    if (keyCode > 64 && keyCode < 97) {
        return String.fromCharCode(keyCode);
    }

    return keyCodesToAliases[keyCode];
};
