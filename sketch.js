//variaveis

var pista, pistaImg;

var carro_player, carro_playerImg;

var carro1Img,carro2Img;

var end,endImg;

var PLAY=1;
var END=0;
var gameState=1;

var buracoImg;

var score=0;

//carregar as imagens
function preload(){
    pistaImg = loadImage("Road.png");
    carro_playerImg =loadImage("carro_principal.png");
    carro1Img = loadImage("carro1.png");
    carro2Img = loadImage("carro2.png");
    buracoImg = loadImage("buraco.webp");
    endImg = loadImage("fimdeJogo.png");
}

function setup() {
  createCanvas(400,600);
  //pista
  pista = createSprite(200,200);
  pista.addImage(pistaImg);
  pista.velocityY = 4;

  //carro do player
  carro_player = createSprite(200,200);
  carro_player.addImage(carro_playerImg);
  carro_player.scale = 0.2;

  //1º parte do final 
  end = createSprite(200,300);
  end.visible = false;
//grupos
  buracoGroup=new Group();
  carro1Group=new Group();
  carro2Group=new Group();
}

function draw() {
//gameState e seus comandos
  if(gameState===PLAY){
    background(0);
//controle sobre o carro do player
    carro_player.x = World.mouseX;
    carro_player.y = World.mouseY;
    
    //obstaculos
    createBuraco();
    createCarro1();
    createCarro2();
  //contagem da pontuação
    score = score + Math.round(getFrameRate()/20);
  //repetição da pista
    if(pista.y > 400 ){
      pista.y = height/2;
    }
    //gameState End e 2º parte do final
    if(buracoGroup.isTouching(carro_player)) {
      gameState=END;
      
      end.addImage(endImg);
      end.visible = true;

      buracoGroup.destroyEach();
      carro1Group.destroyEach();
      carro2Group.destroyEach();
      
      buracoGroup.setVelocityYEach(0);
      carro1Group.setVelocityYEach(0);
      carro2Group.setVelocityYEach(0);
      
  }else if(carro1Group.isTouching(carro_player)) {
    gameState=END;
    end.addImage(endImg);
    end.visible = true;

    buracoGroup.destroyEach();
    carro1Group.destroyEach();
    carro2Group.destroyEach();
    
    buracoGroup.setVelocityYEach(0);
    carro1Group.setVelocityYEach(0);
    carro2Group.setVelocityYEach(0);
  
} else if(carro2Group.isTouching(carro_player)) {
  gameState=END;
  
  end.addImage(endImg);
  end.visible = true;

  buracoGroup.destroyEach();
  carro1Group.destroyEach();
  carro2Group.destroyEach();
  
  buracoGroup.setVelocityYEach(0);
  carro1Group.setVelocityYEach(0);
  carro2Group.setVelocityYEach(0);
}
    drawSprites();
    //textos da tela
    textSize(15);
    fill("darkblue");
    text("Pontuação: "+ score,10,30);
    
    textSize(15);
    fill("darkblue");
    text("Jogo Da Corrida Infinita", 220,30);
    

  }
}
//criação dos buracos
function createBuraco(){
  if (World.frameCount % 150 == 0) {
    var buraco = createSprite(Math.round(random(50, 350),40, 10, 10));
    buraco.addImage(buracoImg);
    buraco.scale=0.15;
    buraco.velocityY = 3;
    buraco.lifetime = 200;
    buracoGroup.add(buraco);
}}

//criação dos carros
function createCarro1(){
  if (World.frameCount % 250 == 0) {
    var carro1 = createSprite(Math.round(random(50, 350),40, 10, 10));
    carro1.addImage(carro1Img);
    carro1.scale=0.18;
    carro1.velocityY = 3;
    carro1.lifetime = 200;
    carro1Group.add(carro1);
}}

function createCarro2(){
  if (World.frameCount % 350 == 0) {
    var carro2 = createSprite(Math.round(random(50, 350),40, 10, 10));
    carro2.addImage(carro2Img);
    carro2.scale=0.18;
    carro2.velocityY = 3;
    carro2.lifetime = 200;
    carro2Group.add(carro2);
}}