import { MenuGraphr } from "menugraphr";

import { MenuSchema } from "../sections/Menus";
import { ChooseYourFramework } from "../ChooseYourFramework";

export const createMenuGrapher = (game: ChooseYourFramework): MenuGraphr =>
    new MenuGraphr({
        aliases: {
            " ": "Space",
            "(": "LeftParenthesis",
            ")": "RightParenthesis",
            ":": "Colon",
            ";": "Semicolon",
            "[": "LeftSquareBracket",
            "]": "RightSquareBracket",
            "-": "Hyphen",
            MDash: "MDash",
            _: "Underscore",
            "?": "QuestionMark",
            "!": "ExclamationMark",
            "/": "Slash",
            ".": "Period",
            ",": "Comma",
            "'": "Apostrophe",
            "�": "eFancy",
        },
        game: game,
        replacements: {
            PLAYER: (): string[] => "Blue".split(""),
            POKE: "POK�".split(""),
            POKEMON: "JavaScript".split(""),
            POKEDEX: "MDN".split(""),
        },
        schemas: {
            GeneralText: {
                size: {
                    height: 96,
                    width: 320,
                },
                position: {
                    horizontal: "center",
                    vertical: "center",
                    offset: {
                        top: 144,
                    },
                },
                ignoreB: true,
                textPaddingRight: 12,
            },
            "Yes/No": {
                size: {
                    width: 96,
                    height: 80,
                },
                position: {
                    horizontal: "center",
                    vertical: "center",
                    offset: {
                        left: -112,
                        top: 56,
                    },
                },
                arrowXOffset: 4,
                textXOffset: 32,
                textYOffset: 14,
            } as MenuSchema,
        },
    });
