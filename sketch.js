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
        <button onclick="window.goBackFromTableau()" style="background:rgba(0,0,0,0.6);color:#c8c8dc;border:none;padding:8px 18px;border-radius:8px;font-size:14px;cursor:pointer;font-family:monospace;margin-right:12px;">\u2190 BACK</button>\
        <h2 style="color:#ffc832;font-family:monospace;margin:0;">\uD83D\uDCCA Tableau Visualizations</h2>\
        <div style="width:80px;"></div>\
      </div>\
      <p style="color:#c8c8dc;font-family:monospace;text-align:center;margin-bottom:24px;font-size:14px;">Scooter data visualizations \u2014 try interacting directly below. If embedding blocks interaction, use the open-in-new-tab buttons.</p>\
      <div style="margin-bottom:40px;">\
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:12px;">\
          <h3 style="color:#ffc832;font-family:monospace;margin:0;">Radial Dashboard</h3>\
          <a href="https://public.tableau.com/views/Radial_17754458389600/Dashboard1?:showVizHome=no" target="_blank" rel="noopener noreferrer" style="background:#ffc832;color:#111;text-decoration:none;font-family:monospace;font-size:13px;font-weight:bold;padding:8px 14px;border-radius:8px;display:inline-block;margin-left:12px;">Open frame in new tab \u2197</a>\
        </div>\
        <iframe src="https://public.tableau.com/views/Radial_17754458389600/Dashboard1?:embed=y&:showVizHome=no&:display_count=yes&:toolbar=yes" width="100%" height="700px" style="border:2px solid #ffc832;border-radius:8px;background:white;pointer-events:auto;" allowfullscreen></iframe>\
      </div>\
      <div style="margin-bottom:40px;">\
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:12px;">\
          <h3 style="color:#ffc832;font-family:monospace;margin:0;">Parked Scooter Locations</h3>\
          <a href="https://public.tableau.com/views/Ex4_3_Scooter_Data_Draft2/ParkedScooterLocations?:showVizHome=no" target="_blank" rel="noopener noreferrer" style="background:#ffc832;color:#111;text-decoration:none;font-family:monospace;font-size:13px;font-weight:bold;padding:8px 14px;border-radius:8px;display:inline-block;margin-left:12px;">Open frame in new tab \u2197</a>\
        </div>\
        <iframe src="https://public.tableau.com/views/Ex4_3_Scooter_Data_Draft2/ParkedScooterLocations?:embed=y&:showVizHome=no&:display_count=yes&:toolbar=yes" width="100%" height="700px" style="border:2px solid #ffc832;border-radius:8px;background:white;pointer-events:auto;" allowfullscreen></iframe>\
      </div>\
      <div style="margin-bottom:40px;">\
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:12px;">\
          <h3 style="color:#ffc832;font-family:monospace;margin:0;">Building Scooter Parking Comparison</h3>\
          <a href="https://public.tableau.com/views/E4_3datavisualization/Sheet1?:showVizHome=no" target="_blank" rel="noopener noreferrer" style="background:#ffc832;color:#111;text-decoration:none;font-family:monospace;font-size:13px;font-weight:bold;padding:8px 14px;border-radius:8px;display:inline-block;margin-left:12px;">Open frame in new tab \u2197</a>\
        </div>\
        <iframe src="https://public.tableau.com/views/E4_3datavisualization/Sheet1?:embed=y&:showVizHome=no&:display_count=yes&:toolbar=yes" width="100%" height="600px" style="border:2px solid #ffc832;border-radius:8px;background:white;pointer-events:auto;" allowfullscreen></iframe>\
      </div>\
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
  if (cos(orbitAngle) < 0) scale(-1, 1);
  textSize(28);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  noStroke();
  text("\uD83D\uDED4", 0, 0);
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
    "\uD83D\uDCF8",
    "View Photos",
    "Browse our scooter pictures",
    mouseX > btn1.x && mouseX < btn1.x + btn1.w && mouseY > btn1.y && mouseY < btn1.y + btn1.h
  );

  drawMenuButton(
    btn2,
    "\uD83D\uDCCA",
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
  return { x: startX, y: height / 2 - btnH / 2, w: btnW, h: btnH };
}

function getMenuBtn2() {
  var btnW = Math.min(240, width * 0.35);
  var btnH = 160;
  var gap = 40;
  var totalW = btnW * 2 + gap;
  var startX = (width - totalW) / 2;
  return { x: startX + btnW + gap, y: height / 2 - btnH / 2, w: btnW, h: btnH };
}

function drawScooters() {
  var speed = 1.5;
  var count = 6;
  var spacing = width / count;

  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  textSize(28);

  for (var i = 0; i < count; i++) {
    var x = ((frameCount * -speed + i * spacing) % (width + 60) + width + 60) % (width + 60);
    text("\uD83D\uDED4", x, 78);
  }

  for (var j = 0; j < count; j++) {
    var xj = ((frameCount * speed + j * spacing) % (width + 60) + width + 60) % (width + 60);
    push();
    translate(xj, height - 30);
    scale(-1, 1);
    text("\uD83D\uDED4", 0, 0);
    pop();
  }
}

function getGridRects() {
  var rects = [];
  var cols = 2;
  var padX = 60;
  var padY = 110;
  var gapX = 30;
  var gapY = 30;
  var cellW = (width - padX * 2 - gapX) / cols;
  var cellH = (height - padY * 2 - gapY) / 2;

  for (var i = 0; i < 4; i++) {
    var col = i % cols;
    var row = Math.floor(i / cols);
    var x = padX + col * (cellW + gapX);
    var y = padY + row * (cellH + gapY);
    rects.push({ x: x, y: y, w: cellW, h: cellH });
  }

  return rects;
}

