import { Section } from "eightbittr";

import { FullScreenPokemon } from "../../FullScreenPokemon";
import { Pokeball } from "../Actors";

/**
 * OakIntroPokemonChoice cutscene routines.
 */
export class OakIntroPokemonChoiceCutscene extends Section<FullScreenPokemon> {
    /**
     * Cutscene for the player checking a Pokeball.
     *
     * @param settings   Settings used for the cutscene.
     */
    public PlayerChecksPokeball(settings: any): void {
        // If Oak is hidden, this cutscene shouldn't be starting (too early)
        if (this.game.utilities.getExistingActorById("Oak").hidden) {
            this.game.scenePlayer.stopCutscene();

            this.game.menuGrapher.createMenu("GeneralText", {
                deleteOnFinish: true,
            });
            this.game.menuGrapher.addMenuDialog("GeneralText", [
                "Those are %%%%%%%POKE%%%%%%% Balls. They contain %%%%%%%POKEMON%%%%%%%!",
            ]);
            this.game.menuGrapher.setActiveMenu("GeneralText");

            return;
        }

        // If there's already a starter, ignore this sad last ball...
        if (this.game.itemsHolder.getItem(this.game.storage.names.starter)) {
            return;
        }

        const pokeball: Pokeball = settings.triggerer;
        settings.chosen = pokeball.pokemon;

        this.game.scenePlayer.playRoutine("PlayerDecidesPokemon");
    }

    /**
     * Cutscene for confirming the player wants to keep the chosen Pokemon.
     *
     * @param settings   Settings used for the cutscene.
     */
    public PlayerDecidesPokemon(settings: any): void {
        console.log("Deciding on", { settings });
        this.game.menuGrapher.createMenu("GeneralText");
        this.game.menuGrapher.addMenuDialog(
            "GeneralText",
            [
                [
                    "So! You want the " +
                        settings.triggerer.actor.replace("Library", "") +
                        " framework?",
                ],
            ],
            (): void => {
                this.game.menuGrapher.createMenu("Yes/No", {
                    killOnB: ["GeneralText"],
                });
                this.game.menuGrapher.addMenuList("Yes/No", {
                    options: [
                        {
                            text: "YES",
                            callback: () => {
                                window.open(settings.triggerer.href);
                            },
                        },
                        {
                            text: "NO",
                            callback: this.game.menuGrapher.registerB,
                        },
                    ],
                });
                this.game.menuGrapher.setActiveMenu("Yes/No");
            }
        );
        this.game.menuGrapher.setActiveMenu("GeneralText");
    }
}
