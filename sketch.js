var screen = "loading";
var particles = [];
var images = [];
var currentIndex = 0;
var imageFiles = [
  "IMG_2858.jpeg",
  "IMG_2859.jpeg",
  "IMG_2861.jpg",
  "IMG_2868.jpg"
];

var orbitAngle = 0;
var tableauDiv = null;

function preload() {
  for (var i = 0; i < imageFiles.length; i++) {
    images.push(loadImage(imageFiles[i]));
  }
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);

  canvas.position(0, 0);
  canvas.style("position", "fixed");
  canvas.style("z-index", "0");
  canvas.style("pointer-events", "auto");

  textAlign(CENTER, CENTER);

  for (var i = 0; i < 80; i++) {
    particles.push(new Particle());
  }

  createTableauOverlay();

  screen = "start";
}

function createTableauOverlay() {

  tableauDiv = createDiv("");

  tableauDiv.id("tableau-overlay");

  tableauDiv.style("position", "fixed");
  tableauDiv.style("top", "0");
  tableauDiv.style("left", "0");
  tableauDiv.style("width", "100%");
  tableauDiv.style("height", "100%");
  tableauDiv.style("background", "#0f0f19");
  tableauDiv.style("overflow-y", "auto");
  tableauDiv.style("z-index", "10");
  tableauDiv.style("display", "none");
  tableauDiv.style("flex-direction", "column");
  tableauDiv.style("align-items", "center");
  tableauDiv.style("padding", "20px");
  tableauDiv.style("box-sizing", "border-box");
  tableauDiv.style("pointer-events", "auto");

  tableauDiv.html('\
    <div style="width:100%;max-width:1100px;margin:0 auto;">\
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;">\
        <button onclick="window.goBackFromTableau()" style="background:rgba(0,0,0,0.6);color:#c8c8dc;border:none;padding:8px 18px;border-radius:8px;font-size:14px;cursor:pointer;font-family:monospace;margin-right:12px;">← BACK</button>\
        <h2 style="color:#ffc832;font-family:monospace;margin:0;">📊 Tableau Visualizations</h2>\
        <div style="width:80px;"></div>\
      </div>\
      <p style="color:#c8c8dc;font-family:monospace;text-align:center;margin-bottom:24px;font-size:14px;">Scooter data visualizations — try interacting directly below.</p>\
      \
      <div style="margin-bottom:40px;">\
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:12px;">\
          <h3 style="color:#ffc832;font-family:monospace;margin:0;">Radial Dashboard</h3>\
          <a href="https://public.tableau.com/views/Radial_17754458389600/Dashboard1?:showVizHome=no" target="_blank" rel="noopener noreferrer" style="background:#ffc832;color:#111;text-decoration:none;font-family:monospace;font-size:13px;font-weight:bold;padding:8px 14px;border-radius:8px;display:inline-block;margin-left:12px;">Open frame in new tab ↗</a>\
        </div>\
        <iframe src="https://public.tableau.com/views/Radial_17754458389600/Dashboard1?:embed=y&:showVizHome=no&:display_count=yes&:toolbar=yes" width="100%" height="700px" style="border:2px solid #ffc832;border-radius:8px;background:white;" allowfullscreen></iframe>\
      </div>\
      \
      <div style="margin-bottom:40px;">\
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:12px;">\
          <h3 style="color:#ffc832;font-family:monospace;margin:0;">Parked Scooter Locations</h3>\
          <a href="https://public.tableau.com/views/Ex4_3_Scooter_Data_Draft2/ParkedScooterLocations?:showVizHome=no" target="_blank" rel="noopener noreferrer" style="background:#ffc832;color:#111;text-decoration:none;font-family:monospace;font-size:13px;font-weight:bold;padding:8px 14px;border-radius:8px;display:inline-block;margin-left:12px;">Open frame in new tab ↗</a>\
        </div>\
        <iframe src="https://public.tableau.com/views/Ex4_3_Scooter_Data_Draft2/ParkedScooterLocations?:embed=y&:showVizHome=no&:display_count=yes&:toolbar=yes" width="100%" height="700px" style="border:2px solid #ffc832;border-radius:8px;background:white;" allowfullscreen></iframe>\
      </div>\
      \
      <div style="margin-bottom:40px;">\
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:12px;">\
          <h3 style="color:#ffc832;font-family:monospace;margin:0;">Rental Scooter Obstruction by Building</h3>\
        </div>\
        <img src="Rental Scooter Obstruction Building.jpeg" style="width:100%;border:2px solid #ffc832;border-radius:8px;background:white;display:block;">\
      </div>\
      \
    </div>\
  ');
}

