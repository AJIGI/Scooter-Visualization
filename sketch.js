let screen = "loading";
let particles = [];
let images = [];
let currentIndex = 0;
let imageFiles = [
  "IMG_2858.jpeg",
  "IMG_2859.jpeg",
  "IMG_2861.jpg",
  "IMG_2868.jpg"
];
let orbitAngle = 0;
let tableauDiv = null;

function loadImageAsync(path) {
  return new Promise((resolve, reject) => {
    loadImage(
      path,
      img => resolve(img),
      err => reject(err)
    );
  });
}

async function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("position", "fixed");
  canvas.style("z-index", "0");
  canvas.style("pointer-events", "auto");

  textAlign(CENTER, CENTER);

  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }

  try {
    images = await Promise.all(imageFiles.map(file => loadImageAsync(file)));
    console.log("Loaded images:", imageFiles);
  } catch (err) {
    console.error("One or more images failed to load:", err);
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

  tableauDiv.html(`
    <div style="width:100%;max-width:1100px;margin:0 auto;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;gap:12px;flex-wrap:wrap;">
        <button onclick="goBackFromTableau()" style="
          background:rgba(0,0,0,0.6);
          color:#c8c8dc;
          border:none;
          padding:8px 18px;
          border-radius:8px;
          font-size:14px;
          cursor:pointer;
          font-family:monospace;
        ">← BACK</button>

        <h2 style="color:#ffc832;font-family:monospace;margin:0;font-size:22px;">📊 Tableau Visualizations</h2>

        <div style="width:80px;"></div>
      </div>

      <p style="color:#c8c8dc;font-family:monospace;text-align:center;margin-bottom:24px;font-size:14px;">
        Scooter data visualizations — try interacting directly below. If embedding blocks interaction, use the open-in-new-tab buttons.
      </p>

      <div style="margin-bottom:40px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px;">
          <h3 style="color:#ffc832;font-family:monospace;margin:0;">Radial Chart</h3>
          <a
            href="https://public.tableau.com/views/Radial_17754458389600/Radial?:showVizHome=no"
            target="_blank"
            rel="noopener noreferrer"
            style="
              background:#ffc832;
              color:#111;
              text-decoration:none;
              font-family:monospace;
              font-size:13px;
              font-weight:bold;
              padding:8px 14px;
              border-radius:8px;
              display:inline-block;
            "
          >Open frame in new tab ↗</a>
        </div>

        <iframe
          src="https://public.tableau.com/views/Radial_17754458389600/Radial?:embed=y&:showVizHome=no&:display_count=yes&:toolbar=yes"
          width="100%"
          height="600px"
          style="border:2px solid #ffc832;border-radius:8px;background:white;pointer-events:auto;"
          allowfullscreen>
        </iframe>
      </div>

      <div style="margin-bottom:40px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px;">
          <h3 style="color:#ffc832;font-family:monospace;margin:0;">Scooter Data</h3>
          <a
            href="https://public.tableau.com/views/Ex4_3_Scooter_Data_Draft/Sheet1?:showVizHome=no"
            target="_blank"
            rel="noopener noreferrer"
            style="
              background:#ffc832;
              color:#111;
              text-decoration:none;
              font-family:monospace;
              font-size:13px;
              font-weight:bold;
              padding:8px 14px;
              border-radius:8px;
              display:inline-block;
            "
          >Open frame in new tab ↗</a>
        </div>

        <iframe
          src="https://public.tableau.com/views/Ex4_3_Scooter_Data_Draft/Sheet1?:embed=y&:showVizHome=no&:display_count=yes&:toolbar=yes"
          width="100%"
          height="600px"
          style="border:2px solid #ffc832;border-radius:8px;background:white;pointer-events:auto;"
          allowfullscreen>
        </iframe>
      </div>

      <div style="margin-bottom:40px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px;">
          <h3 style="color:#ffc832;font-family:monospace;margin:0;">Building Scooter Parking Comparison</h3>
          <a
            href="https://public.tableau.com/views/E4_3datavisualization/Sheet1?:showVizHome=no"
            target="_blank"
            rel="noopener noreferrer"
            style="
              background:#ffc832;
              color:#111;
              text-decoration:none;
              font-family:monospace;
              font-size:13px;
              font-weight:bold;
              padding:8px 14px;
              border-radius:8px;
              display:inline-block;
            "
          >Open frame in new tab ↗</a>
        </div>

        <iframe
          src="https://public.tableau.com/views/E4_3datavisualization/Sheet1?:embed=y&:showVizHome=no&:display_count=yes&:toolbar=yes"
          width="100%"
          height="600px"
          style="border:2px solid #ffc832;border-radius:8px;background:white;pointer-events:auto;"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  `);
}

