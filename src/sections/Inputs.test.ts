import { expect } from "chai";
import * as sinon from "sinon";

import { stubBlankGame } from "../fakes.test";

import { Direction } from "./Constants";
import { Player } from "./Actors";

describe("Inputs", () => {
    describe("keyDownA", () => {
        it("activates an activatable solid when it's bordering the player", (): void => {
            // Arrange
            const { cyp } = stubBlankGame();
            const player = cyp.actors.add<Player>("Player");
            const solid = cyp.actors.add("FenceWide");
            const activate = (solid.activate = sinon.spy());

            cyp.actions.animateCharacterSetDirection(player, Direction.Top);
            cyp.physics.setMidXObj(player, solid);
            cyp.physics.setTop(player, solid.bottom);
            player.bordering[player.direction] = solid;

            // Act
            cyp.inputs.keyDownA(player);

            // Assert
            expect(activate).to.have.been.calledWithExactly(player, solid);
        });

        it("does not activate an activatable solid when it's not bordering the player", (): void => {
            // Arrange
            const { cyp } = stubBlankGame();
            const player = cyp.actors.add<Player>("Player");
            const solid = cyp.actors.add("FenceWide");
            const activate = (solid.activate = sinon.spy());

            cyp.actions.animateCharacterSetDirection(player, Direction.Top);
            cyp.physics.setMidXObj(player, solid);
            cyp.physics.setTop(player, solid.bottom + player.height);

            // Act
            cyp.inputs.keyDownA(player);

            // Assert
            expect(activate.callCount).to.be.equal(0);
        });
    });
});
