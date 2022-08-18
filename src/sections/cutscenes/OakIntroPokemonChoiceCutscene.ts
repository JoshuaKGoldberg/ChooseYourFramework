import { Section } from "eightbittr";

import { ChooseYourFramework } from "../../ChooseYourFramework";

/**
 * OakIntroPokemonChoice cutscene routines.
 */
export class OakIntroPokemonChoiceCutscene extends Section<ChooseYourFramework> {
    /**
     * Cutscene for the player checking a library.
     *
     * @param settings   Settings used for the cutscene.
     */
    public PlayerChecksLibrary(settings: any): void {
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
                                this.game.menuGrapher.registerB();
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