function showTableauOverlay() {
  tableauDiv.style("display", "flex");

  let canvases = document.getElementsByTagName("canvas");
  if (canvases.length > 0) {
    canvases[0].style.pointerEvents = "none";
  }
}

function hideTableauOverlay() {
  tableauDiv.style("display", "none");

  let canvases = document.getElementsByTagName("canvas");
  if (canvases.length > 0) {
    canvases[0].style.pointerEvents = "auto";
  }
}

function goBackFromTableau() {
  hideTableauOverlay();
  screen = "menu";
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
  for (let p of particles) {
    p.update();
    p.draw();
  }

  noStroke();
  let glowSize = 300 + sin(frameCount * 0.03) * 20;
  for (let i = 5; i > 0; i--) {
    fill(255, 180, 0, 8 * i);
    ellipse(width / 2, height / 2 - 40, glowSize * i * 0.4, glowSize * i * 0.2);
  }

  let cx = width / 2;
  let cy = height / 2 - 40;
  let rx = glowSize * 0.38;
  let ry = glowSize * 0.19;
  orbitAngle += 0.02;

  let sx = cx + rx * cos(orbitAngle);
  let sy = cy + ry * sin(orbitAngle);
  let tx = -rx * sin(orbitAngle);
  let ty = ry * cos(orbitAngle);
  let angle = atan2(ty, tx);

  push();
  translate(sx, sy);
  rotate(angle);
  if (cos(orbitAngle) < 0) scale(-1, 1);
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
  let lineW = 300;
  line(width / 2 - lineW / 2, height / 2 + 55, width / 2 + lineW / 2, height / 2 + 55);
  noStroke();

  let pulseAlpha = map(sin(frameCount * 0.05), -1, 1, 80, 255);
  fill(255, 255, 255, pulseAlpha);
  textSize(14);
  text("CLICK ANYWHERE TO BEGIN", width / 2, height / 2 + 90);
}

function showMenuScreen() {
  for (let p of particles) {
    p.update();
    p.draw();
  }

  noStroke();
  fill(255, 200, 50);
  textSize(28);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("What would you like to explore?", width / 2, height / 2 - 130);

  let btn1 = getMenuBtn1();
  let btn2 = getMenuBtn2();

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
  let btnW = min(240, width * 0.35);
  let btnH = 160;
  let gap = 40;
  let totalW = btnW * 2 + gap;
  let startX = (width - totalW) / 2;
  return { x: startX, y: height / 2 - btnH / 2, w: btnW, h: btnH };
}

function getMenuBtn2() {
  let btnW = min(240, width * 0.35);
  let btnH = 160;
  let gap = 40;
  let totalW = btnW * 2 + gap;
  let startX = (width - totalW) / 2;
  return { x: startX + btnW + gap, y: height / 2 - btnH / 2, w: btnW, h: btnH };
}

function drawScooters() {
  let speed = 1.5;
  let count = 6;
  let spacing = width / count;

  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  textSize(28);

  for (let i = 0; i < count; i++) {
    let x = ((frameCount * -speed + i * spacing) % (width + 60) + width + 60) % (width + 60);
    text("🛴", x, 78);
  }

  for (let i = 0; i < count; i++) {
    let x = ((frameCount * speed + i * spacing) % (width + 60) + width + 60) % (width + 60);
    push();
    translate(x, height - 30);
    scale(-1, 1);
    text("🛴", 0, 0);
    pop();
  }
}

