let sheetID = "13hsW_bpIUsMYMc-T4p3kb42Nb03jsqWpwOkd2igsTIA";
let tabName = "Sheet1";
let opensheet_uri = `https://opensheet.elk.sh/${sheetID}/${tabName}`;

let alessiLogo;
let products = [];
let overlayImgs = {};
let sanglierFont;
let interFont;
let boxWidth = 1270 / 4;
let boxHeight = 1800 / 4;
let cols = 3;
let margin = 350;

let countryColors = {
  ITALIAN: '#971719',
  JAPANESE: '#FFFFFF',
  AMERICAN: '#E94F37',
  BRITISH: '#0041B1',
  GERMAN: '#FFB200'
};

function preload() {
  sanglierFont = loadFont('SANGLIERNONCOMMERCIAL-Regular.otf');
  interFont = loadFont('Inter-VariableFont_opsz,wght.ttf');
  alessiLogo = loadImage("alessilogo.png");

  // Preload possible sticker images
  let stickerNames = [
    "stickeraldo.png",
    "stickermichelle.png",
    "stickermario.png",
    "stickercastiglioni.png",
    "stickersapper.png",
    "stickerchip.png",
    "stickeranas.png",
    "stickergraves.png",
    "stickernendo.png",
    "stickerfuka.png"
  ];

  stickerNames.forEach(name => {
    overlayImgs[name] = loadImage(name);
  });
}

function setup() {
  loadJSON(opensheet_uri, data => {
    products = data;
    let rows = Math.ceil(products.length / cols);
    let canvasWidth = cols * (boxWidth + margin) + margin;
    let canvasHeight = rows * (boxHeight + 200) + margin;
    createCanvas(canvasWidth, canvasHeight);
    noLoop();
    draw(); // Only call draw when ready
  });
}

function draw() {
  if (products.length > 0) {
    background(0);
    drawProducts();
  }
}

function drawProducts() {
  for (let i = 0; i < products.length; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let x = margin + col * (boxWidth + margin);
    let y = margin + row * (boxHeight + 200);
    drawProductBox(x, y, i);
  }
}

