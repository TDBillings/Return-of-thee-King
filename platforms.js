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