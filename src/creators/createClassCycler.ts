import { ClassCyclr } from "classcyclr";

import { ChooseYourFramework } from "../ChooseYourFramework";
import { Actor } from "../sections/Actors";

export const createClassCycler = (game: ChooseYourFramework) =>
    new ClassCyclr({
        classAdd: (actor: Actor, className: string) => {
            game.graphics.classes.addClass(actor, className);
        },
        classRemove: (actor: Actor, className: string): void => {
            game.graphics.classes.removeClass(actor, className);
        },
        timeHandler: game.timeHandler,
    });