function drawProductBox(x, y, index) {
  let product = products[index];

  fill('#310B0B');
  noStroke();
  rect(x, y, boxWidth, boxHeight);

  if (alessiLogo) {
    let logoWidth = 280;
    let logoHeight = 380;
    image(alessiLogo, x + boxWidth / 2 - logoWidth / 2, y - 90, logoWidth, logoHeight);
  }

  if (product.DESIGNER) {
    fill(255);
    textFont(sanglierFont);
    textSize(10);
    textAlign(CENTER);
    text("X " + product.DESIGNER.toUpperCase(), x + boxWidth / 2, y + 125);
  }

  if (product.NAME) {
    fill(255);
    textFont(sanglierFont);
    textSize(17);
    textAlign(CENTER);
    text(product.NAME.toUpperCase(), x + boxWidth / 2, y + boxHeight - 75);
  }

  if (product.LIQUIDHOLD) {
  let holdText = product.LIQUIDHOLD.trim().toUpperCase();
  fill(255);
  textFont(interFont);
  textSize(10);
  textAlign(CENTER);
  text("MAKES " + holdText, x + boxWidth / 2, y + boxHeight - 60);
}

  let origin = product.OOC.trim().toUpperCase();
  let stripColor = countryColors[origin];
  if (stripColor) {
    fill(stripColor);
    noStroke();
    let stripWidth = 27;
    let stripHeight = 330;
    let stripX = x + boxWidth - stripWidth - 1;
    let stripY = y + boxHeight / 2 - stripHeight / 2;
    rect(stripX, stripY, stripWidth, stripHeight);
  }

  let liquidHold = product.LIQUIDHOLD.trim().toLowerCase();
  let cups = 1;
  if (liquidHold.includes('/')) {
    let parts = liquidHold.split(' ')[0].split('/');
    if (parts.length === 2) {
      cups = Math.round((parseInt(parts[0]) / parseInt(parts[1])) * 4);
    }
  } else {
    let num = parseInt(liquidHold);
    if (!isNaN(num)) {
      cups = num;
    }
  }

  // SVG selection
  if (product.SVGDESIGN === "ConicoSVG") {
    drawSVGOnFirstProduct(x, y, boxWidth, svgConico, cups);
  } else if (product.SVGDESIGN === "ConicaSVG") {
    drawSVGOnFirstProduct(x, y, boxWidth, svgConica, cups);
  } else if (product.SVGDESIGN === "PulcinaSVG") {
    drawSVGOnFirstProduct(x, y, boxWidth, svgPulcina, cups);
  } else if (product.SVGDESIGN === "9090SVG") {
    drawSVGOnFirstProduct(x, y, boxWidth, svg9090, cups);
  } else if (product.SVGDESIGN === "MokaSVG") {
    drawSVGOnFirstProduct(x, y, boxWidth, svgMoka, cups);
  } else if (product.SVGDESIGN === "MenhirSVG") {
    drawSVGOnFirstProduct(x, y, boxWidth, svgMenhir, cups);
  } else if (product.SVGDESIGN === "9091SVG") {
    drawSVGOnFirstProduct(x, y, boxWidth, svg9091, cups);
  } else if (product.SVGDESIGN === "CupolaSVG") {
    drawSVGOnFirstProduct(x, y, boxWidth, svgCupola, cups);
  } else if (product.SVGDESIGN === "RexSVG") {
    drawSVGOnFirstProduct(x, y, boxWidth, svgRex, cups);
  } else if (product.SVGDESIGN === "PlisseSVG") {
    drawSVGOnFirstProduct(x, y, boxWidth, svgPlisse, cups);
  } else if (product.SVGDESIGN === "OssiSVG") {
    drawSVGOnFirstProduct(x, y, boxWidth, svgOssi, cups);
  } else if (product.SVGDESIGN === "9096SVG") {
    drawSVGOnFirstProduct(x, y, boxWidth, svg9096, cups);
  } else if (product.SVGDESIGN === "ChaSVG") {
    drawSVGOnFirstProduct(x, y, boxWidth, svgCha, cups);
  } else if (product.SVGDESIGN === "BulSVG") {
    drawSVGOnFirstProduct(x, y, boxWidth, svgBul, cups);
  } else if (product.SVGDESIGN === "ToruSVG") {
    drawSVGOnFirstProduct(x, y, boxWidth, svgToru, cups);
  }

  // 🔄 NEW: Dynamically load sticker from spreadsheet
  let stickerFilename = product.STICKERS?.trim();
  if (stickerFilename && overlayImgs[stickerFilename]) {
    let stickerImg = overlayImgs[stickerFilename];
    if (stickerImg.width > 0) {
      let dWidth = boxWidth * 1;
      let dHeight = boxHeight * 0.98;
      let dX = x + boxWidth - 84;
      let dY = y + (boxHeight - dHeight) / 2;
      image(stickerImg, dX, dY, dWidth, dHeight);
    } else {
      console.log("Using sticker:", stickerFilename);
    }
  }
}

function drawSVGOnFirstProduct(x, y, boxWidth, svg, count = 1) {
  let boxHeight = boxWidth;
  let centerX = x + boxWidth / 2;
  let centerY = y + boxHeight / 1.3;
  let radius = boxWidth / 5;
  let svgSize = boxWidth / -100;

  for (let i = 0; i < count; i++) {
    let svgContainer = createDiv(svg);
    svgContainer.size(svgSize, svgSize);
    svgContainer.style('position', 'absolute');
    svgContainer.style('z-index', '1');
    svgContainer.style('pointer-events', 'none');

    if (count < 2) {
      svgContainer.style('transform', `translate(-50%, -50%)`);
      svgContainer.position(centerX, centerY);
    } else {
      let angle = TWO_PI / count * i;
      let offsetX = cos(angle) * radius;
      let offsetY = sin(angle) * radius;

      svgContainer.style('transform', `
        translate(-50%, -50%)
        rotate(${degrees(angle) - 90}deg)
      `);
      svgContainer.position(centerX + offsetX, centerY + offsetY);
    }
  }
}



function loadOverlayImages(data) {
  // No additional logic needed here for now
}