function getGridRects() {
  let rects = [];
  let cols = 2;
  let rows = 2;
  let padX = 60;
  let padY = 110;
  let gapX = 30;
  let gapY = 30;
  let cellW = (width - padX * 2 - gapX) / cols;
  let cellH = (height - padY * 2 - gapY) / rows;

  for (let i = 0; i < 4; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let x = padX + col * (cellW + gapX);
    let y = padY + row * (cellH + gapY);
    rects.push({ x, y, w: cellW, h: cellH });
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

  let rects = getGridRects();

  for (let i = 0; i < min(images.length, 4); i++) {
    let r = rects[i];
    let img = images[i];

    let imgAspect = img.width / img.height;
    let cellAspect = r.w / r.h;
    let drawW, drawH, offX, offY;

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

    let hovered = mouseX > r.x && mouseX < r.x + r.w && mouseY > r.y && mouseY < r.y + r.h;

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
  text("← BACK", 55, 31);
}

function showGallery() {
  if (images.length === 0) return;
  if (currentIndex >= images.length) currentIndex = 0;

  let img = images[currentIndex];
  let aspectRatio = img.width / img.height;
  let maxW = width * 0.85;
  let maxH = height * 0.85;
  let drawW, drawH;

  if (maxW / aspectRatio <= maxH) {
    drawW = maxW;
    drawH = maxW / aspectRatio;
  } else {
    drawH = maxH;
    drawW = maxH * aspectRatio;
  }

  let x = (width - drawW) / 2;
  let y = (height - drawH) / 2;
  image(img, x, y, drawW, drawH);

  noStroke();
  fill(0, 0, 0, 120);
  rect(width / 2 - 50, height - 40, 100, 28, 8);
  fill(255);
  textSize(14);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  text(`${currentIndex + 1} / ${images.length}`, width / 2, height - 26);

  let nextIndex = currentIndex + 1;
  if (nextIndex < images.length) {
    let thumbW = 110;
    let thumbH = 80;
    let thumbX = width - thumbW - 20;
    let thumbY = 20;

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
    text("NEXT →", thumbX + thumbW / 2, thumbY + thumbH + 12);
  }

  noStroke();
  fill(0, 0, 0, 120);
  rect(15, 15, 80, 32, 8);
  fill(200, 200, 220);
  textSize(13);
  textAlign(CENTER, CENTER);
  text("← BACK", 55, 31);
}

function mousePressed() {
  if (screen === "start") {
    screen = "menu";
  } else if (screen === "menu") {
    let btn1 = getMenuBtn1();
    let btn2 = getMenuBtn2();

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

    let rects = getGridRects();
    for (let i = 0; i < min(rects.length, images.length); i++) {
      let r = rects[i];
      if (mouseX > r.x && mouseX < r.x + r.w && mouseY > r.y && mouseY < r.y + r.h) {
        currentIndex = i;
        screen = "gallery";
        return;
      }
    }
  } else if (screen === "gallery") {
    let nextIndex = currentIndex + 1;
    if (nextIndex < images.length) {
      let thumbW = 110;
      let thumbH = 80;
      let thumbX = width - thumbW - 20;
      let thumbY = 20;

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

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
    this.speedY = random(-0.8, -0.3);
    this.speedX = random(-0.2, 0.2);
    this.pulseAlpha = random(50, 180);
    this.col = random() > 0.5
      ? color(255, 180, 0, this.pulseAlpha)
      : color(180, 180, 255, this.pulseAlpha);
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    if (this.y < 0 || this.x < 0 || this.x > width) {
      this.reset();
      this.y = height;
    }
  }

  draw() {
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.size);
  }
}