import { createCypInterface } from "./index";

const container = document.getElementById("game")!;

createCypInterface(container).catch((error: Error): void => {
    console.error("An error happened while trying to instantiate ChooseYourFramework!");
    console.error(error);
});
