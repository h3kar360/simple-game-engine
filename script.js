document.addEventListener("DOMContentLoaded", () => {
    //basic initiallisation
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const cellSize = height / 15;

    let camX = 0;

    const gameMap = [
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
        [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
        [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
        [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
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
            this.nearWorldBounds = false;
        }

        getTileCoord() {
            return {
                left: Math.floor(this.x / cellSize),
                right: Math.floor((this.x + this.width) / cellSize),
                top: Math.floor(this.y / cellSize),
                mid: Math.floor((this.y + this.height - 1) / cellSize),
                bottom: Math.floor((this.y + this.height) / cellSize),
            };
        }

        drawPlayer() {
            ctx.fillStyle = "white";
            ctx.fillRect(
                !this.nearWorldBounds ? width / 2 - this.width / 2 : this.x,
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
                    if (
                        (gameMap[row] && gameMap[row][col] === 1) ||
                        !(col + 1)
                    ) {
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
            this.x += this.velX;
            this.checkCollisionWall();

            this.y += this.velY;
            this.physics();
        }
    }

    class ThingsWDialog {
        constructor(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        draw() {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        async dialog() {
            await document.fonts.load("18px pixelated-font");

            ctx.fillStyle = "black";
            ctx.font = "18px pixelated-font";
            ctx.fillText("GoodWillarfun player!", this.x + 20, this.y - 30);
        }
    }

    const player = new Player(width / 2, 350, height / 20, height / 20, 10);
    const wizard = new ThingsWDialog(
        100,
        (height / 15) * 11 - height / 20,
        height / 20,
        height / 20
    );

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
        //player movement
        player.velX = 0;

        if (key["ArrowRight"]) {
            player.velX = player.speed;
        } else if (key["ArrowLeft"]) {
            player.velX = -player.speed;
        }

        if (key["ArrowUp"] && player.checkCollisionGround()) {
            player.velY = -28;
        }

        if (lerp(camX, -(player.x + player.width / 2 - width / 2), 0.2) < 0) {
            camX = lerp(camX, -(player.x + player.width / 2 - width / 2), 0.2);
            player.nearWorldBounds = false;
        } else {
            camX = camX;
            player.nearWorldBounds = true;
        }

        player.movement();
        wizard.x = camX + 100;

        //draw elements
        wizard.draw();
        player.drawPlayer();

        //wizard dialog toggle
        if (Math.abs(player.x - wizard.x) <= 200) {
            wizard.dialog();
        }
    };

    const gameloop = () => {
        ctx.clearRect(0, 0, width, height);
        update();
        drawMap();
        window.requestAnimationFrame(gameloop);
    };

    gameloop();
});
