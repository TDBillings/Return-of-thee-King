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

        this.width = 45
        this.height = 100
        this.image = false
        this.a = 0
    }

        // sprite image/ character
    draw(){
    //     c.fillStyle = 'green'
    //    c.fillRect(this.position.x,
    //         this.position.y, this.width, this.height)
            if (this.image){
                c.drawImage(image, 10, 0, 30, 30, this.position.x, this.position.y, 100, 100)
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

    fall(){
        if(this.position.y + this.height +
            this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        else this.velocity.y -= 0
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

    // platforms
class Platform{
    constructor({x, y}){
       this.position = {
         x,
         y
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
// const platform = new Platform(50, 600)
const platforms = [new Platform({x:50, y:600
}), new Platform({x:150, y:700})]

// Random platforms
function Generateplat(){
    var width  = 200 
    var height = 30
    var lastX = 50
    for (let i = 0; i < 1000; i++){
        platforms.push(new Platform({x:lastX, y:600}))
        if(
            Math.random()>0.75
        ){
            lastX +=width 
            if(Math.random()>0.55) lastX +=Math.floor(width*(1+Math.random()));
            }
        lastX += width
        console.log(lastX, width)
    }
}

Generateplat()

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
    attack: {
        pressed: false
    },
}

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })
        
        
    
    

        // player movement
    if (keys.right.pressed && player.position.x < 1400){
        player.velocity.x = 7
    } else if (keys.left.pressed && player.position.x > 400){
        player.velocity.x = -7
    } else {
        player.velocity.x = 0
        
        // platform movement
    if (keys.right.pressed){ platforms.forEach(platform => {
        platform.position.x -= 7
    })
        
} else if (keys.left.pressed){ platforms.forEach(platform => {
            platform.position.x += 7 
        })
           
        }

    }
        
        // MESSY COLLISION DETECTION
         platforms.forEach(platform => {
    if (player.position.y + player.height <= platform.position.y
    && player.position.y + player.height + player.velocity.y >= platform.position.y
    && player.position.x + player.width >= platform.position.x 
    && player.position.x <= platform.position.x + platform.width){
    player.velocity.y = 0
    }
})


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
        player.velocity.y -= 20
        // player.jump()
        break

        case 83:
        console.log('fall')
        player.fall()
        break

        // case 32:
        // console.log('attack')
        // keys.attack.pressed = true
        // player.attack()
        // break
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

        // case 32:
        // console.log('attack')
        // keys.attack.pressed = false
        // break
    }
})

image.addEventListener('load', e => {
    player.image = image
 });       

   

