class imageEntity {
    constructor(picSrc, x, y){
        this.picSrc = picSrc;
        this.x = x;
        this.y = y;
        this.dragging = false;
        this.image = new Image();
        this.image.src = picSrc;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, 100, 100);
    }

    hitTest(mouseX, mouseY){
        return (mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y && mouseY < this.y + 100);
    }

    move(mouseX, mouseY){
        this.x = mouseX - 50;  // Subtract half of the width and height to center the image at the mouse location
        this.y = mouseY - 50;
    }
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let bgImage = new Image();
let bgSelect = document.getElementById("bgSelect");

bgSelect.onchange = function() {
    bgImage.src = bgSelect.value;
};

bgImage.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
};

bgImage.src = bgSelect.value;

var arrayOfImageEntity = [
    new imageEntity("DemonHunterIcon.png", 50, 50),
    new imageEntity("DKIcon.png", 200, 50),
    // add more entities with their image paths and starting positions
];

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height); // draw the background image
}

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    canvas.onmousedown = myDown;
    canvas.onmouseup = myUp;
    canvas.onmousemove = myMove;

    requestAnimationFrame(draw);  // Use this instead of setInterval for better performance
}

function myMove(e){
    var mouseX = e.pageX - canvas.offsetLeft;
    var mouseY = e.pageY - canvas.offsetTop;
    
    for (let entity of arrayOfImageEntity){
        if (entity.dragging){
            entity.move(mouseX, mouseY);
        }
    }
}

function myDown(e){
    var mouseX = e.pageX - canvas.offsetLeft;
    var mouseY = e.pageY - canvas.offsetTop;
    
    for (let entity of arrayOfImageEntity){
        if (entity.hitTest(mouseX, mouseY)){
            entity.dragging = true;
        }
    }
}

function myUp(e){
    for (let entity of arrayOfImageEntity){
        entity.dragging = false;
    }
}

function draw() {
    clear();
    for (let entity of arrayOfImageEntity){
        entity.draw(ctx);
    }
    requestAnimationFrame(draw);
}

init();