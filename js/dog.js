class Dog {
    constructor(ctx, index, image, width = game.squareSize, height = game.squareSize, frames = 3, speed = 1) {
        this.ctx = ctx;
        this.i = index;
        this.x = (this.i % 50) * game.squareSize;
        this.y = Math.floor(this.i / 50) * game.squareSize; 
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = 0;
        this.frames = frames;
        this.counter = 0;
        this.init(frames, image);
        this.image.frameIndex = {x: 0, y: (this.image.height / 4) * 2};
    }

    init(frames, image) {
        this.image = new Image();
        this.image.pathImage = `img/${image}`;
        this.image.src = this.image.pathImage;
        this.image.frames = frames;
    }

    draw() {
        this.x = (this.i % 50) * game.squareSize;
        this.y = Math.floor(this.i / 50) * game.squareSize; 
        this.ctx.drawImage(
            this.image,
            this.image.frameIndex.x,
            this.image.frameIndex.y,
            Math.floor(this.image.width / this.frames),
            Math.floor(this.image.height / 4),
            this.x,
            this.y,
            this.width,
            this.height,
        );
    }

    walk() {
        this.image.frameIndex.x = (this.image.width / this.frames) * this.counter;
        this.counter++;
        this.counter %= this.frames;
        this.image.frameIndex.y = (this.image.height / 4) * this.direction;
    }

    randomMovement() {
        let possibleMovements = [-1, 1, -50, 50];
        let randomNumber = Math.floor(Math.random() * 4);
        let randomMovement = possibleMovements[randomNumber]; 
        this.speed = randomMovement;
    }

    // Direction: 0-face, 1-up, 2-right, 3-left
    updateDirection(speed) {
        switch(speed) {
            case -1: 
                this.direction = 3;
                break;
            case 1:
                this.direction = 2;
                break;
            case -50:
                this.direction = 1;
                break;
            case 50:
                this.direction = 0;
                break;
        }
    }

    willBeCollision(desiredPositionIndex) {
        return game.map[desiredPositionIndex] !== 1;
    }

    move() {
        this.randomMovement();
        const desiredPositionIndex = this.i + this.speed;
        this.updateDirection(this.speed);
        if (this.willBeCollision(desiredPositionIndex)) this.speed *= -1;
        this.walk();
        // 8 is dog number in map array
        this.updatePosition(8);
    }

    updatePosition(number) {
        game.map[this.i] = 1;
        game.map[this.i + this.speed] = number;
        this.i += this.speed; 
    }
    
}