// my SVGS 
const svgConica = `

<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 523 912" fill="none">
  <g filter="url(#filter0_i)">
    <path d="M0 235.5L150.471 308.422L131.729 339.159L65.8644 287.33L0 235.5Z" fill="white"/>
    <path d="M522.5 239.5L372 309.421L390.742 340.158L522.5 239.5Z" fill="white"/>
    <path d="M262.579 107.57L393 339.432L132 338.98L262.579 107.57Z" fill="white"/>
    <path d="M132 338.98L262.124 911.181L392.247 338.98V664.403L262.5 339.206L132 664.403V338.98Z" fill="white"/>
    <path d="M132 664.403L262.5 339.206L392.247 664.403V911.181L262.5 339.206L132 911.181V664.403Z" fill="white"/>
    <path d="M293.972 96.2703C293.972 113.993 279.713 128.36 262.124 128.36C244.534 128.36 230.275 113.993 230.275 96.2703C230.275 78.5474 244.534 64.1802 262.124 64.1802C279.713 64.1802 293.972 78.5474 293.972 96.2703Z" fill="white"/>
    <path d="M293.972 32.0902C293.972 49.8131 279.713 64.1802 262.124 64.1802C244.534 64.1802 230.275 49.8131 230.275 32.0902C230.275 14.3673 244.534 0 262.124 0C279.713 0 293.972 14.3673 293.972 32.0902Z" fill="white"/>
  </g>
  <defs>
    <filter id="filter0_i" x="-10" y="0" width="543" height="912" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="-10" dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
    </filter>
  </defs>
</svg>
`;



const svgConico = `
<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 613 622" fill="none">
  <path d="M305.935 24.6332L611.869 567.124H0L305.935 24.6332Z" fill="#FFFFFF"/>
  <path d="M612.17 566.564H0.818515C4.75909 582.444 71.974 615.548 309.309 620.929C546.644 626.309 610.106 586.927 612.17 566.564Z" fill="#FFFFFF"/>
  <path d="M326.649 20.1544C326.649 31.2854 317.375 40.3089 305.935 40.3089C294.494 40.3089 285.22 31.2854 285.22 20.1544C285.22 9.02345 294.494 0 305.935 0C317.375 0 326.649 9.02345 326.649 20.1544Z" fill="#FFFFFF"/>
</svg>
`;

