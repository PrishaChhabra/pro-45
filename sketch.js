
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;




var engine, world,rand;
var backgroundImg,blackImg,greenImg,octopusImg,orangeImg,pinkImg,purpleImg,redImg,wormImg;
var tb,tbImg;
var themeS;
var score=0;
var bacteriaCreatedFrame=0;
var score=0;
var bacteriaGroup;
//var play=1;
//var end=0;
var gameState="wait";
var timer=30;
var button,msg='';


function preload(){
  waitImg=loadImage("WaitImg.png")
  backgroundImg=loadImage("Bg.jpg")
  clean_bg=loadImage("Clean_tooth.png")
  dirty_bg=loadImage("Decay_bg.jpg");
  blackImg=loadImage("Bacteria_img/Black.png")
  greenImg=loadImage("Bacteria_img/Green.png")
  octopusImg=loadImage("Bacteria_img/Octopus.png")
  orangeImg=loadImage("Bacteria_img/Orange.png")
  pinkImg=loadImage("Bacteria_img/Pink.png")
  purpleImg=loadImage("Bacteria_img/Purple.png")
  redImg=loadImage("Bacteria_img/Red.png")
  wormImg=loadImage("Bacteria_img/Worm.png")
  tbImg=loadImage("Toothbrush.png")
  themeS=loadSound("sounds/theme_song.mp3")
  popS=loadSound("sounds/pop.wav")
  victoryS=loadSound("sounds/victory.mp3")
  defeatS=loadSound("sounds/defeat.wav")

}

function setup(){
  engine = Engine.create();
  world = engine.world;
  createCanvas(800,700)
  

   tb=createSprite(500,400,60,80);
   tb.addImage(tbImg);
   tb.scale=0.2
   tb.visible=false
   bacteriaGroup=new Group();
   
   
  
}

function draw(){
  Engine.update(engine)
    background("white")
   
    //button.hide();
    if(gameState==="wait"){
          background(waitImg);
          var col=color("Pink")
          button=createButton("PLAY");
          button.show();
          button.position(450,430)
          button.style('background-color',col);
          
          button.mousePressed(()=>{
            console.log("error");
            gameState="play"
         
          })
    }
    else if(gameState==="play"){
              //console.log(button)
              tb.visible=true;
              button.hide();
              button.style('background-color',"green");
              image(backgroundImg,150,50,650,650);
              textSize(100)
              fill("black")
              text(score,450,430);
              tb.x=mouseX
              tb.y=mouseY
              textSize(50);
              text(timer,470,50);
              if (frameCount % 60 == 0 && timer > 0) { 
                 timer --;}
              for(var i=0;i<bacteriaGroup.length; i++ ){
                if(bacteriaGroup.get(i).isTouching(tb)){
                      score=score+1
                      bacteriaGroup.get(i).destroy();
                      popS.play();
                      
                      msg='You have killed a devil:)'
                }   
              } 
            
            
            
              var pl=themeS.isPlaying()
              if(pl!==true){
                  themeS.play();
              }
          

              spawnBacteria();
              if(timer===0){
                gameState="end"
              }
    }
    else if(gameState==="end"){
      button.hide();
      tb.visible=false
      bacteriaGroup.destroyEach();
      if(score>=50 ){
        background(clean_bg);
        textSize(30)
          fill("purple")
          text("YOUR TEETH ARE PERFECTLY CLEAN",10,200);
          victoryS.play();
        }
      else if(score<=50){
        background(dirty_bg);
        defeatS.play();
      }
    }
      
      
      
      
      
    
    drawSprites();
    textSize(20)
    text(msg,400,70)

    
}  

function spawnBacteria(){
  rand = Math.round(random(1,8));
  if(frameCount%15===0){
     bacteriaCreatedFrame=frameCount;
      var bacteria= createSprite(random(140,580), random(230,700), 10, 10);
      bacteria.velocityX=random(0.2,-0.2)
      bacteria.velocityY=random(0.5,-0.5);
      bacteria.lifetime=240

      switch(rand){
          case 1: bacteria.addImage(blackImg);
          break;
          case 2: bacteria.addImage(greenImg);
          break; 
          case 3: bacteria.addImage(octopusImg);
          break;
          case 4: bacteria.addImage(orangeImg);
          break;
          case 5: bacteria.addImage(pinkImg);
          break;
          case 6: bacteria.addImage(purpleImg);
          break;
          case 7 : bacteria.addImage(redImg);
          break;
          case 8: bacteria.addImage(wormImg);
          default: break;
      }
      bacteria.scale = random(0.15,0.2)
      bacteriaGroup.add(bacteria)
  }
  
}


 



