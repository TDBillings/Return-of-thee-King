const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')
const image = document.getElementById('source');

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.5

class Player {
    constructor(){
        this.position ={
            x:100,
            y:100
        }
        this.velocity = {
            x: 0,
            y: 1
        }

        this.width = 100
        this.height = 100
        this.image = false
        this.a = 0
    }

    draw(){
        // c.fillStyle = 'green'
    //    c.fillRect(this.position.x,
    //         this.position.y, this.width, this.height)
            if (this.image){
                c.drawImage(image, this.a * 40, 0, 40, 30, this.position.x, this.position.y, 100, 100)
            console.log('pptouch')
            // this.a += 1
            // this.a = this.a%9
            }
    }

    drag(){
        if(this.velocity.x > 0){
            this.velocity.x -= .01
        }
        if(this.velocity.x > 3){
            this.velocity.x = 3
        }
        if(this.velocity.x < 0){
            this.velocity.x += .01
        }
        if(this.velocity.x < -3){
            this.velocity.x = -3
        }
}

    jump(){
        if(this.position.y + this.height +
            this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        else this.velocity.y -= 20
    }
    
    update() {
        this.draw()
        // this.drag()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if(this.position.y + this.height +
            this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

const player = new Player()

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
}

animate()

window.addEventListener('keydown', ({keyCode}) =>{
    console.log(keyCode)

    switch (keyCode){
        case 65:
        console.log('left')
        player.velocity.x -= 1
        break

        case 68:
        console.log('right')
        player.velocity.x += 1
        break

        case 87:
        console.log('jump')
        // player.velocity.y -= 20
        player.jump()
        break
    }
})
window.addEventListener('keyup', ({keyCode}) =>{
    console.log(keyCode)

    switch (keyCode){
        case 65:
        console.log('left')
        player.velocity.x = 0
        break

        case 68:
        console.log('right')
        player.velocity.x = 0
        break

        case 87:
        console.log('jump')
        player.velocity.y = 0
        break
    }
})

image.addEventListener('load', e => {
    player.image = image
 });