window.goBackFromTableau = function () {

  hideTableauOverlay();

  screen = "menu";
};

function showTableauOverlay() {

  tableauDiv.style("display", "flex");

  var canvases = document.getElementsByTagName("canvas");

  if (canvases.length > 0) {
    canvases[0].style.pointerEvents = "none";
  }
}

function hideTableauOverlay() {

  tableauDiv.style("display", "none");

  var canvases = document.getElementsByTagName("canvas");

  if (canvases.length > 0) {
    canvases[0].style.pointerEvents = "auto";
  }
}

function draw() {

  background(15, 15, 25);

  if (screen === "loading") {

    fill(255, 200, 50);

    textSize(24);

    textStyle(BOLD);

    text("Loading images...", width / 2, height / 2);

    return;
  }

  if (screen === "start") {

    showStartScreen();

  } else if (screen === "menu") {

    showMenuScreen();

  } else if (screen === "grid") {

    showGrid();

  } else if (screen === "gallery") {

    showGallery();
  }
}

function showStartScreen() {

  for (var i = 0; i < particles.length; i++) {

    particles[i].update();

    particles[i].draw();
  }

  noStroke();

  var glowSize = 300 + sin(frameCount * 0.03) * 20;

  for (var j = 5; j > 0; j--) {

    fill(255, 180, 0, 8 * j);

    ellipse(width / 2, height / 2 - 40, glowSize * j * 0.4, glowSize * j * 0.2);
  }

  var cx = width / 2;
  var cy = height / 2 - 40;

  var rx = glowSize * 0.38;
  var ry = glowSize * 0.19;

  orbitAngle += 0.02;

  var sx = cx + rx * cos(orbitAngle);
  var sy = cy + ry * sin(orbitAngle);

  var tx = -rx * sin(orbitAngle);
  var ty = ry * cos(orbitAngle);

  var angle = atan2(ty, tx);

  push();

  translate(sx, sy);

  rotate(angle);

  if (cos(orbitAngle) < 0) {
    scale(-1, 1);
  }

  textSize(28);

  textAlign(CENTER, CENTER);

  textStyle(NORMAL);

  noStroke();

  text("🛴", 0, 0);

  pop();

  textSize(32);

  textStyle(BOLD);

  fill(255, 200, 50);

  textAlign(CENTER, CENTER);

  text("Picture Visualization", width / 2, height / 2 - 40);

  textSize(18);

  textStyle(NORMAL);

  fill(200, 200, 220);

  text('of some of the scooters we found "badly" parked on campus', width / 2, height / 2 + 20);

  stroke(255, 180, 0, 150);

  strokeWeight(1);

  var lineW = 300;

  line(width / 2 - lineW / 2, height / 2 + 55, width / 2 + lineW / 2, height / 2 + 55);

  noStroke();

  var pulseAlpha = map(sin(frameCount * 0.05), -1, 1, 80, 255);

  fill(255, 255, 255, pulseAlpha);

  textSize(14);

  text("CLICK ANYWHERE TO BEGIN", width / 2, height / 2 + 90);
}

function showMenuScreen() {

  for (var i = 0; i < particles.length; i++) {

    particles[i].update();

    particles[i].draw();
  }

  noStroke();

  fill(255, 200, 50);

  textSize(28);

  textStyle(BOLD);

  textAlign(CENTER, CENTER);

  text("What would you like to explore?", width / 2, height / 2 - 130);

  var btn1 = getMenuBtn1();
  var btn2 = getMenuBtn2();

  drawMenuButton(
    btn1,
    "📸",
    "View Photos",
    "Browse our scooter pictures",
    mouseX > btn1.x && mouseX < btn1.x + btn1.w && mouseY > btn1.y && mouseY < btn1.y + btn1.h
  );

  drawMenuButton(
    btn2,
    "📊",
    "View Data",
    "Explore Tableau visualizations",
    mouseX > btn2.x && mouseX < btn2.x + btn2.w && mouseY > btn2.y && mouseY < btn2.y + btn2.h
  );
}

