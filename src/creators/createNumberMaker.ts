import { NumberMakr } from "numbermakr";

import { ChooseYourFramework } from "../ChooseYourFramework";

export const createNumberMaker = (game: ChooseYourFramework) =>
    new NumberMakr(game.settings.components.numberMaker);
