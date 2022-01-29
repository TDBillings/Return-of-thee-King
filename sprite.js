class Sprite {
    constructor(image){
        this.image = image
        this.rows = 5
        this.coloumns = 10
        this.spriteWidth = 30
        this.spriteHeight = 30 
        this.xOffset = 6
        this.yOffset = 0.5
        this.anitmateCol = 0
        this.anitmateRow = 0

    } 

    showSprite(c, position){

        let xOffset = this.image.width/this.coloumns * this.anitmateCol
        let yOffset = this.image.height/this.rows * this.anitmateRow
        c.drawImage(this.image, this.xOffset + xOffset, this.yOffset + yOffset, this.spriteWidth, this.spriteHeight, position.x, position.y, 100, 100,)
        console.log(xOffset, this.image.width)    
    }

    startAnimation(){

        setInterval(() =>{
            this.anitmateCol++ 
            this.anitmateCol = this.anitmateCol % this.coloumns
        },450)
    }

    setAnimationType(status){

      switch (status){
      case "idol":
          this.anitmateRow = 0
          break

          case "run":
              this.anitmateRow = 2
              break

              case "die":
                  this.anitmateRow = 4
                  break
      }  

    }

}

