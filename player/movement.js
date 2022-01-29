// c = context 
const canvas = document.querySelector('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
const c = canvas.getContext('2d')
const backdrop = document.getElementById('backdrop');
const backdropscroll = 8
var backdropwidth = 0
const wallimage = document.getElementById('background wall');
const platformimage = document.getElementById('rock ledge');
const gravity = 0.5
const highscorediv = document.getElementById('High-Score')
const currentscorediv = document.getElementById('Current-Score')
const player = new Player()
const platforms = []
// const image = document.getElementById('source');

let scrolloffset = 0
let highscore = Math.floor(window.localStorage.getItem("High-Score"))

// platforms
class Platform {
    constructor({
        x,
        y
    }) {
        this.position = {
            x,
            y
        }
        this.width = 200
        this.height = 30
        this.platformimage = platformimage
    }
    draw() {

        c.drawImage(wallimage, this.position.x, this.position.y, this.width, canvas.height - this.position.y)
        c.drawImage(platformimage, this.position.x, this.position.y, 200, 40)
    }
}

// Random platforms
function Generateplat() {
    var width = 200
    var height = 30
    var lastX = 50
    var lastY = 0
    var minY = player.height + 130 
    var maxY = canvas.height - 30
    var nextY = minY + Math.random() * (maxY - minY)
    for (let i = 0; i < 1000; i++) {
        platforms.push(new Platform({
            x: lastX,
            y: nextY
        }))
        if (Math.random() > 0.75) {
            var far = 0
        
            while (lastY - nextY > 400 || nextY - lastY == 0) {
            nextY = minY + Math.random() * (maxY - minY)
            far++
            // if (far > 5) break;
        }
            lastX += width
            if (Math.random() > 0.55) lastX += Math.floor(width * (1 + Math.random()));
        }

        lastX += width
        lastY = nextY 
    } 

    backdropwidth = platforms[platforms.length-1].position.x / backdropscroll
}

Generateplat()

// tracked inputs 
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

// print world 
function animate() {
    let frame = requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    // image stretch to last X   NEED FIX
    c.drawImage(backdrop, -scrolloffset / backdropscroll, 0, backdropwidth, backdrop.height)

    

    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })

// Lose Condition
    if (player.position.y > canvas.height - player.height) {
        cancelAnimationFrame(frame)
        c.save()
        c.font = "200px Ariel"
        c.fillStyle = "red"
        c.textAlign = "center"
      
        c.fillText("You Have Fallen", canvas.width / 2, canvas.height / 2)
        c.restore()
        restart()
       
        // Save score to PC
        if(highscore < Math.floor(scrolloffset / 100)){
            window.localStorage.setItem("High-Score", Math.floor(scrolloffset / 100))
        }
    }
    function restart(){
        var element = document.getElementById("Restart");
        element.classList.add("show")
    }

    // player movement
    if (keys.right.pressed && player.position.x < 300) {
        player.velocity.x = 7
    } else if (keys.left.pressed && player.position.x > 300) {
        player.velocity.x = -7
    } else {
        player.velocity.x = 0

        // platform movement
        if (keys.right.pressed) {
            scrolloffset += 7
            platforms.forEach(platform => {
                platform.position.x -= 7
            })

        } else if (keys.left.pressed) {
            scrolloffset -= 7
            platforms.forEach(platform => {
                platform.position.x += 7
            })

        }

    }

    // highScore tracker/ current distance 
    c.font = "60px Ariel"
    c.textAlign = "left"
    currentscorediv.textContent = "Current:" + Math.floor(scrolloffset / 100) + "Yalms"
    highscorediv.textContent ="High Score:" + highscore + "Yalms" 
    // c.fillText("Current:" + Math.floor(scrolloffset / 100) + "Yalms", 15, 50)
    // c.fillText("High Score:" + highscore + "Yalms", 15, 95)

    // MESSY COLLISION DETECTION
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
            player.canJump = 2
        }
    })


}

animate()

// key pressed truthy?
window.addEventListener('keydown', ({
    keyCode
}) => {
   
     switch (keyCode) {
        case 65:
             keys.left.pressed = true
             player.sprite.setAnimationType("run")
            break

        case 68:
            keys.right.pressed = true
            player.sprite.setAnimationType("run")
            break

        case 87:
            // console.log('jump')
            keys.jump.pressed = true
            // player.velocity.y -= 20
            if(player.canJump){
                player.velocity.y -= 20
                if(player.velocity.y<-20){
                    player.velocity.y = -20
                }
                player.canJump-- 
                console.log(player.velocity.y)
            }

            // player.jump()
            break
            

        case 83:
            // console.log('fall')
            player.fall()
            break

            // case 32:
            // console.log('attack')
            // keys.attack.pressed = true
            // player.attack()
            // break
    }
})
window.addEventListener('keyup', ({
    keyCode
}) => {
    // console.log(keyCode)

    switch (keyCode) {
        case 65:
            // console.log('left')
            keys.left.pressed = false
            player.velocity.x = 0
            player.sprite.setAnimationType("idol")
            break

        case 68:
            // console.log('right')
            keys.right.pressed = false
            player.velocity.x = 0
            player.sprite.setAnimationType("idol")
            break

        case 87:
            // console.log('jump')
            keys.jump.pressed = false
            player.velocity.y = 0
            break

            // case 32:
            // console.log('attack')
            // keys.attack.pressed = false
            // break
    }
})

document.getElementById("Restart").addEventListener('click', e => {
    location.reload()
})