const canvas = document.querySelector('canvas')

// c = context 
const c = canvas.getContext('2d')
// const image = document.getElementById('source');

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.5
// var distance = 0
let scrolloffset = 0

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
    }
    draw() {
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y,
            this.width, this.height)
    }
}

const player = new Player()
// const platform = new Platform(50, 600)
const platforms = []
//  [new Platform({x:50, y:600
// }), new Platform({x:150, y:700})]

// Random platforms
function Generateplat() {
    var width = 200
    var height = 30
    var lastX = 50
    var lastY = 0
    var minY = player.height + 130
    var maxY = canvas.height - 15
    var nextY = minY + Math.random() * (maxY - minY)
    for (let i = 0; i < 1000; i++) {
        platforms.push(new Platform({
            x: lastX,
            y: nextY
        }))
        if (Math.random() > 0.75) {
            var lol = 0
        
            while (nextY - lastY < - 145 || nextY - lastY == 0) {
            nextY = minY + Math.random() * (maxY - minY)
            lol++
            if (lol > 5) break;
        }


            lastX += width
            if (Math.random() > 0.55) lastX += Math.floor(width * (1 + Math.random()));
        }
        lastX += width
        lastY = nextY * 1

        console.log(nextY, lastY, nextY - lastY)
    }
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
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })


    if (player.position.y > canvas.height - player.height) {
        cancelAnimationFrame(frame)
        c.save()
        c.font = "200px Ariel"
        c.fillStyle = "red"
        c.textAlign = "center"
        c.fillText("You Fell", canvas.width / 2, canvas.height / 2)
        c.restore()
        deathButton()
        console.log("DEAD")
    }

    function deathButton(){
        var element = document.getElementById("Restart");
        element.classList.add("show")
    }

    


    // player movement
    if (keys.right.pressed && player.position.x < 600) {
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

    console.log(scrolloffset)
    c.font = "60px Ariel"
    c.textAlign = "left"
    c.fillText("*" + Math.floor(scrolloffset / 100) + "Yalms", 15, 50)

    // MESSY COLLISION DETECTION
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })


}

animate()

// key pressed truthy?
window.addEventListener('keydown', ({
    keyCode
}) => {
    // console.log(keyCode)

    switch (keyCode) {
        case 65:
            // console.log('left')
            keys.left.pressed = true
            // player.velocity.x -= 1
            break

        case 68:
            // console.log('right')
            keys.right.pressed = true
            // player.velocity.x += 1
            break

        case 87:
            // console.log('jump')
            keys.jump.pressed = true
            player.velocity.y -= 20
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
            break

        case 68:
            // console.log('right')
            keys.right.pressed = false
            player.velocity.x = 0
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