document.addEventListener("DOMContentLoaded", () => {
    //basic initiallisation
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const cellSize = height / 10;

    let camX = 0;

    const gameMap = [
        // 0 = empty space, 1 = ground
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
        [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    class Player {
        constructor(x, y, width, height, speed) {
            this.width = width;
            this.height = height;
            this.x = x - this.width / 2;
            this.y = y;
            this.flip = false;
            this.velX = 0;
            this.velY = 0;
            this.speed = speed;
            this.gravity = 2;
        }

        getTileCoord() {
            return {
                left: Math.floor(this.x / cellSize),
                right: Math.floor((this.x + this.width) / cellSize),
                top: Math.floor(this.y / cellSize),
                mid: Math.floor((this.y + this.height - 0.1) / cellSize),
                bottom: Math.floor((this.y + this.height) / cellSize),
            };
        }

        drawPlayer() {
            ctx.fillStyle = "white";
            ctx.fillRect(
                width / 2 - this.width / 2,
                this.y,
                this.width,
                this.height
            );
        }

        checkCollisionGround() {
            const bounds = this.getTileCoord();

            if (this.velY >= 0) {
                const row = bounds.bottom;
                for (let col = bounds.left; col <= bounds.right; col++) {
                    if (gameMap[row] && gameMap[row][col] === 1) {
                        this.y = row * cellSize - this.height;
                        this.velY = 0;
                        return true;
                    }
                }
            } else if (this.velY < 0) {
                const row = bounds.top;
                for (let col = bounds.left; col <= bounds.right; col++) {
                    if (gameMap[row] && gameMap[row][col] === 1) {
                        this.y = (row + 2) * cellSize;
                        this.velY = 0;
                        return false;
                    }
                }
            }

            return false;
        }

        checkCollisionWall() {
            const bounds = this.getTileCoord();

            if (this.velX > 0) {
                const col = bounds.right;

                for (let row = bounds.top; row <= bounds.mid; row++) {
                    if (gameMap[row] && gameMap[row][col] === 1) {
                        this.x = col * cellSize - this.width - 0.001;
                        this.velX = 0;
                        break;
                    }
                }
            } else if (this.velX < 0) {
                const col = bounds.left;

                for (let row = bounds.top; row <= bounds.mid; row++) {
                    if (gameMap[row] && gameMap[row][col] === 1) {
                        this.x = (col + 1) * cellSize + 0.001;
                        this.velX = 0;
                        break;
                    }
                }
            }
        }

        physics() {
            if (!this.checkCollisionGround()) {
                this.velY += this.gravity;
            }
        }

        movement() {
            this.physics();

            this.x += this.velX;
            this.checkCollisionWall();

            this.y += this.velY;
        }
    }

    const player = new Player(width / 2, 50, height / 20, height / 20, 10);

    const drawMap = () => {
        let groundX = camX;
        let groundY = 0;
        for (let row = 0; row < gameMap.length; row++) {
            for (let cell = 0; cell < gameMap[row].length; cell++) {
                if (gameMap[row][cell] === 1) {
                    ctx.fillStyle = "brown";
                    ctx.fillRect(groundX, groundY, cellSize, cellSize);
                }

                groundX += cellSize;
            }
            groundY += cellSize;
            groundX = camX;
        }
    };

    const lerp = (start, end, t) => {
        return (1 - t) * start + t * end;
    };

    let key = {};

    window.addEventListener("keydown", (e) => {
        key[e.code] = true;
    });

    window.addEventListener("keyup", (e) => {
        key[e.code] = false;
    });

    const update = () => {
        player.velX = 0;

        if (key["ArrowRight"]) {
            player.velX = player.speed;
        } else if (key["ArrowLeft"]) {
            player.velX = -player.speed;
        }

        if (key["ArrowUp"] && player.checkCollisionGround()) {
            player.velY = -28;
        }

        camX = lerp(camX, -(player.x + player.width / 2 - width / 2), 0.25);

        player.movement();
    };

    const gameloop = () => {
        update();
        ctx.clearRect(0, 0, width, height);
        player.drawPlayer();
        drawMap();
        window.requestAnimationFrame(gameloop);
    };

    gameloop();
});
