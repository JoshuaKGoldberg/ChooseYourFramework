import { GameWindow } from "eightbittr";
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
    FSP?: ChooseYourFramework;
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
            gameWindow.FSP = game = createGame(size);

            game.inputs.initializeGlobalPipes(gameWindow);
            game.gameplay.startOptions();

            return game.container;
        },
        defaultSize: sizes[defaultSize],
        menus: [
            {
                options: ((controls: string[]): MultiSelectSchema[] =>
                    controls.map(
                        (control: string): MultiSelectSchema => ({
                            getInitialValue: (): string[] =>
                                game.inputWriter.aliasConverter
                                    .getAliasAsKeyStrings(control)
                                    .map((text: string): string => text.toLowerCase()),
                            options: keys,
                            saveValue: (newValue: string[], oldValue: string[]): void => {
                                game.inputWriter.switchAliasValues(control, oldValue, newValue);
                            },
                            selections: 2,
                            title: control,
                            type: OptionType.MultiSelect,
                        })
                    ))(["a", "b", "left", "right", "up", "down"]),
                title: "Controls",
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
                marginBottom: "7px",
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
