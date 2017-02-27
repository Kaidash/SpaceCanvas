/**
 * Created by Kaidash on 2/27/2017.
 */


let pathImages = 'img/';
let asteroidsArray = ['asteroid','asteroid_1','asteroid_2','asteroid_3','asteroid_4'];

function createObjects(path,array){
    let arrayImages = [];

    array.map((item,index)=>{
        let arrayItem= new Image();
    arrayItem.src=path+''+item+'.png';
    arrayImages.push(arrayItem)
});

    return arrayImages
};

const canvas =  document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    particles = [],
    patriclesNum = 8,
    w = window.innerWidth,
    h =window.innerHeight,
    arrayImages = createObjects(pathImages,asteroidsArray);


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.left = (window.innerWidth - 500)/2+'px';

if(window.innerHeight>500)
    canvas.style.top = (window.innerHeight - 500)/2+'px';

function Factory(){

    this.randomImage = Math.floor(Math.random() * arrayImages.length );
    this.x =  Math.round( Math.random() * w);
    this.y =  Math.round( Math.random() * h);
    this.heightImg =  Math.round( Math.random() * 70) + 1;
    this.img = arrayImages[this.randomImage];
    this.vx = Math.round( Math.random() * 2) - 1.5;
    this.vy = Math.round( Math.random() * 2) - 1.5;
    this.RotateRandom = Math.random() * (2 - 0.8) + 0.8 ;
    this.rotate = 0;
    // this.vRotate=Math.round( Math.random() *2) - 1.95;

}



function draw(){

    ///Time change

    // ctx.drawImage(image,0, 0, 0, 0);

    //Cleat move
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.globalCompositeOperation = 'lighter';
    for(let i = 0;i < patriclesNum; i++){
        let temp = particles[i];
        let factor = 1;

        for(let j = 0; j<patriclesNum; j++){

            let temp2 = particles[j];
            // ctx.linewidth = 0.5;

            if(  findDistance(temp, temp2)<50){
                // ctx.strokeStyle = temp.rgba;

                ctx.beginPath();
                ctx.moveTo(temp.x, temp.y);
                //Lines node
                // ctx.lineTo(temp2.x, temp2.y);
                ctx.stroke();
                factor++;
            }
        }


        // ctx.fillStyle = temp.rgba;

        ctx.beginPath();
        // ctx.rect(temp.x, temp.y, temp.heightImg,temp.widthImg);
        ctx.save();

        ctx.translate(temp.x,temp.y);

        ctx.rotate(temp.rotate*Math.PI/180);
        ctx.drawImage(temp.img,-(temp.heightImg/2), -(temp.heightImg/2),temp.heightImg,temp.heightImg);
        ctx.restore();
        ctx.fill();
        ctx.closePath();


        temp.x += temp.vx;
        temp.y += temp.vy;
        temp.rotate+= temp.RotateRandom;

        if(temp.x > w)temp.x = 0;
        if(temp.x < 0)temp.x = w;
        if(temp.y > h)temp.y = 0;
        if(temp.y < 0)temp.y = h;
    }
}

function findDistance(p1,p2){
    return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) );
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

(function init(){
    for(let i = 0; i < patriclesNum; i++){
        particles.push(new Factory);
    }
})();

(function loop(){
    draw();
    requestAnimFrame(loop);
})();