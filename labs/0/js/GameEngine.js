import { MemoryButton } from './MemoryButton.js';

export class GameEngine {
    constructor(container, ui) {
        this.container = container;
        this.ui = ui;
        this.buttons = [];
        this.buttonCount = 0;
        this.expectedOrder = [];
        this.userClicks = [];
        this.isScrambling = false;
        this.isGameActive = false;
    }

    startGame(buttonCount) {
        this.buttonCount = buttonCount;
        this.expectedOrder = [];
        this.userClicks = [];
        this.isGameActive = false;
        this.isScrambling = true;
        
        this.clearButtons();
        this.createButtons();
        this.positionButtonsInitially();
        this.startSequence();
    }

    clearButtons() {
        this.buttons.forEach(button => button.remove());
        this.buttons = [];
    }

    createButtons() {
        for (let i = 1; i <= this.buttonCount; i++) {
            const button = new MemoryButton(i, this.container);
            this.buttons.push(button);
            this.expectedOrder.push(i);
        }
    }

    positionButtonsInitially() {
        const buttonWidth = 160; // 10em ≈ 160px
        const buttonHeight = 80; // 5em ≈ 80px
        const spacing = 20;
        const startX = 50;
        const startY = 100;
        const windowWidth = window.innerWidth;
        
        const availableWidth = windowWidth - startX - 20;
        const buttonWithSpacing = buttonWidth + spacing;
        const totalWidthNeeded = (this.buttonCount * buttonWidth) + ((this.buttonCount - 1) * spacing);
        
        if (totalWidthNeeded <= availableWidth) {
            this.buttons.forEach((button, index) => {
                const x = startX + (index * buttonWithSpacing);
                const y = startY;
                button.setInitialPosition(x, y);
                button.setClickable(false);
            });
        } else {
            const buttonsPerRow = Math.floor(availableWidth / buttonWithSpacing);
            const actualButtonsPerRow = Math.max(1, buttonsPerRow);
            
            this.buttons.forEach((button, index) => {
                const row = Math.floor(index / actualButtonsPerRow);
                const col = index % actualButtonsPerRow;
                
                const x = startX + (col * buttonWithSpacing);
                const y = startY + (row * (buttonHeight + spacing));
                
                button.setInitialPosition(x, y);
                button.setClickable(false);
            });
        }
    }

    startSequence() {
        this.ui.clearMessage();
        
        setTimeout(() => {
            this.scrambleButtons();
        }, this.buttonCount * 1000);
    }

    scrambleButtons() {
        let scrambleCount = 0;
        const maxScrambles = this.buttonCount;
        
        const doScramble = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            this.buttons.forEach(button => {
                button.scramblePosition(windowWidth, windowHeight);
            });
            
            scrambleCount++;
            
            if (scrambleCount < maxScrambles) {
                setTimeout(doScramble, 2000);
            } else {
                this.finishScrambling();
            }
        };
        
        doScramble();
    }

    finishScrambling() {
        this.isScrambling = false;
        this.isGameActive = true;
        
        this.buttons.forEach(button => {
            button.hideNumber();
            button.setClickable(true);
            button.onClick((clickedButton) => this.handleButtonClick(clickedButton));
        });
    }

    handleButtonClick(clickedButton) {
        if (!this.isGameActive || this.isScrambling) {
            return;
        }

        const clickedOrder = clickedButton.getOrder();
        this.userClicks.push(clickedOrder);
        
        const expectedClick = this.expectedOrder[this.userClicks.length - 1];
        
        if (clickedOrder === expectedClick) {
            clickedButton.revealNumber();
            
            if (this.userClicks.length === this.buttonCount) {
                this.winGame();
            }
        } else {
            this.loseGame();
        }
    }

    winGame() {
        this.isGameActive = false;
        this.ui.showMessage('EXCELLENT_MEMORY');
    }

    loseGame() {
        this.isGameActive = false;
        this.ui.showMessage('WRONG_ORDER');
        
        this.buttons.forEach(button => {
            button.revealNumber();
            button.setClickable(false);
        });
    }

    isCurrentlyScrambling() {
        return this.isScrambling;
    }
}
