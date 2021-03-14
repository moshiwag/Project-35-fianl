var balloon;
var balloon1Img, balloon2Img, balloon3Img;
var database;
var height;
var backgroundImage; 
function preload() {
  backgroundImage = loadImage("Images/BackgroundImage.png");
  balloon1Img = loadImage("Images/Balloon1.png");
  balloon2Img = loadImage("Images/Balloon2.png");
  balloon3Img = loadImage("Images/Balloon3.png");
  

}

function setup(){
    createCanvas(500,500);

    database = firebase.database();

    balloon = createSprite(100,300,10,10);
    //balloon = loadAnimation("Images/Balloon1.png","Images/Balloon2.png","Images/Balloon3.png");
    balloon.addImage("b1", balloon1Img);
    balloon.scale=0.7;

    var balloonPosition = database.ref("balloon/height");
    balloonPosition.on("value", readPosition, showError);

}

function draw(){
  background(backgroundImage);

  if(keyDown(LEFT_ARROW)){
      balloon.x = balloon.x -10;
  }
  else if(keyDown(RIGHT_ARROW)){
      balloon.x = balloon.x +10;
  }
  else if(keyDown(UP_ARROW)){  
      balloon.y = balloon.y -10;
      balloon.addImage("b2", balloon2Img);
      if(balloon.scale>0.1){
        balloon.scale = balloon.scale -0.1
      }
  }
  else if(keyDown(DOWN_ARROW)){
      balloon.y = balloon.y +10;
      balloon.addImage("b3", balloon3Img);
      if(balloon.scale<0.9){
        balloon.scale=balloon.scale+0.1;
      }
  }
  drawSprites();
}

function updateHeight(x,y){
  database.ref("ball/height").set({
  
     'x': height.x + x,
     'y': height.y + y,
  })
}

function readPosition(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in reading Info from database");
}
