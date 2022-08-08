import { ScenePlayrSettings, ScenePlayr } from "sceneplayr";

import { FullScreenPokemon } from "../FullScreenPokemon";

/**
 * @param fsp   A generating FullScreenPokemon instance.
 * @returns Scene settings for the FullScreenPokemon instance.
 */
export const createScenePlayer = (fsp: FullScreenPokemon): ScenePlayr =>
    new ScenePlayr(({
        cutscenes: {
            OakIntroPokemonChoice: {
                firstRoutine: "PlayerChecksPokeball",
                routines: fsp.cutscenes.oakIntroPokemonChoice,
            },
        },
        scope: fsp.cutscenes,
    } as any) as ScenePlayrSettings);
