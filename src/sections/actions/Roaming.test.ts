import { expect } from "chai";

import { stubBlankGame } from "../../fakes.test";
import { ChooseYourFramework } from "../../ChooseYourFramework";
import { Direction } from "../Constants";

import { randomRoamingMaximumFrequency, randomRoamingMinimumTicks } from "./Roaming";

const getTicksForSteps = (cyp: ChooseYourFramework, minimumSteps: number) =>
    (randomRoamingMaximumFrequency + randomRoamingMinimumTicks) *
    cyp.frameTicker.getInterval() *
    minimumSteps;

describe("Roaming", () => {
    describe("startRoaming", () => {
        for (const direction of [
            Direction.Top,
            Direction.Right,
            Direction.Bottom,
            Direction.Left,
        ]) {
            it(`only allows a character to roam ${Direction[direction]} when the only allowed direction is ${Direction[direction]}`, () => {
                // Arrange
                const { clock, cyp, player } = stubBlankGame();
                const npc = cyp.actors.add(
                    [
                        cyp.actors.names.lady,
                        {
                            roaming: true,
                            roamingDirections: [direction],
                        },
                    ],
                    player.left,
                    player.top
                );

                // Act
                clock.tick(getTicksForSteps(cyp, 5));

                // Assert
                expect(cyp.physics.getDirectionBetween(player, npc)).to.be.equal(direction);
            });
        }

        for (const direction of [
            Direction.Top,
            Direction.Right,
            Direction.Bottom,
            Direction.Left,
        ]) {
            it(`doesn't allow roaming to exceed 3 steps when when the only allowed direction is ${Direction[direction]}`, () => {
                // Arrange
                const { clock, cyp, player } = stubBlankGame();
                const npc = cyp.actors.add(
                    [
                        cyp.actors.names.lady,
                        {
                            roaming: true,
                            roamingDirections: [direction],
                        },
                    ],
                    player.left,
                    player.top
                );

                // Act
                clock.tick(getTicksForSteps(cyp, 10));

                // Assert
                const distance =
                    direction % 2 === 1
                        ? Math.abs(cyp.physics.getMidX(player) - cyp.physics.getMidX(npc))
                        : Math.abs(cyp.physics.getMidY(player) - cyp.physics.getMidY(npc));

                // NPCs seems to travel an extra 3-4 game pixels each in-between step
                // See https://github.com/FullScreenShenanigans/ChooseYourFramework/issues/410
                expect(distance).to.be.approximately(npc.width * 3 + 7, 1);
            });
        }
    });
});
