import { StateHoldr } from "stateholdr";

import { ChooseYourFramework } from "../ChooseYourFramework";

export const createStateHolder = (fsp: ChooseYourFramework): StateHoldr =>
    new StateHoldr({
        itemsHolder: fsp.itemsHolder,
        prefix: "StateHolder::",
    });
