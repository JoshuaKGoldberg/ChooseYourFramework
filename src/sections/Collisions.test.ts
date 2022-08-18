import { expect } from "chai";

import { stubBlankGame } from "../fakes.test";

import { Character } from "./Actors";

describe("Collisions", () => {
    describe("isCharacterTouchingCharacter", () => {
        const stubCharacterType: [string, any] = [
            "Lady",
            {
                width: 8,
                height: 12,
            },
        ];

        it("returns true when characters are touching", (): void => {
            // Arrange
            const { cyp } = stubBlankGame();
            const isCharacterTouchingCharacter =
                cyp.collisions.generateIsCharacterTouchingCharacter();
            const a = cyp.actors.add<Character>(stubCharacterType);
            const b = cyp.actors.add<Character>(stubCharacterType);

            cyp.physics.setTop(b, a.bottom);

            // Act
            const touching: boolean = isCharacterTouchingCharacter(a, b);

            // Assert
            expect(touching).to.be.equal(true);
        });

        it("returns false when characters aren't touching", (): void => {
            // Arrange
            const { cyp } = stubBlankGame();
            const isCharacterTouchingCharacter =
                cyp.collisions.generateIsCharacterTouchingCharacter();
            const a = cyp.actors.add<Character>(stubCharacterType);
            const b = cyp.actors.add<Character>(stubCharacterType);

            cyp.physics.setTop(b, a.bottom + 28);

            // Act
            const touching: boolean = isCharacterTouchingCharacter(a, b);

            // Assert
            expect(touching).to.be.equal(false);
        });
    });
});
