class Player {
    constructor(ctx, index, image, frames, width, height){
        this.ctx = ctx;
        this.i = index;
        this.x = (this.i % 50) * game.squareSize;
        this.y = Math.floor(this.i / 50) * game.squareSize; 
        this.initialIndex = this.i;
        this.initialPosition = {x: this.x, y: this.y};
        this.width = width;
        this.height = height;
        this.keys = {
            up: 'ArrowUp',
            down: 'ArrowDown',
            left: 'ArrowLeft',
            right: 'ArrowRight'
        };
        this.lives = 2;
        this.hasKey = false;
        this.hasTouchedDoor = false;
        // Direction: 0-face, 1-up, 2-right, 3-left
        this.direction = 0;
        this.frames = frames;
        this.counter = 0;
        this.init(frames, image);
        this.image.frameIndex = {x: 0, y: 0};
    }

    init(frames, image) {
        this.image = new Image();
        this.image.pathImage = `img/${image}`;
        this.image.src = this.image.pathImage;
        this.image.frames = frames;
        this.image.frameIndex = {x: 0, y: 0};
        this.setListener();
        }

    draw() {
        this.x = (this.i % 50) * game.squareSize;
        this.y = Math.floor(this.i / 50) * game.squareSize; 
        this.ctx.drawImage(
            this.image,
            this.image.frameIndex.x,
            this.image.frameIndex.y,
            Math.floor(this.image.width / this.frames),
            Math.floor(this.image.height / this.frames),
            this.x,
            this.y,
            this.width,
            this.height,
        );
    }

    setListener() {
        document.onkeydown = e => {
            
            switch (e.key) {
                case this.keys.up:
                    this.moveUp();
                    break;
                case this.keys.down:
                    this.moveDown();
                    break;
                case this.keys.left:
                    this.moveLeft();
                    break;
                case this.keys.right:
                    this.moveRight();
                    break;
            }
        }
    }

    willBeCollision(desiredPositionIndex) {
        return !(game.map[desiredPositionIndex] === 1 
                || game.map[desiredPositionIndex] === 6
                || game.map[desiredPositionIndex] === 7
                || game.map[desiredPositionIndex] === 10);
    }

    updatePosition(desiredPositionIndex) {
        game.map[this.i] = 1;
        this.i = desiredPositionIndex;
        game.map[desiredPositionIndex] = 2;
    }

    walk() {
        this.image.frameIndex.x = (this.image.width / this.frames) * this.counter;
        this.counter++;
        this.counter %= this.frames;
        this.image.frameIndex.y = (this.image.height / this.frames) * this.direction;
    }

    moveUp() {
        const desiredPositionIndex = this.i - 50;
        this.direction = 1;
        this.walk();
        if (!this.willBeCollision(desiredPositionIndex)) {
            this.updatePosition(desiredPositionIndex)
        }
    }

    moveDown() {
        const desiredPositionIndex = this.i + 50;
        this.direction = 0;
        this.walk();
        if (!this.willBeCollision(desiredPositionIndex)) {
            this.updatePosition(desiredPositionIndex)
        }
    }

    moveLeft() {
        const desiredPositionIndex = this.i - 1;
        this.direction = 3;
        this.walk();
        if (!this.willBeCollision(desiredPositionIndex)) {
            this.updatePosition(desiredPositionIndex)
        }
    }

    moveRight() {
        const desiredPositionIndex = this.i + 1;
        this.direction = 2;
        this.walk();
        if (!this.willBeCollision(desiredPositionIndex)) {
            this.updatePosition(desiredPositionIndex)
        }
    }

}
