class Heart {
    constructor(ctx, index, width, height) { 
        this.ctx = ctx;
        this.i = index;
        this.x = (this.i % 50) * 20;
        this.y = Math.floor(this.i / 50) * 20; 
        this.width = width;
        this.height = height;
        this.toDelete = false
    }

    isCollision(bool) {
        if (bool) this.addOneLife();
    }

    addOneLife() {
        game.player.lives++;
        game.map[this.i] = 1;
        this.toDelete = true;
    }

}
