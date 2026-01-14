import { UserInterface } from './UserInterface.js';
import { GameEngine } from './GameEngine.js';

export class AppController {
    constructor(rootElement) {
        this.root = rootElement;
        this.ui = null;
        this.gameEngine = null;
        
        this.initialize();
    }

    initialize() {
        this.ui = new UserInterface(this.root);
        const gameContainer = this.ui.getGameContainer();
        this.gameEngine = new GameEngine(gameContainer, this.ui);
        
        this.ui.onStart(() => {
            this.startNewGame();
        });
    }

    startNewGame() {
        const buttonCount = this.ui.getButtonCount();
        
        if (this.gameEngine.isCurrentlyScrambling()) {
            return;
        }
        
        this.ui.clearGameContainer();
        this.gameEngine.startGame(buttonCount);
    }
}
