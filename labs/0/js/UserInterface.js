import { STRINGS } from './strings.js';

export class UserInterface {
    constructor(rootElement) {
        this.root = rootElement;
        this.labelElement = null;
        this.inputElement = null;
        this.startButton = null;
        this.messageElement = null;
        this.gameContainer = null;
        
        this.render();
    }

    render() {
        this.root.innerHTML = '';
        
        const container = document.createElement('div');
        container.className = 'ui-container';
        
        this.labelElement = document.createElement('label');
        this.labelElement.textContent = STRINGS.PROMPT_LABEL;
        this.labelElement.setAttribute('for', 'button-count-input');
        
        this.inputElement = document.createElement('input');
        this.inputElement.type = 'number';
        this.inputElement.id = 'button-count-input';
        this.inputElement.min = '3';
        this.inputElement.max = '7';
        this.inputElement.placeholder = STRINGS.INPUT_PLACEHOLDER;
        
        this.startButton = document.createElement('button');
        this.startButton.type = 'button';
        this.startButton.textContent = STRINGS.BUTTON_GO;
        
        this.messageElement = document.createElement('p');
        this.messageElement.className = 'message';
        this.messageElement.id = 'message';
        
        this.gameContainer = document.createElement('div');
        this.gameContainer.id = 'game-container';
        this.gameContainer.className = 'game-container';
        
        container.appendChild(this.labelElement);
        container.appendChild(this.inputElement);
        container.appendChild(this.startButton);
        container.appendChild(this.messageElement);
        container.appendChild(this.gameContainer);
        
        this.root.appendChild(container);
    }

    getButtonCount() {
        return parseInt(this.inputElement.value, 10);
    }

    validateInput() {
        const count = this.getButtonCount();
        if (isNaN(count) || count < 3 || count > 7) {
            this.showMessage('INVALID_INPUT');
            return false;
        }
        return true;
    }

    onStart(callback) {
        this.startButton.addEventListener('click', () => {
            if (this.validateInput()) {
                callback();
            }
        });
    }

    showMessage(messageKey) {
        if (STRINGS[messageKey]) {
            this.messageElement.textContent = STRINGS[messageKey];
        } else {
            this.messageElement.textContent = messageKey;
        }
    }

    clearMessage() {
        this.messageElement.textContent = '';
    }

    getGameContainer() {
        return this.gameContainer;
    }

    clearGameContainer() {
        this.gameContainer.innerHTML = '';
    }
}
