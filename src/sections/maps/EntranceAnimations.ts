import { Section } from "eightbittr";

import { ChooseYourFramework } from "../../ChooseYourFramework";
import { Direction } from "../Constants";
import { Location } from "../Maps";

/**
 * Map entrance animations.
 */
export class EntranceAnimations extends Section<ChooseYourFramework> {
    /**
     * Standard Map entrance Function. Character is placed based on specified Location.
     *
     * @param location   Location within the Map being entered.
     */
    public readonly normal = (location: Location): void => {
        this.game.maps.addPlayer(location.xLocation || 0, location.yLocation || 0);

        this.game.actions.animateCharacterSetDirection(
            this.game.players[0],
            location.direction || Direction.Top
        );

        this.game.scrolling.centerMapScreen();
    };
}
