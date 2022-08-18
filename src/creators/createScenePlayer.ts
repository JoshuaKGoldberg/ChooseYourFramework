import { ScenePlayrSettings, ScenePlayr } from "sceneplayr";

import { ChooseYourFramework } from "../ChooseYourFramework";

/**
 * @param cyp   A generating ChooseYourFramework instance.
 * @returns Scene settings for the ChooseYourFramework instance.
 */
export const createScenePlayer = (cyp: ChooseYourFramework): ScenePlayr =>
    new ScenePlayr({
        cutscenes: {
            OakIntroPokemonChoice: {
                firstRoutine: "PlayerChecksPokeball",
                routines: cyp.cutscenes.oakIntroPokemonChoice,
            },
        },
        scope: cyp.cutscenes,
    } as any as ScenePlayrSettings);
