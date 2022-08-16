import { member } from "autofieldr";
import { Section } from "eightbittr";

import { ChooseYourFramework } from "../ChooseYourFramework";

import { OakIntroPokemonChoiceCutscene } from "./cutscenes/OakIntroPokemonChoiceCutscene";

/**
 * ScenePlayr cutscenes, keyed by name.
 */
export class Cutscenes extends Section<ChooseYourFramework> {
    /**
     * OakIntroPokemonChoice cutscene routines.
     */
    @member(OakIntroPokemonChoiceCutscene)
    public readonly oakIntroPokemonChoice: OakIntroPokemonChoiceCutscene;
}