const svgPulcina = `
<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 367 707" fill="#FFFFFF">
  <g>
    <path d="M247.985 0H124.638V18.3536H247.985V0Z" fill="#FFFFFF"/>
    <path d="M287.44 18.3536H84.3429V36.7072H287.44V18.3536Z" fill="#FFFFFF"/>
    <path d="M314.317 36.7072H59.3672V55.0609H314.317V36.7072Z" fill="#FFFFFF"/>
    <path d="M330.027 55.0509H38.4441V73.4045H330.027V55.0509Z" fill="#FFFFFF"/>
    <path d="M343.605 73.4045H25.8762V91.7581H343.605V73.4045Z" fill="#FFFFFF"/>
    <path d="M353.221 91.5779H16.1901V109.932H353.221V91.5779Z" fill="#FFFFFF"/>
    <path d="M367 109.932H3.93246V128.285H367V109.932Z" fill="#FFFFFF"/>
    <path d="M365.369 128.275H2.30144V146.629H365.369V128.275Z" fill="#FFFFFF"/>
    <path d="M367 146.629H12.0475V164.982H367V146.629Z" fill="#FFFFFF"/>
    <path d="M367 164.982H3.93246V183.336H367V164.982Z" fill="#FFFFFF"/>
    <path d="M366.99 183.316H0V201.67H366.99V183.316Z" fill="#FFFFFF"/>
    <path d="M361.817 201.079H6.02377V219.432H361.817V201.079Z" fill="#FFFFFF"/>
    <path d="M359.725 219.432H9.22578V237.786H359.725V219.432Z" fill="#FFFFFF"/>
    <path d="M353.221 237.275H14.2689V255.629H353.221V237.275Z" fill="#FFFFFF"/>
    <path d="M342.905 255.629H20.0526V273.983H342.905V255.629Z" fill="#FFFFFF"/>
    <path d="M334.44 273.973H30.369V292.326H334.44V273.973Z" fill="#FFFFFF"/>
    <path d="M325.274 292.026H36.5429V301.198H325.274V292.026Z" fill="#FFFFFF"/>
    <path d="M320.461 301.198H43.157V310.369H320.461V301.198Z" fill="#FFFFFF"/>
    <path d="M317.639 310.38H42.8268V319.551H317.639V310.38Z" fill="#FFFFFF"/>
    <path d="M313.667 319.251H46.5192V328.423H313.667V319.251Z" fill="#FFFFFF"/>
    <path d="M312.186 327.722H48.2402V336.894H312.186V327.722Z" fill="#FFFFFF"/>
    <path d="M309.504 336.904H48.9407V356.719H309.504V336.904Z" fill="#FFFFFF"/>
    <path d="M307.953 356.719H51.5323V376.535H307.953V356.719Z" fill="#FFFFFF"/>
    <path d="M307.953 376.535L53.6036 376.535V396.35H307.953V376.535Z" fill="#FFFFFF"/>
    <path d="M309.504 396.35H48.9407V416.166H309.504V396.35Z" fill="#FFFFFF"/>
    <path d="M312.096 416.166H43.157V435.981H312.096V416.166Z" fill="#FFFFFF"/>
    <path d="M317.639 435.981H35.3822V455.797H317.639V435.981Z" fill="#FFFFFF"/>
    <path d="M323.163 455.797H25.9963V475.612H323.163V455.797Z" fill="#FFFFFF"/>
    <path d="M333.619 475.612H21.4935V495.428H333.619V475.612Z" fill="#FFFFFF"/>
    <path d="M342.505 495.428H16.4503V515.243H342.505V495.428Z" fill="#FFFFFF"/>
    <path d="M354.362 515.243H7.33459V535.059H354.362V515.243Z" fill="#FFFFFF"/>
    <path d="M358.475 535.059H3.8224V554.874H358.475V535.059Z" fill="#FFFFFF"/>
    <path d="M356.543 554.874H1.89118V574.69H356.543V554.874Z" fill="#FFFFFF"/>
    <path d="M354.362 574.69H3.8224V596.788H354.362V574.69Z" fill="#FFFFFF"/>
    <path d="M351.78 596.788H9.37587V618.887H351.78V596.788Z" fill="#FFFFFF"/>
    <path d="M346.387 618.887H16.4503V635.067H346.387V618.887Z" fill="#FFFFFF"/>
    <path d="M341.474 635.057H21.4935V651.238H341.474V635.057Z" fill="#FFFFFF"/>
    <path d="M336.431 651.238H27.207V667.419H336.431V651.238Z" fill="#FFFFFF"/>
    <path d="M320.741 667.419H40.0751V688.767H320.741V667.419Z" fill="#FFFFFF"/>
    <path d="M310.785 688.767H56.7255V707H310.785V688.767Z" fill="#FFFFFF"/>
  </g>
</svg>
`;

const svg9090 = `
<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 512 710" fill="none">
  <g filter="url(#filter0_i_111_1244)">
    <path d="M2.9658 143.865C-20.0594 3.04678 96.4562 -2.79275 163.322 0.625174L163.322 45.5997H111.551C54 45.5997 54 45.5997 56.6041 81.9151C59.9793 128.983 63.8431 243.07 66.634 322.024C69.4249 400.978 134.954 404.197 167.369 395.937L138.588 463.441C54.5109 463.441 10.8153 400.209 10.8153 367.739L2.9658 143.865Z" fill="#FFFFFF"/>
    <path d="M163.323 392.218L163.322 0.625174L415.312 0.625102V392.218L462.8 484.078L442 580.5L512 668.661C302.195 743.53 127.67 699.856 66.634 668.661L120.968 575.076V484.078L163.323 392.218Z" fill="#FFFFFF"/>
  </g>
  <defs>
    <filter id="filter0_i_111_1244" x="-9.47553" y="0" width="521.476" height="715.338" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="-14.0131" dy="5.33833"/>
      <feGaussianBlur stdDeviation="4.73777"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_111_1244"/>
    </filter>
  </defs>
</svg>
`;

