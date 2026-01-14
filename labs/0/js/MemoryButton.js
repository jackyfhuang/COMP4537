export class MemoryButton {
    constructor(order, container) {
        this.order = order;
        this.container = container;
        this.element = null;
        this.color = this.generateRandomColor();
        this.originalPosition = null;
        this.currentPosition = null;
        this.isClickable = false;
        this.isRevealed = false;
        
        this.createElement();
    }

    generateRandomColor() {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
            '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
            '#F8B739', '#E74C3C', '#3498DB', '#2ECC71'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    createElement() {
        this.element = document.createElement('button');
        this.element.className = 'memory-button';
        this.element.textContent = this.order;
        this.element.style.backgroundColor = this.color;
        this.element.style.height = '5em';
        this.element.style.width = '10em';
        this.element.style.position = 'absolute';
        this.element.style.border = '2px solid #333';
        this.element.style.borderRadius = '8px';
        this.element.style.fontSize = '2em';
        this.element.style.fontWeight = 'bold';
        this.element.style.cursor = 'pointer';
        this.element.style.transition = 'all 0.3s ease';
        
        this.container.appendChild(this.element);
    }

    setInitialPosition(x, y) {
        this.originalPosition = { x, y };
        this.currentPosition = { x, y };
        this.updatePosition();
    }

    scramblePosition(windowWidth, windowHeight) {
        const buttonWidth = 160; // 10em ≈ 160px
        const buttonHeight = 80; // 5em ≈ 80px
        
        const maxX = Math.max(0, windowWidth - buttonWidth);
        const maxY = Math.max(0, windowHeight - buttonHeight);
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        this.currentPosition = { x: randomX, y: randomY };
        this.updatePosition();
    }

    updatePosition() {
        if (this.element && this.currentPosition) {
            this.element.style.left = `${this.currentPosition.x}px`;
            this.element.style.top = `${this.currentPosition.y}px`;
        }
    }

    hideNumber() {
        if (this.element) {
            this.element.textContent = '';
            this.isRevealed = false;
        }
    }

    revealNumber() {
        if (this.element) {
            this.element.textContent = this.order;
            this.isRevealed = true;
        }
    }

    setClickable(clickable) {
        this.isClickable = clickable;
        if (this.element) {
            if (clickable) {
                this.element.style.pointerEvents = 'auto';
                this.element.style.opacity = '1';
            } else {
                this.element.style.pointerEvents = 'none';
                this.element.style.opacity = '0.7';
            }
        }
    }

    onClick(callback) {
        if (this.element) {
            this.element.addEventListener('click', () => {
                if (this.isClickable) {
                    callback(this);
                }
            });
        }
    }

    remove() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    getOrder() {
        return this.order;
    }
}
