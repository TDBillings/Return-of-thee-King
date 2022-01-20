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

    jump(){
        if(this.position.y + this.height +
            this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        else this.velocity.y -= 20
    }
    
    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if(this.position.y + this.height +
            this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

class Platform{
    constructor(){
       this.position = {
         x: 50,
         y: 400  
       } 
       this.width = 200
       this.height = 30
    }
    draw(){
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y,
            this.width, this.height)
         }
}

const player = new Player()
const platform = new Platform()

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    jump: {
        pressed: false
    },
}

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platform.draw()

    if (keys.right.pressed){
        player.velocity.x = 7
    } 

    if (keys.left.pressed){
        player.velocity.x = -7
    } 
                // MESSY COLLISION DETECTION
    if (player.position.y + player.height <= platform.position.y
        && player.position.y + player.height + player.velocity.y >= platform.position.y
        && player.position.x + player.width >= platform.position.x 
        && player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0
    }
    

}

animate()

window.addEventListener('keydown', ({keyCode}) =>{
    console.log(keyCode)

    switch (keyCode){
        case 65:
        console.log('left')
        keys.left.pressed = true
        // player.velocity.x -= 1
        break

        case 68:
        console.log('right')
        keys.right.pressed = true
        // player.velocity.x += 1
        break

        case 87:
        console.log('jump')
        keys.jump.pressed = true
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
        keys.left.pressed = false
        player.velocity.x = 0
        break

        case 68:
        console.log('right')
        keys.right.pressed = false
        player.velocity.x = 0
        break

        case 87:
        console.log('jump')
        keys.jump.pressed = false
        player.velocity.y = 0
        break
    }
})

image.addEventListener('load', e => {
    player.image = image
 });