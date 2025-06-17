let caminhaoX, caminhaoY;
let velocidade = 3;
let obstaculos = [];
let alimentos = [];
let pontuacao = 0;
let estadoJogo = "jogando"; // "jogando" ou "fim"

function setup() {
  createCanvas(800, 400);
  caminhaoX = width / 2;
  caminhaoY = height - 50;
  
  // Cria obstáculos (carros na cidade e animais no campo)
  for (let i = 0; i < 5; i++) {
    obstaculos.push({
      x: random(width),
      y: random(height / 2, height - 30),
      vel: random(1, 3),
      tipo: "carro"
    });
  }
  
  for (let i = 0; i < 3; i++) {
    obstaculos.push({
      x: random(width),
      y: random(50, height / 2),
      vel: random(1, 2),
      tipo: "vaca"
    });
  }
  
  // Cria alimentos para coletar
  for (let i = 0; i < 10; i++) {
    alimentos.push({
      x: random(width),
      y: random(height),
      tipo: random(["milho", "trigo", "leite"])
    });
  }
}

function draw() {
  background(220);
  
  // Desenha o CAMPO (parte superior)
  desenharCampo();
  
  // Desenha a CIDADE (parte inferior)
  desenharCidade();
  
  // Atualiza e desenha obstáculos
  for (let obs of obstaculos) {
    obs.x += obs.vel;
    if (obs.x > width) obs.x = -30;
    
    if (obs.tipo == "carro") {
      fill(255, 0, 0);
      rect(obs.x, obs.y, 40, 20);
    } else if (obs.tipo == "vaca") {
      fill(255);
      ellipse(obs.x, obs.y, 30, 20);
    }
    
    // Verifica colisão com o caminhão
    if (dist(caminhaoX, caminhaoY, obs.x, obs.y) < 30) {
      estadoJogo = "fim";
    }
  }
  
  // Atualiza e desenha alimentos
  for (let i = alimentos.length - 1; i >= 0; i--) {
    let alimento = alimentos[i];
    if (alimento.tipo == "milho") fill(255, 255, 0);
    else if (alimento.tipo == "trigo") fill(210, 180, 140);
    else if (alimento.tipo == "leite") fill(255);
    
    ellipse(alimento.x, alimento.y, 20, 20);
    
    // Verifica se o caminhão coletou o alimento
    if (dist(caminhaoX, caminhaoY, alimento.x, alimento.y) < 25) {
      alimentos.splice(i, 1);
      pontuacao += 10;
      
      // Adiciona novo alimento aleatório
      alimentos.push({
        x: random(width),
        y: random(height),
        tipo: random(["milho", "trigo", "leite"])
      });
    }
  }
  
  // Desenha o caminhão
  fill(0, 100, 255);
  rect(caminhaoX - 25, caminhaoY - 15, 50, 30);
  fill(0);
  ellipse(caminhaoX - 15, caminhaoY + 15, 20, 20);
  ellipse(caminhaoX + 15, caminhaoY + 15, 20, 20);
  
  // Mostra a pontuação
  fill(0);
  textSize(20);
  text(`Pontuação: ${pontuacao}`, 20, 30);
  
  // Verifica fim de jogo
  if (estadoJogo == "fim") {
    fill(255, 0, 0, 150);
    rect(0, 0, width, height);
    fill(255);
    textSize(40);
    text("FIM DE JOGO", width / 2 - 100, height / 2);
    textSize(20);
    text(`Pontuação final: ${pontuacao}`, width / 2 - 80, height / 2 + 40);
    noLoop();
  }
}

function keyPressed() {
  if (key == "ArrowLeft") caminhaoX -= 10;
  if (key == "ArrowRight") caminhaoX += 10;
  if (key == "ArrowUp") caminhaoY -= 10;
  if (key == "ArrowDown") caminhaoY += 10;
  
  // Limita o caminhão na tela
  caminhaoX = constrain(caminhaoX, 25, width - 25);
  caminhaoY = constrain(caminhaoY, 15, height - 15);
}

function desenharCampo() {
  // Céu
  fill(135, 206, 235);
  rect(0, 0, width, height / 2);
  
  // Sol
  fill(255, 255, 0);
  ellipse(100, 80, 60, 60);
  
  // Árvores
  fill(139, 69, 19);
  rect(200, height / 2 - 50, 20, 50);
  fill(0, 100, 0);
  ellipse(210, height / 2 - 50, 60, 80);
  
  // Plantações
  fill(0, 128, 0);
  for (let x = 300; x < 500; x += 30) {
    for (let y = 50; y < height / 2; y += 30) {
      rect(x, y, 20, 20);
    }
  }
}

function desenharCidade() {
  // Asfalto
  fill(50);
  rect(0, height / 2, width, height / 2);
  
  // Prédios
  fill(100);
  rect(50, height / 2, 60, 100);
  rect(150, height / 2, 80, 150);
  rect(300, height / 2, 70, 120);
  
  // Janelas
  fill(255, 255, 0);
  for (let x = 60; x < 110; x += 15) {
    for (let y = height / 2 + 10; y < height / 2 + 90; y += 20) {
      rect(x, y, 8, 10);
    }
  }
}