const svgMoka =  `
  <svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" viewBox="0 0 304 651" fill="none">
    <path d="M153 0H304L272 351H153V0Z" fill="#FFFFFF" />
    <path d="M0 0H153V351H34L0 0Z" fill="#FFFFFF" />
    <path d="M34 398H153V651H2.5L34 398Z" fill="#FFFFFF" />
    <path d="M153 398H272L293 651H153V398Z" fill="#FFFFFF" />
    <path d="M35 350H272V398H35V350Z" fill="#FFFFFF" />
  </svg>
  `;
  
  const svgMenhir = `
<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 499 733" fill="none">
  <path d="M184 687.979V442.708V79.9594L253.427 73.1593L422.068 29.0761L499 0V442.708V687.979L422.068 733H256.71L184 687.979Z" fill="#FFFFFF"/>
  <path d="M420.877 0H499L420.877 29.4985L252.702 73.6283L183 80L256.679 46.2537L420.877 0Z" fill="#FFFFFF"/>
  <path d="M78.4621 131.475L184 108V185L78.4621 211.526L84.335 425.619L37.1168 439L4.2285 430.549L0 233.357L78.4621 131.475Z" fill="#FFFFFF"/>
</svg>
`;

const svg9091 = `
<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 728 668" fill="none">
  <path d="M135.03 442.411C132.499 256.201 292.004 194.903 382.028 186.478C472.052 178.053 621.906 281.663 628.894 442.411C635.882 603.159 628.894 603.159 628.894 603.159C395.656 720.593 202.469 652.089 135.03 603.159V442.411Z" fill="#FFFFFF"/>
  <path d="M440.067 47.5166L421.61 201.134L410.008 198.759L421.61 81.17C285.343 35.3487 164.615 127.625 121.285 179.49C82.92 234.128 68.8134 283.618 59.8485 328.357C52.6765 364.148 68.2861 391.836 76.9873 401.206L136.05 445.022V473L72.1093 423.642C-20.4932 370.113 -4.53209 299.982 15.0238 271.608C10.1722 225.259 36.6451 193.26 50.488 183.054C56.0779 140.611 88.6769 118.827 104.278 113.24C119.782 71.4304 158.99 58.4266 176.656 57.1508C202.602 20.6205 243.454 17.8226 260.637 20.9899C291.434 -8.5722 331.829 -0.565798 348.177 7.13267L395.77 8.18846C429.52 10.1945 439.364 35.2431 440.067 47.5166Z" fill="#FFFFFF"/>
  <path d="M728 157.847L581.397 315.027C567.791 290.005 525.806 253.572 506.513 238.483L520.488 184.373L565.445 136.467L598.404 170.252L631.759 136.467L661.159 162.862L696.491 126.437L728 157.847Z" fill="#FFFFFF"/>
</svg>
`;

const svgCupola = `
<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 478 808" fill="none">
  <path d="M478 303H417.198V426.959C432.268 391.765 462.721 320.566 463.969 317.327C465.216 314.088 469.685 313.901 471.764 314.212L478 303Z" fill="#FFFFFF"/>
  <path d="M10.6014 329.162H143.119V368.094H34.6106L38.9759 564H7.17156C4.78104 501.916 0 374.074 0 359.374C0 344.673 7.06762 333.107 10.6014 329.162Z" fill="#FFFFFF"/>
  <path d="M143.105 751.473V317.14C131.155 248.605 140.486 103.474 273.403 71.2267C323.798 67.3729 418.353 111.16 418.353 317.14V751.473C430.323 758.473 429.574 773.763 424.587 780.533C315.61 830.278 183.628 801.26 131.259 780.533C121.783 761.785 135.208 753.348 143.105 751.473Z" fill="#FFFFFF"/>
  <path d="M315 35.5C315 55.1061 299.106 71 279.5 71C259.894 71 244 55.1061 244 35.5C244 15.8939 259.894 0 279.5 0C299.106 0 315 15.8939 315 35.5Z" fill="#FFFFFF"/>
</svg>
`;