function drawMenuButton(btn, emoji, label, sublabel, hovered) {

  noStroke();

  fill(0, 0, 0, 120);

  rect(btn.x + 6, btn.y + 6, btn.w, btn.h, 16);

  if (hovered) {

    fill(255, 200, 50, 30);

    rect(btn.x, btn.y, btn.w, btn.h, 16);

    stroke(255, 200, 50);

    strokeWeight(2.5);

  } else {

    fill(30, 30, 50, 180);

    rect(btn.x, btn.y, btn.w, btn.h, 16);

    stroke(100, 100, 140);

    strokeWeight(1.5);
  }

  noFill();

  rect(btn.x, btn.y, btn.w, btn.h, 16);

  noStroke();

  textAlign(CENTER, CENTER);

  textSize(48);

  text(emoji, btn.x + btn.w / 2, btn.y + btn.h / 2 - 28);

  textSize(20);

  textStyle(BOLD);

  fill(255, 200, 50);

  text(label, btn.x + btn.w / 2, btn.y + btn.h / 2 + 22);

  textSize(13);

  textStyle(NORMAL);

  fill(180, 180, 210);

  text(sublabel, btn.x + btn.w / 2, btn.y + btn.h / 2 + 48);
}

function getMenuBtn1() {

  var btnW = Math.min(240, width * 0.35);

  var btnH = 160;

  var gap = 40;

  var totalW = btnW * 2 + gap;

  var startX = (width - totalW) / 2;

  return {
    x: startX,
    y: height / 2 - btnH / 2,
    w: btnW,
    h: btnH
  };
}

function getMenuBtn2() {

  var btnW = Math.min(240, width * 0.35);

  var btnH = 160;

  var gap = 40;

  var totalW = btnW * 2 + gap;

  var startX = (width - totalW) / 2;

  return {
    x: startX + btnW + gap,
    y: height / 2 - btnH / 2,
    w: btnW,
    h: btnH
  };
}

function showGrid() {

  background(15, 15, 25);

  for (var i = 0; i < images.length; i++) {

    var img = images[i];

    var x = 100 + (i % 2) * 500;
    var y = 120 + Math.floor(i / 2) * 300;

    image(img, x, y, 400, 250);
  }
}

function showGallery() {

  background(15, 15, 25);

  var img = images[currentIndex];

  imageMode(CENTER);

  image(img, width / 2, height / 2, width * 0.8, height * 0.8);

  imageMode(CORNER);
}

function mousePressed() {

  if (screen === "start") {

    screen = "menu";

  } else if (screen === "menu") {

    var btn1 = getMenuBtn1();
    var btn2 = getMenuBtn2();

    if (
      mouseX > btn1.x &&
      mouseX < btn1.x + btn1.w &&
      mouseY > btn1.y &&
      mouseY < btn1.y + btn1.h
    ) {

      screen = "grid";

    } else if (
      mouseX > btn2.x &&
      mouseX < btn2.x + btn2.w &&
      mouseY > btn2.y &&
      mouseY < btn2.y + btn2.h
    ) {

      screen = "tableau";

      showTableauOverlay();
    }

  } else if (screen === "grid") {

    for (var i = 0; i < images.length; i++) {

      var x = 100 + (i % 2) * 500;
      var y = 120 + Math.floor(i / 2) * 300;

      if (
        mouseX > x &&
        mouseX < x + 400 &&
        mouseY > y &&
        mouseY < y + 250
      ) {

        currentIndex = i;

        screen = "gallery";
      }
    }

  } else if (screen === "gallery") {

    screen = "grid";
  }
}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
}

function Particle() {

  this.reset = function () {

    this.x = random(width);

    this.y = random(height);

    this.size = random(1, 3);

    this.speedY = random(-0.8, -0.3);

    this.speedX = random(-0.2, 0.2);

    this.pulseAlpha = random(50, 180);

    this.col = random() > 0.5
      ? color(255, 180, 0, this.pulseAlpha)
      : color(180, 180, 255, this.pulseAlpha);
  };

  this.update = function () {

    this.y += this.speedY;

    this.x += this.speedX;

    if (this.y < 0 || this.x < 0 || this.x > width) {

      this.reset();

      this.y = height;
    }
  };

  this.draw = function () {

    noStroke();

    fill(this.col);

    ellipse(this.x, this.y, this.size);
  };

  this.reset();
}
