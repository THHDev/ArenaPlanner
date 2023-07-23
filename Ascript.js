class imageEntity {
    constructor(picSrc, xpos, ypos){
        this.PicSrc = picSrc;
        this.Xpos = xpos;
        this.Ypos = ypos;
        this.ImageProperty = new Image();
        this.ImageProperty.src = picSrc;
        this.dragging = false;
    }

    draw(ctx) {
        ctx.drawImage(this.ImageProperty, this.Xpos, this.Ypos, 100, 100);
    }

    isCursorInside(x, y) {
        return x >= this.Xpos && x <= this.Xpos + 100 && y >= this.Ypos && y <= this.Ypos + 100;
    }

    updatePosition(x, y) {
        this.Xpos = x - 50;
        this.Ypos = y - 50;
    }
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var bgImage = new Image();
var activePlayer;

var classes = [
    "DemonHunterIcon.png", "DKIcon.png", "DragonIcon.png", "DruidIcon.png",
    "HunterIcon.png", "MageIcon.png", "MonkIcon.png", "PalaIcon.png",
    "PriestIcon.png", "RogueIcon.png", "ShamanIcon.png", "WarlockIcon.png",
    "WarriorIcon.png"
];

var blueTeam = [];
var redTeam = [];

document.querySelectorAll('.playerSelect').forEach(function(select, i) {
    classes.forEach(function(className) {
        var option = document.createElement('option');
        option.value = className;
        option.text = className.split('Icon')[0];
        select.add(option);
    });

    select.addEventListener('change', function() {
        var player = new imageEntity(this.value, 50 + 100 * (i % 5), i < 5 ? 50 : 300);
        if(i < 5){
            blueTeam[i] = player;
        } else {
            redTeam[i-5] = player;
        }
    });
});

document.getElementById("bgSelect").addEventListener('change', function(){
    bgImage.src = this.value;
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    blueTeam.forEach(function(player) {
        player && player.draw(ctx);
    });

    redTeam.forEach(function(player) {
        player && player.draw(ctx);
    });

    requestAnimationFrame(draw);
}

canvas.onmousedown = function(e){
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;
    
    blueTeam.concat(redTeam).forEach(function(player) {
        if (player && player.isCursorInside(x, y)) {
            player.dragging = true;
            activePlayer = player;
        }
    });
}

canvas.onmouseup = function(e){
    if(activePlayer){
        activePlayer.dragging = false;
        activePlayer = null;
    }
}

canvas.onmousemove = function(e){
    if(activePlayer && activePlayer.dragging){
        const x = e.pageX - canvas.offsetLeft;
        const y = e.pageY - canvas.offsetTop;
        activePlayer.updatePosition(x, y);
    }
}

bgImage.src = document.getElementById("bgSelect").value;
draw();