const svgRex = `
<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 650 446" fill="none">
  <path d="M564.041 96.959L427.469 171.391L494.389 281.331L595.452 132.468L564.041 96.959Z" fill="#FFFFFF"/>
  <path d="M278.606 64.8579C319.163 64.6378 342.319 79.6128 374.889 103.781C408.268 128.549 441.126 187.089 441.126 187.089L561.992 388.533L0 400.163L106.526 208.941C106.526 208.941 139.712 141.964 175.495 112.658C209.832 84.5356 234.223 65.0987 278.606 64.8579Z" fill="#FFFFFF"/>
  <path d="M561.992 388.533L0.657381 399.713C3.82221 412.486 162.52 447.941 302.506 445.21C442.492 442.478 560.334 404.912 561.992 388.533Z" fill="#FFFFFF"/>
  <path d="M311.383 34.1429C311.383 52.9995 296.097 68.2858 277.24 68.2858C258.384 68.2858 243.098 52.9995 243.098 34.1429C243.098 15.2863 258.384 0 277.24 0C296.097 0 311.383 15.2863 311.383 34.1429Z" fill="#FFFFFF"/>
  <path d="M599.933 109.425C603.628 118.105 598.833 128.758 595.973 133L564 96.7467C570.503 92.8939 580.627 95.9531 584.877 97.9643C591.02 100.439 596.335 95.9875 598.224 93.4526C594.889 78.4457 583.818 70.5702 578.699 68.5082C571.068 55.3669 579.499 54.4497 584.668 55.6337C588.302 57.7419 591.697 59.3878 594.856 60.6457C594.27 55.6112 594.172 45.076 598.467 43.2105C602.762 41.345 618.893 52.3388 626.421 58.0689C649.866 50.972 651.447 63.0552 649.307 69.9839C644.772 76.0676 636.679 77.1826 633.199 76.9797C630.631 85.2941 619.351 90.279 614.032 91.7322C607.529 95.585 601.923 105.133 599.933 109.425Z" fill="#FFFFFF"/>
</svg>
`;

const svgPlisse = `
<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 2025 2742" fill="none">
  <path d="M1945.5 2591C1252.3 2863.4 651.333 2704.5 437.5 2591L673.71 645.5L376 606L292 1543L0 1481L119.5 323L705.885 380.5L729.5 186H1056.5V0H1313V186H2025L1742 827L1945.5 2591Z" fill="#FFFFFF"/>
</svg>
`;

const svgOssi = `
<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 2179 2946" fill="none">
  <path d="M655.5 2807.5L706 1850L842.841 417.5H307.5C216.3 467.9 233.167 1137.83 253 1466.5L67.5 1378L0 510L152 28.5H880L2135.5 0.5C2071.1 199.3 2089.33 361.333 2106.5 417.5C2120.1 562.3 2131.5 946.833 2135.5 1121V1850L2179 2757L2070.5 2865.5L1090.5 2945.5L655.5 2807.5Z" fill="#FFFFFF"/>
</svg>
`;

const svg9096 = `
<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 6048 2904" fill="none">
  <path d="M459.5 1802L682 1440.5C370.4 1151.3 448.5 823 526.5 695C708.9 370.2 1069.5 452 1227 533.5L1444 143.999C767.6 -225.601 290.833 205.332 137 466.999C-219 1139 203.667 1637 459.5 1802Z" fill="#FFFFFF"/>
  <path d="M537.5 2370.5C846.3 1598.1 1607.5 584.667 1949.5 174.501H4387C4913.17 107.001 5982 24.5006 6048 234.501C5939.61 274.041 5650.3 582.298 5360.17 1499C5549.94 1856.09 5677.06 2175.24 5738.5 2370.5C3585.7 3335.7 1374.17 2772.67 537.5 2370.5Z" fill="#FFFFFF"/>
  <path d="M1689 439C1689 540.62 1603.04 623 1497 623C1390.96 623 1305 540.62 1305 439C1305 337.38 1390.96 255 1497 255C1603.04 255 1689 337.38 1689 439Z" fill="#FFFFFF"/>
  <path d="M922 1686C922 1787.62 836.039 1870 730 1870C623.961 1870 538 1787.62 538 1686C538 1584.38 623.961 1502 730 1502C836.039 1502 922 1584.38 922 1686Z" fill="#FFFFFF"/>
</svg>
`;

