// c = context 
const canvas = document.querySelector('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
const c = canvas.getContext('2d')
const backdrop = document.getElementById('backdrop');
const backdropscroll = 20
var backdropwidth = 0
var momentum = 20*100
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
        c.save()
        c.font = "200px Ariel"
        c.fillStyle = "rgb(102, 21, 52)"
        c.textAlign = "center"
        
        c.fillText("You Have Fallen", canvas.width / 2, canvas.height / 2)
        c.restore()
        restart()
        
        // Save score to PC
        if(highscore < Math.floor(scrolloffset / 100)){
            window.localStorage.setItem("High-Score", Math.floor(scrolloffset / 100))
        }
        
        if (player.dead && player.sprite.deathAnimationDone()){
            
            cancelAnimationFrame(frame)
            return
        }

        player.sprite.setAnimationType("die")
        player.dead = true 
        return

    }
    function restart(){
        var element = document.getElementById("Restart");
        element.classList.add("show")
    }

    // speed increase
    if (scrolloffset > momentum){

        player.speed += 1
        momentum += momentum
    }

    // player movement
    if (keys.right.pressed && player.position.x < 300) {
        player.velocity.x = player.speed
    } else if (keys.left.pressed && player.position.x > 300) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0

        // platform movement
        if (keys.right.pressed) {
            scrolloffset += player.speed
            platforms.forEach(platform => {
                platform.position.x -= player.speed
            })

        } else if (keys.left.pressed) {
            scrolloffset -= player.speed
            platforms.forEach(platform => {
                platform.position.x += player.speed
            })

        }

    }

    // highScore tracker/ current distance 
    c.font = "60px Ariel"
    c.textAlign = "left"
    currentscorediv.textContent = "Current:  " + Math.floor(scrolloffset / 100) + " Yalms"
    highscorediv.textContent ="High Score:  " + highscore + " Yalms" 
    // c.fillText("Current:" + Math.floor(scrolloffset / 100) + "Yalms", 15, 50)
    // c.fillText("High Score:" + highscore + "Yalms", 15, 95)

    // MESSY COLLISION DETECTION
    platforms.forEach(platform => {
        if (checkcollision(player, platform)) {
            player.velocity.y = 0
            player.canJump = 2
        }
    })


}

animate()


function checkcollision(object1, object2){
    if (object1.position.y + object1.height <= object2.position.y &&
        object1.position.y + object1.height + object1.velocity.y >= object2.position.y &&
        object1.position.x + object1.width >= object2.position.x &&
        object1.position.x <= object2.position.x + object2.width) {
        return true 
    }
    return false
}

// key pressed truthy?
window.addEventListener('keydown', ({
    keyCode
}) => {

    if (player.dead)return
   
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

    if(player.dead)return

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