import { Section } from "eightbittr";

import { FullScreenPokemon } from "../../FullScreenPokemon";

/**
 * Opens and closes the root pause menu.
 */
export class Pause extends Section<FullScreenPokemon> {
    /**
     * Opens the Pause menu.
     */
    public readonly open = (): void => {
        const options = [
            {
                callback: (): void => {
                    window.open("https://joshuakgoldberg.com", "_blank");
                },
                text: "Josh",
            },
            {
                callback: this.close,
                text: "Exit",
            },
        ];

        this.game.menuGrapher.createMenu("Pause", {
            size: {
                height: options.length * 32 + 48,
            },
        });

        this.game.menuGrapher.addMenuList("Pause", {
            options,
        });
        this.game.menuGrapher.setActiveMenu("Pause");
    };

    /**
     * Closes the Pause menu.
     */
    public readonly close = (): void => {
        this.game.menuGrapher.deleteMenu("Pause");
    };

    /**
     * Toggles whether the Pause menu is open. If there is an active menu, A
     * Start key trigger is registered in the MenuGraphr instead.
     *
     * @param settings   Custom attributes to apply to the menu.
     */
    public readonly toggle = (): void => {
        if (this.game.menuGrapher.getActiveMenu()) {
            return;
        }

        const cutsceneSettings: any = this.game.scenePlayer.getCutsceneSettings();
        if (cutsceneSettings && cutsceneSettings.disablePauseMenu) {
            return;
        }

        this.game.menuGrapher.getMenu("Pause") === undefined ? this.open() : this.close();
    };
}
