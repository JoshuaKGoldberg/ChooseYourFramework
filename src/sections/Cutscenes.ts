import { member } from "babyioc";
import { Section } from "eightbittr";

import { FullScreenPokemon } from "../FullScreenPokemon";

import { OakIntroPokemonChoiceCutscene } from "./cutscenes/OakIntroPokemonChoiceCutscene";

/**
 * ScenePlayr cutscenes, keyed by name.
 */
export class Cutscenes extends Section<FullScreenPokemon> {
    /**
     * OakIntroPokemonChoice cutscene routines.
     */
    @member(OakIntroPokemonChoiceCutscene)
    public readonly oakIntroPokemonChoice: OakIntroPokemonChoiceCutscene;
}
