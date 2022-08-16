import { ScenePlayrSettings, ScenePlayr } from "sceneplayr";

import { ChooseYourFramework } from "../ChooseYourFramework";

/**
 * @param fsp   A generating ChooseYourFramework instance.
 * @returns Scene settings for the ChooseYourFramework instance.
 */
export const createScenePlayer = (fsp: ChooseYourFramework): ScenePlayr =>
    new ScenePlayr({
        cutscenes: {
            OakIntroPokemonChoice: {
                firstRoutine: "PlayerChecksPokeball",
                routines: fsp.cutscenes.oakIntroPokemonChoice,
            },
        },
        scope: fsp.cutscenes,
    } as any as ScenePlayrSettings);
