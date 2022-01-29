const image = document.getElementById('source');


class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }

        this.width = 45
        this.height = 100
        this.image = image
        this.a = 0
    }

    // sprite image/ character
    draw() {
        //     c.fillStyle = 'green'
        //    c.fillRect(this.position.x,
        //         this.position.y, this.width, this.height)
        if (this.image) {
            c.drawImage(image, 10, 0, 30, 30, this.position.x, this.position.y, 100, 100)
        } else {
            console.log("noImage")
        }
    }

    //     drag(){
    //         if(this.velocity.x > 0){
    //             this.velocity.x -= .01
    //         }
    //         if(this.velocity.x > 3){
    //             this.velocity.x = 3
    //         }
    //         if(this.velocity.x < 0){
    //             this.velocity.x += .01
    //         }
    //         if(this.velocity.x < -3){
    //             this.velocity.x = -3
    //         }
    // }

    fall() {
        if (this.position.y + this.height +
            this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y -= 0
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height +
            this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }
}