const svgCha = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 3925 5011" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M236.919 2255.1C291.919 2537.43 333.219 3245.9 58.4191 3821.1C-26.2476 4126.6 -47.981 4766.9 542.419 4884.1C907.086 4979.6 1828.72 5113.3 2597.92 4884.1C2778.25 4805.6 3112.22 4535.3 3005.42 4082.1C3127.25 3875.93 3408.02 3381.5 3556.42 3053.1C3617.09 2906.6 3775.62 2587.5 3924.42 2483.1C3865.92 2469.93 3722.82 2445.6 3618.42 2453.6L2826.42 3011.1C2793.25 2927.1 2746.82 2658.3 2826.42 2255.1L2924.42 2293.1C2981.42 2069.43 3096.12 1586.5 3098.92 1444.1L3098.96 1441.92C3102.64 1256.37 3126.64 44.423 1558.92 0.598555C1020.75 -14.5681 -44.1814 252.899 1.41881 1444.1C-2.02825 1569.43 19.6459 1907.1 133.919 2255.1H236.919ZM1412.42 2487.4C1065.04 2467.21 669.346 2399.06 236.919 2255.1C-14.9144 1588.1 -71.0812 210.9 1558.92 138.5C2195.59 93.333 3381.5 593.5 2826.42 2255.1C2611.86 2375.45 2109.37 2527.92 1412.42 2487.4ZM1412.42 2487.4H1647.42C1620.62 2210.44 1674.92 2128.13 1705.42 2121.6C1886.62 2121.6 1912.25 2050.93 1902.42 2015.6C1909.22 1930.8 1649.59 1919.6 1518.92 1924.6C1206.52 1898.2 1153.75 1974.26 1166.42 2015.6C1164.82 2092 1303.09 2118.1 1372.42 2121.6C1427.22 2151.6 1421.92 2377.97 1412.42 2487.4Z" fill="#FFFFFF"/>
</svg>
`;

const svgBul = `
<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 3657 2804" fill="none">
  <path d="M1225 2752.5C305.4 2625.3 307.5 1932.83 423.5 1602.5C427.973 1589.46 432.934 1576.67 438.361 1564.14L292.999 1372.5C133.799 1269.7 100.333 1138.33 103.499 1085.5L0.5 1041C23.5 945.332 88.8588 781.79 171 772.998C174 772.677 179.5 772.998 179.5 772.998C247 772.998 373.9 807.199 317.5 1014C322.833 1046.33 369.399 1118.9 482.999 1150.5L727.146 1254.08C1202.37 957.979 2019 944.996 2019 944.996C2019 944.996 2745.8 966.338 2980 1049.97L3145.5 754.499C3158.5 676.499 3125.6 523.399 2890 534.999L1726 359C1600 326.5 1493.8 69.2 1787 0L3145.5 204.5C3308.5 238.5 3597.7 485.9 3468.5 833.5C3455.33 875.458 3405.3 1012.19 3310.5 1223.44C3481.22 1351.79 3562.7 1497.6 3585 1602.5C3827.4 2182.9 3393.33 2545.66 3146 2654.5C2888.83 2740.16 2144.6 2879.7 1225 2752.5Z" fill="#FFFFFF"/>
</svg>
`;

const svgToru = `
<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 4180 5042" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M2443 5042C3457.1 5042 3894.34 4783.83 3842 4586L3524.33 1764L4179.5 1290L3970.5 1039L3481.33 1382L3434.5 965.999H2092C2075.88 698.833 1953.2 141.399 1591.5 48.9994C1315.67 -87.8339 741.9 48.9947 481.501 651.999C481.501 651.999 6.33424 1955.83 0.500905 2384C-5.33243 2812.17 240.701 3601 1271.5 3331L1139.38 4589.47C1147.09 4397.82 1157.9 4128.8 1139.5 4586C1139.45 4587.16 1139.41 4588.32 1139.38 4589.47C1125.45 5043.39 1428.9 5042 2443 5042ZM1671.19 965.999H1539.5L1322.83 2878C1023.4 3066.17 237.501 2867.67 359.501 2384C481.501 1900.33 730.002 803.501 860.001 562C990 320.5 1595.1 34.9007 1687.5 876.5L1671.19 965.999Z" fill="#FFFFFF"/>
</svg>
`;