function showGrid() {
  if (images.length === 0) return;

  drawScooters();

  noStroke();
  fill(255, 200, 50);
  textSize(22);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Select a Photo", width / 2, 50);

  var rects = getGridRects();

  for (var i = 0; i < Math.min(images.length, 4); i++) {
    var r = rects[i];
    var img = images[i];

    var imgAspect = img.width / img.height;
    var cellAspect = r.w / r.h;
    var drawW, drawH, offX, offY;

    if (imgAspect > cellAspect) {
      drawW = r.w;
      drawH = r.w / imgAspect;
      offX = 0;
      offY = (r.h - drawH) / 2;
    } else {
      drawH = r.h;
      drawW = r.h * imgAspect;
      offX = (r.w - drawW) / 2;
      offY = 0;
    }

    fill(0, 0, 0, 100);
    rect(r.x + 6, r.y + 6, r.w, r.h, 10);

    var hovered = mouseX > r.x && mouseX < r.x + r.w && mouseY > r.y && mouseY < r.y + r.h;

    image(img, r.x + offX, r.y + offY, drawW, drawH);

    if (hovered) {
      fill(255, 200, 50, 40);
      noStroke();
      rect(r.x, r.y, r.w, r.h, 8);
      stroke(255, 200, 50);
      strokeWeight(3);
    } else {
      stroke(100, 100, 120);
      strokeWeight(1.5);
    }

    noFill();
    rect(r.x, r.y, r.w, r.h, 8);
    noStroke();

    fill(0, 0, 0, 160);
    rect(r.x + 10, r.y + 10, 28, 22, 6);
    fill(255, 200, 50);
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(i + 1, r.x + 24, r.y + 21);
  }

  noStroke();
  fill(0, 0, 0, 120);
  rect(15, 15, 80, 32, 8);
  fill(200, 200, 220);
  textSize(13);
  textAlign(CENTER, CENTER);
  text("\u2190 BACK", 55, 31);
}

function showGallery() {
  if (images.length === 0) return;
  if (currentIndex >= images.length) currentIndex = 0;

  var img = images[currentIndex];
  var aspectRatio = img.width / img.height;
  var maxW = width * 0.85;
  var maxH = height * 0.85;
  var drawW, drawH;

  if (maxW / aspectRatio <= maxH) {
    drawW = maxW;
    drawH = maxW / aspectRatio;
  } else {
    drawH = maxH;
    drawW = maxH * aspectRatio;
  }

  var x = (width - drawW) / 2;
  var y = (height - drawH) / 2;
  image(img, x, y, drawW, drawH);

  noStroke();
  fill(0, 0, 0, 120);
  rect(width / 2 - 50, height - 40, 100, 28, 8);
  fill(255);
  textSize(14);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  text((currentIndex + 1) + " / " + images.length, width / 2, height - 26);

  var nextIndex = currentIndex + 1;
  if (nextIndex < images.length) {
    var thumbW = 110;
    var thumbH = 80;
    var thumbX = width - thumbW - 20;
    var thumbY = 20;

    noStroke();
    fill(0, 0, 0, 100);
    rect(thumbX + 4, thumbY + 4, thumbW, thumbH, 6);

    image(images[nextIndex], thumbX, thumbY, thumbW, thumbH);

    stroke(255, 200, 50);
    strokeWeight(2);
    noFill();
    rect(thumbX, thumbY, thumbW, thumbH, 4);
    noStroke();

    fill(255, 200, 50);
    textSize(11);
    textAlign(CENTER, CENTER);
    text("NEXT \u2192", thumbX + thumbW / 2, thumbY + thumbH + 12);
  }

  noStroke();
  fill(0, 0, 0, 120);
  rect(15, 15, 80, 32, 8);
  fill(200, 200, 220);
  textSize(13);
  textAlign(CENTER, CENTER);
  text("\u2190 BACK", 55, 31);
}

function mousePressed() {
  if (screen === "start") {
    screen = "menu";
  } else if (screen === "menu") {
    var btn1 = getMenuBtn1();
    var btn2 = getMenuBtn2();

    if (mouseX > btn1.x && mouseX < btn1.x + btn1.w && mouseY > btn1.y && mouseY < btn1.y + btn1.h) {
      screen = "grid";
    } else if (mouseX > btn2.x && mouseX < btn2.x + btn2.w && mouseY > btn2.y && mouseY < btn2.y + btn2.h) {
      screen = "tableau";
      showTableauOverlay();
    }
  } else if (screen === "grid") {
    if (mouseX > 15 && mouseX < 95 && mouseY > 15 && mouseY < 47) {
      screen = "menu";
      return;
    }

    var rects = getGridRects();
    for (var i = 0; i < Math.min(rects.length, images.length); i++) {
      var r = rects[i];
      if (mouseX > r.x && mouseX < r.x + r.w && mouseY > r.y && mouseY < r.y + r.h) {
        currentIndex = i;
        screen = "gallery";
        return;
      }
    }
  } else if (screen === "gallery") {
    var nextIndex = currentIndex + 1;
    if (nextIndex < images.length) {
      var thumbW = 110;
      var thumbH = 80;
      var thumbX = width - thumbW - 20;
      var thumbY = 20;

      if (mouseX > thumbX && mouseX < thumbX + thumbW && mouseY > thumbY && mouseY < thumbY + thumbH) {
        currentIndex = nextIndex;
        return;
      }
    }

    if (mouseX > 15 && mouseX < 95 && mouseY > 15 && mouseY < 47) {
      screen = "grid";
    }
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
