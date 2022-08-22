import { Aliases } from "inputwritr";
import {
    convertAliasToKeyCode,
    convertKeyCodeToAlias,
    AbsoluteSizeSchema,
    ButtonSchema,
    MultiSelectSchema,
    UserWrapprSettings,
    OptionType,
} from "userwrappr";

import { ChooseYourFramework } from "../ChooseYourFramework";

declare global {
    interface Window {
        /**
         * Game instance, once this has created it.
         */
        CYF: ChooseYourFramework;
    }
}

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
 */
export const createUserWrapprSettings = (): UserWrapprSettings => {
    /**
     * Game instance, once this has created it.
     */
    let game: ChooseYourFramework;

    return {
        buttons: (
            [
                ["Bottom", ">", { bottom: "0", right: "75px", transform: "rotate(90deg)" }],
                ["Left", ">", { bottom: "40px", right: "115px", transform: "rotate(180deg)" }],
                ["Right", ">", { bottom: "40px", right: "35px" }],
                ["Top", ">", { bottom: "80px", right: "75px", transform: "rotate(-90deg)" }],
            ] as const
        ).map(
            ([label, title, position]): ButtonSchema => ({
                events: {
                    onClick: (event) => {
                        game.inputWriter.callEvent("onkeydown", label.toLowerCase(), event);
                    },
                },
                label,
                position,
                title,
                variant: "square",
            })
        ),
        createContents: (size: AbsoluteSizeSchema) => {
            window.CYF = game = new ChooseYourFramework(size);

            game.inputs.initializeGlobalPipes(window);
            game.gameplay.startOptions();

            return game.container;
        },
        defaultSize: {
            width: "100%",
            height: 512,
        },
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
                            const url = new URL("/intent/tweet", "https://www.twitter.com");
                            url.searchParams.set(
                                "hashtags",
                                ["angular", "preact", "reactjs", "solidjs", "svelte", "vue"].join(
                                    ","
                                )
                            );
                            url.searchParams.set(
                                "text",
                                `I'm choosing my JavaScript UI framework over at https://chooseyouframework.dev. What's your starter?`
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
                zIndex: "1",
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
