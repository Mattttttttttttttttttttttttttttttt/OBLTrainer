let canvas; //= document.getElementById("canvas")
let ctx; //= canvas.getContext("2d")

function mod(n, m) {
    return ((n % m) + m) % m;
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randrange(start, stop, step = 1) {
    if (stop === undefined) {
        // Si un seul argument est fourni, il s'agit de stop ; start = 0
        stop = start;
        start = 0;
    }

    const width = Math.ceil((stop - start) / step);
    if (width <= 0) {
        throw new Error("Invalid range");
    }

    const index = Math.floor(Math.random() * width);
    return start + index * step;
}

// function allCharsIn(str1, str2) {
//     return [...str1].every((char) => str2.includes(char));
// }

// function shuffle(array) {
//     let currentIndex = array.length;

//     // While there remain elements to shuffle...
//     while (currentIndex != 0) {
//         // Pick a remaining element...
//         let randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex--;

//         // And swap it with the current element.
//         [array[currentIndex], array[randomIndex]] = [
//             array[randomIndex],
//             array[currentIndex],
//         ];
//     }
// }

// const compareCS = (a, b) =>
//     a.length === b.length &&
//     a.every(
//         (element, index) =>
//             (element >= 0 && b[index] >= 0) ||
//             (element == -1 && element == b[index])
//     );

// const LAYER_DEG = 15;
// const EDGE_DEG = 30;
// const CORNER_DEG = 60;

// colorscheme
// let TOPCOL = "#444";
// let BOTCOL = "white";
// let BLANKCOL = "#888";
// let TSIDECOLS = ["red", "#0f5fff", "orange", "#00db33"];
// let BSIDECOLS = ["red", "#00db33", "orange", "#0f5fff"];

// function rad(deg) {
//     return (deg * Math.PI) / 180;
// }

// const LAYER_RAD = rad(LAYER_DEG);
// const EDGE_RAD = rad(EDGE_DEG);
// const CORNER_RAD = rad(CORNER_DEG);

// const PADDING = 0.3;

// class Move {
//     static Slice = 0b11111111;
//     static U = 0b11110000;
//     static D = 0b00001111;
//     static Move(u, d) {
//         return (mod(u, 12) << 4) + mod(d, 12);
//     }
//     static isSlice(move) {
//         return move == this.Slice;
//     }
//     static Up(move) {
//         return (move & this.U) >> 4;
//     }
//     static Down(move) {
//         return move & this.D;
//     }
//     static Add(a, b) {
//         u1 = this.Up(a);
//         u2 = this.Up(b);
//         d1 = this.Down(a);
//         d2 = this.Down(b);
//         return this.Move(u1 + u2, d1 + d2);
//     }
//     static Sub(a, b) {
//         u1 = this.Up(a);
//         u2 = this.Up(b);
//         d1 = this.Down(a);
//         d2 = this.Down(b);
//         return this.Move(u1 - u2, d1 - d2);
//     }
//     static toString(move, short = false) {
//         if (this.isSlice(move)) return "/";
//         let u = this.Up(move);
//         let d = this.Down(move);
//         if (u > 6) u -= 12;
//         if (d > 6) d -= 12;
//         if (short) return u + d;
//         return "(" + u + ", " + d + ")";
//     }
// }

// class Sequence {
//     static parseMove(move) {
//         move = move.replace(/[^0-9\/,\-]/g, "");
//         if (move == "/") return Move.Slice;
//         if (move.includes(",")) {
//             // There is a separator
//             let nums = move.split(",");
//             return Move.Move(parseInt(nums[0]), parseInt(nums[1]));
//         } else {
//             switch (move.length) {
//                 case 2:
//                     return Move.Move(parseInt(move[0]), parseInt(move[1]));
//                 case 3:
//                     if (move[0] == "-")
//                         return Move.Move(
//                             parseInt(move.slice(0, 2)),
//                             parseInt(move[2])
//                         );
//                     return Move.Move(
//                         parseInt(move[0]),
//                         parseInt(move.slice(1))
//                     );
//                 case 4:
//                     return Move.Move(
//                         parseInt(move.slice(0, 2)),
//                         parseInt(move.slice(2))
//                     );
//             }
//         }
//     }

//     constructor(string) {
//         this.moves = [];
//         string = string.replace(/[^0-9\/,\-]/g, "");
//         let moveTxt = string.split(/(\/)/).filter((part) => part !== "");
//         for (let i = 0; i < moveTxt.length; i++) {
//             if (moveTxt[i] == "") continue;
//             this.moves.push(Sequence.parseMove(moveTxt[i]));
//         }
//     }

//     toString(karn = false) {
//         let str = "";
//         for (let i = 0; i < this.moves.length; i++) {
//             str += Move.toString(this.moves[i]);
//         }
//         return str;
//     }
// }

// class Point {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }

//     rotateAround(center, angleRad) {
//         // Translation relative au centre
//         const dx = this.x - center.x;
//         const dy = this.y - center.y;

//         // Rotation
//         const rotatedX = dx * Math.cos(angleRad) - dy * Math.sin(angleRad);
//         const rotatedY = dx * Math.sin(angleRad) + dy * Math.cos(angleRad);

//         // Mise à jour des coordonnées
//         this.x = rotatedX + center.x;
//         this.y = rotatedY + center.y;
//     }

//     addC(dx, dy) {
//         this.x += dx;
//         this.y += dy;
//     }

//     addP(point) {
//         this.x += point.x;
//         this.y += point.y;
//     }

//     toString() {
//         return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
//     }
// }

// const P0 = new Point(0, 0);

// function drawPolygon(points, fillColor, strokeColor = "black") {
//     if (points.length < 3) return;

//     ctx.beginPath();
//     ctx.moveTo(points[0].x, points[0].y);

//     for (let i = 1; i < points.length; i++) {
//         ctx.lineTo(points[i].x, points[i].y);
//     }

//     ctx.closePath();
//     ctx.fillStyle = fillColor;
//     ctx.fill();
//     ctx.strokeStyle = strokeColor;
//     ctx.lineWidth = 1;
//     ctx.stroke();
// }

// function drawPoint(point, color = "black", radius = 3) {
//     ctx.beginPath();
//     ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
//     ctx.fillStyle = color;
//     ctx.fill();
// }

// function drawSlice(center, color = "#ff5500", scale = 100) {
//     let padding = scale * PADDING * 1.5;
//     ctx.beginPath();
//     ctx.moveTo(center.x, center.y - scale - padding);
//     ctx.lineTo(center.x, center.y + scale + padding);
//     ctx.strokeStyle = "black";
//     ctx.lineWidth = 3;
//     ctx.stroke();
// }

// function drawEquator(center, flipped, scale = 100) {
//     let l = center.x - (scale * 2) / 3;
//     let r = flipped ? center.x + (scale * 2) / 3 : center.x + (scale * 4) / 3;
//     let t = center.y - scale / 4;
//     let b = center.y + scale / 4;

//     let TL = new Point(l, t);
//     let TM = new Point(center.x, center.y - scale / 4);
//     let TR = new Point(r, t);

//     let BL = new Point(l, b);
//     let BM = new Point(center.x, center.y + scale / 4);
//     let BR = new Point(r, b);

//     drawPolygon([TL, TM, BM, BL], TSIDECOLS[0]);
//     drawPolygon([TR, TM, BM, BR], TSIDECOLS[flipped * 2]);
// }

// function drawEdge(
//     center,
//     step,
//     sideCol,
//     isTopColor,
//     isTopLayer,
//     scale = 100,
//     sideBlank = false,
//     topBlank = false
// ) {
//     let padding = scale * PADDING;
//     let innerLength = scale - padding;
//     let offRad = step * EDGE_RAD;
//     let sideColors = isTopColor ? TSIDECOLS : BSIDECOLS;
//     // define points
//     // il, ir = inner outer corners (end of top area)
//     // ol, or = outer corners (side color points) (tingman reference)
//     // All coords relative to 0 for now
//     let il = new Point(innerLength * Math.tan(LAYER_RAD), innerLength);
//     let ir = new Point(-innerLength * Math.tan(LAYER_RAD), innerLength);

//     let ol = new Point(scale * Math.tan(LAYER_RAD), scale);
//     let or = new Point(-scale * Math.tan(LAYER_RAD), scale);
//     // adjust alignment based on layer, and flip if bottom layer
//     if (isTopLayer) offRad += LAYER_RAD;
//     else offRad += Math.PI + LAYER_RAD;

//     il.rotateAround(P0, offRad);
//     ir.rotateAround(P0, offRad);
//     ol.rotateAround(P0, offRad);
//     or.rotateAround(P0, offRad);

//     il.addP(center);
//     ir.addP(center);
//     ol.addP(center);
//     or.addP(center);

//     // draw
//     let layerColor, sideColor;
//     if (sideBlank) sideColor = BLANKCOL;
//     else sideColor = sideColors[sideCol];
//     if (topBlank) layerColor = BLANKCOL;
//     else layerColor = isTopColor ? TOPCOL : BOTCOL;
//     // Top part
//     drawPolygon([center, il, ir], layerColor);
//     drawPolygon([il, ir, or, ol], sideColor);
// }

// function drawCorner(
//     center,
//     step,
//     leftCol,
//     isTopColor,
//     isTopLayer,
//     scale = 100,
//     sideBlank = false,
//     topBlank = false
// ) {
//     let padding = scale * PADDING;
//     let innerLength = scale - padding;
//     let offRad = step * EDGE_RAD;
//     let sideColors = isTopColor ? TSIDECOLS : BSIDECOLS;

//     // points
//     // Just like edges, except we add im, om
//     // ir and or are a rotation of il and ol by CORNER_RAD:
//     let il = new Point(-innerLength * Math.tan(LAYER_RAD), innerLength);
//     let ol = new Point(-scale * Math.tan(LAYER_RAD), scale);
//     let im = new Point(
//         -innerLength * Math.tan(LAYER_RAD + EDGE_RAD),
//         innerLength
//     );
//     let om = new Point(-scale * Math.tan(LAYER_RAD + EDGE_RAD), scale);
//     let ir = new Point(-innerLength * Math.tan(LAYER_RAD), innerLength);
//     let or = new Point(-scale * Math.tan(LAYER_RAD), scale);
//     ir.rotateAround(P0, CORNER_RAD);
//     or.rotateAround(P0, CORNER_RAD);

//     // adjust alignment based on layer
//     if (isTopLayer) offRad -= LAYER_RAD;
//     else offRad -= LAYER_RAD + Math.PI;

//     il.rotateAround(P0, offRad);
//     ol.rotateAround(P0, offRad);
//     im.rotateAround(P0, offRad);
//     om.rotateAround(P0, offRad);
//     ir.rotateAround(P0, offRad);
//     or.rotateAround(P0, offRad);

//     il.addP(center);
//     im.addP(center);
//     ir.addP(center);
//     ol.addP(center);
//     om.addP(center);
//     or.addP(center);

//     // draw
//     let layerColor, sideColor0, sideColor1;
//     if (topBlank) layerColor = BLANKCOL;
//     else layerColor = isTopColor ? TOPCOL : BOTCOL;
//     if (sideBlank) {
//         sideColor0 = sideColor1 = BLANKCOL;
//     } else {
//         let rightCol = mod(leftCol + 1, 4);
//         sideColor0 = sideColors[leftCol];
//         sideColor1 = sideColors[rightCol];
//     }

//     drawPolygon([center, il, im, ir], layerColor);
//     drawPolygon([il, ol, om, im], sideColor0);
//     drawPolygon([im, om, or, ir], sideColor1);
// }

// function drawCursor(center, step, scale = 100) {
//     // outer cursor
//     let offRad = step * EDGE_RAD;
//     let distance = scale * (1 + PADDING * 1.5);
//     let radius = scale / 8;
//     let touchPt = new Point(center.x, center.y - scale);
//     let cedgePt = new Point(center.x, center.y - distance + radius);
//     let cursor = new Point(center.x, center.y - distance);
//     touchPt.rotateAround(center, offRad);
//     cursor.rotateAround(center, offRad);
//     cedgePt.rotateAround(center, offRad);
//     ctx.beginPath();
//     ctx.lineWidth = 1;
//     ctx.arc(cursor.x, cursor.y, radius, 0, 2 * Math.PI);
//     ctx.fillStyle = "black";
//     ctx.fill();
//     ctx.lineWidth = scale / 20;
//     ctx.strokeStyle = "red";
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.moveTo(cedgePt.x, cedgePt.y);
//     ctx.lineTo(touchPt.x, touchPt.y);
//     ctx.lineWidth = scale / 30;
//     ctx.stroke();
// }


// // "upright"
// const OBL = {
//     "1c": ""
// };

// let KARN = {
//     U: Move.Move(3, 0),
//     "U'": Move.Move(-3, 0),
//     D: Move.Move(0, 3),
//     "D'": Move.Move(0, -3),
//     u: Move.Move(2, -1),
//     "u'": Move.Move(-2, 1),
//     d: Move.Move(-1, 2),
//     "d'": Move.Move(1, -2),
//     M: Move.Move(1, 1),
//     "M'": Move.Move(-1, -1),
//     m: Move.Move(2, 2),
//     "m'": Move.Move(-2, -2),
//     F: Move.Move(4, 1),
//     "F'": Move.Move(-4, -1),
//     f: Move.Move(1, 4),
//     "f'": Move.Move(-1, -4),
//     T: Move.Move(2, -4),
//     "T'": Move.Move(-2, 4),
//     t: Move.Move(-4, 2),
//     "t'": Move.Move(4, -2),
// };

// const kmoves = Object.entries(KARN);

// function testOBL(layer) {
//     for (let [name, value] of Object.entries(OBL)) {
//         if (layer == value) return name;
//     }
//     return 0;
// }

// function rotateLayer(layer, full) {
//     const n = 6 + full;
//     return layer.slice(n) + layer.slice(0, n);
// }

// function offsetLayer(layer, top) {
//     const a = top ? "A".charCodeAt(0) : "E".charCodeAt(0);
//     const offnum = top ? 0 : 4;
//     let str = "";
//     for (const s of layer) {
//         if (isNaN(s))
//             str += String.fromCharCode(mod(s.charCodeAt(0) - a + 1, 4) + a);
//         else str += (mod(parseInt(s), 4) + 1 + offnum).toString();
//     }
//     return str;
// }

// function findPLL(layer, top, full = false) {
//     layer = top ? layer : layer.slice(-1) + layer.slice(0, -1);
//     const limit = 4 + 4 * full;
//     for (let i = 0; i < limit; i++) {
//         let oblName = testPLL(layer);
//         if (oblName) return oblName;
//         layer = rotateLayer(layer, full);
//     }
//     return false;
// }

// [top?, color (1st clockwise for corners), corner?]
// const pieceProperties = [
//     [true, 0, true],
//     [true, 1, false],
//     [true, 1, true],
//     [true, 2, false],
//     [true, 2, true],
//     [true, 3, false],
//     [true, 3, true],
//     [true, 0, false],

//     [false, 0, false],
//     [false, 0, true],
//     [false, 1, false],
//     [false, 1, true],
//     [false, 2, false],
//     [false, 2, true],
//     [false, 3, false],
//     [false, 3, true],
// ];

// class Cube {
//     constructor(descriptor) {
//         this.setPosition(descriptor);
//     }

//     setPosition(position) {
//         const l = position.length;
//         // top layer
//         this.topPieces = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
//         let tcorners = 0;
//         let i = 0;
//         for (; i + tcorners < 12; i++) {
//             let l = position[i];
//             this.topPieces[i + tcorners] = solved.indexOf(l);
//             if (isNaN(l)) {
//                 tcorners++;
//             }
//         }
//         this.botPieces = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
//         let bcorners = 0;
//         for (let i = 12 - tcorners; i + bcorners + tcorners < 24; i++) {
//             let l = position[i];
//             let idx = i + bcorners + tcorners - 12;
//             this.botPieces[idx] = solved.indexOf(l);
//             if (isNaN(l)) {
//                 bcorners++;
//             }
//         }
//         this.barflip = position[16] == "/" || position[16] == "+";
//     }

//     draw(center, scale = 100, blanks = false) {
//         const topCenter = new Point(
//             center.x - scale * 1.5,
//             center.y - scale / 2
//         );
//         const botCenter = new Point(
//             center.x + scale * 1.5,
//             center.y - scale / 2
//         );
//         const barCenter = new Point(center.x, center.y + scale);
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         // top layer
//         for (let i = 0; i < 12; i++) {
//             let piece = this.topPieces[i];
//             if (piece == -1) continue;
//             const props = pieceProperties[piece];
//             if (props[2]) {
//                 // corner
//                 drawCorner(topCenter, i, props[1], props[0], true, scale);
//             } else {
//                 drawEdge(topCenter, i, props[1], props[0], true, scale);
//             }
//         }
//         // bottom layer
//         for (let i = 0; i < 12; i++) {
//             let piece = this.botPieces[i];
//             if (piece == -1) continue;
//             const props = pieceProperties[piece];
//             if (props[2]) {
//                 // corner
//                 drawCorner(botCenter, i, props[1], props[0], false, scale);
//             } else {
//                 drawEdge(botCenter, i, props[1], props[0], false, scale);
//             }
//         }
//         // equator
//         drawEquator(barCenter, this.barflip, scale);
//         // slice lines
//         // drawSlice(topCenter, scale);
//         // drawSlice(botCenter, scale);

//         // temp
//     }

//     topLayerString() {
//         let str = "";
//         for (let i = 0; i < 12; i++) {
//             let number = this.topPieces[i];
//             if (number == -1) continue;
//             str += solved[number];
//         }
//         return str;
//     }

//     botLayerString() {
//         let str = "";
//         for (let i = 0; i < 12; i++) {
//             let number = this.botPieces[i];
//             if (number == -1) continue;
//             str += solved[number];
//         }
//         return str;
//     }

//     barChar(flip = this.barflip) {
//         return (flip ? "+" : "-").toString();
//     }

//     isOblSolved() {
//         return (
//             this.topPieces.every((n) => n < 8) &&
//             this.botPieces.every((n) => n > 7 || n == -1)
//         );
//     }

//     OBLCase(full = true) {
//         const top = findPLL(this.topLayerString(), true, full);
//         const bot = findPLL(this.botLayerString(), false, full);
//         const bf = (this.barflip ? "+" : "-").toString();
//         if (top == "-") return ":" + bot + bf;
//         if (bot == "-") return top + ":" + bf;
//         return top + "/" + bot + bf;
//     }

//     setOBL(top, bot, preU, preD, u, d, flip) {
//         preU = mod(preU, 4);
//         preD = mod(preD, 4);
//         u = mod(u, 8);
//         d = mod(d, 8);
//         let topStr = TPLL[top];
//         let botStr = BPLL[bot];
//         for (; preU > 0; preU--) topStr = offsetLayer(topStr, true);
//         for (; preD > 0; preD--) botStr = offsetLayer(botStr, false);
//         for (; u > 0; u--) topStr = rotateLayer(topStr, true);
//         for (; d > 0; d--) botStr = rotateLayer(botStr, true);
//         this.setPosition(topStr + botStr + this.barChar(flip));
//     }

//     descriptor() {
//         return this.topLayerString() + this.botLayerString() + this.barChar();
//     }

//     isStrictCubeShape() {
//         // aligned
//         return (
//             compareCS(
//                 this.topPieces,
//                 [0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0]
//             ) &&
//             compareCS(this.botPieces, [0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1])
//         );
//     }

//     isSliceable(u, d) {
//         if (
//             this.topPieces[mod(-u, 12)] == -1 ||
//             this.topPieces[mod(-u + 6, 12)] == -1
//         ) {
//             return false;
//         }
//         if (
//             this.botPieces[mod(-d, 12)] == -1 ||
//             this.botPieces[mod(-d + 6, 12)] == -1
//         ) {
//             return false;
//         }
//         return true;
//     }

//     nextSliceables() {
//         let tp = 6,
//             tn = -6,
//             bp = 6,
//             bn = -6;
//         for (let i = 1; i <= 6; i++) {
//             if (this.isSliceable(i, 0)) {
//                 tp = i;
//                 break;
//             }
//         }
//         for (let i = -1; i >= -6; i--) {
//             if (this.isSliceable(i, 0)) {
//                 tn = i;
//                 break;
//             }
//         }
//         for (let i = 1; i <= 6; i++) {
//             if (this.isSliceable(0, i)) {
//                 bp = i;
//                 break;
//             }
//         }
//         for (let i = -1; i >= -6; i--) {
//             if (this.isSliceable(0, i)) {
//                 bn = i;
//                 break;
//             }
//         }
//         return [tp, tn, bp, bn];
//     }

//     applySequence(sequence) {
//         for (let i = 0; i < sequence.moves.length; i++) {
//             this.applyMove(sequence.moves[i]);
//         }
//     }

//     applyMove(move) {
//         if (Move.isSlice(move)) {
//             this.slice();
//             return;
//         }
//         this.turn(Move.Up(move), Move.Down(move));
//     }

//     turn(u, d) {
//         if (!this.isSliceable(u, d)) {
//             console.error("destination unsliceable");
//             return;
//         }
//         // top
//         let tempPieces = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
//         for (let i = 0; i < 12; i++) {
//             tempPieces[i] = this.topPieces[mod(i - u, 12)];
//         }
//         for (let i = 0; i < 12; i++) {
//             this.topPieces[i] = tempPieces[i];
//         }
//         // bottom
//         tempPieces = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

//         for (let i = 0; i < 12; i++) {
//             tempPieces[i] = this.botPieces[mod(i - d, 12)];
//         }
//         for (let i = 0; i < 12; i++) {
//             this.botPieces[i] = tempPieces[i];
//         }
//     }

//     slice() {
//         if (this.topPieces[0] == -1 || this.topPieces[6] == -1) {
//             console.error("Unsliceable on top layer");
//             return;
//         }
//         if (this.botPieces[0] == -1 || this.botPieces[6] == -1) {
//             console.error("Unsliceable on bottom layer");
//             return;
//         }
//         // swap top[6:11] with bot[0:5]
//         // Save all values
//         let lt = this.topPieces.slice(0, 6);
//         let rt = this.topPieces.slice(6);
//         let lb = this.botPieces.slice(6);
//         let rb = this.botPieces.slice(0, 6);

//         // Assign new values
//         this.topPieces = lt.concat(rb);
//         this.botPieces = rt.concat(lb);

//         // change barflip
//         this.barflip = !this.barflip;
//     }
// }

// Variables
let possibleOBL = [
    ["", "1c", "1c"],
    ["", "cadj", "cadj"],
    ["", "cadj", "copp"],
    ["", "copp", "copp"],
    ["", "3c", "3c"],
    ["", "4e", "4e"],
    ["", "3e", "3e"],
    ["", "line", "line"],
    ["", "L", "line"],
    ["", "L", "L"],
    ["", "1e", "1e"],
    ["good", "pair", "pair"],
    ["bad", "pair", "pair"],
    ["good", "arrow", "pair"],
    ["bad", "arrow", "pair"],
    ["good", "arrow", "arrow"],
    ["bad", "arrow", "arrow"],
    ["", "gem", "gem"],
    ["", "gem", "knight"],
    ["", "gem", "axe"],
    ["", "gem", "squid"],
    ["good", "knight", "knight"],
    ["bad", "knight", "knight"],
    ["good", "knight", "axe"],
    ["bad", "knight", "axe"],
    ["good", "axe", "axe"],
    ["bad", "axe", "axe"],
    ["", "squid", "gem"],
    ["", "squid", "knight"],
    ["", "squid", "axe"],
    ["", "squid", "squid"],
    ["good", "thumb", "thumb"],
    ["bad", "thumb", "thumb"],
    ["good", "thumb", "bunny"],
    ["bad", "thumb", "bunny"],
    ["good", "bunny", "bunny"],
    ["bad", "bunny", "bunny"],
    ["", "shell", "shell"],
    ["", "shell", "bird"],
    ["", "shell", "hazard"],
    ["", "yoshi", "shell"],
    ["good", "bird", "bird"],
    ["bad", "bird", "bird"],
    ["", "bird", "hazard"],
    ["", "hazard", "hazard"],
    ["good", "yoshi", "bird"],
    ["bad", "yoshi", "bird"],
    ["", "yoshi", "hazard"],
    ["good", "yoshi", "yoshi"],
    ["bad", "yoshi", "yoshi"],
    ["good", "kite", "kite"],
    ["bad", "kite", "kite"],
    ["good", "kite", "cut"],
    ["bad", "kite", "cut"],
    ["", "kite", "T"],
    ["good", "kite", "N"],
    ["bad", "kite", "N"],
    ["", "kite", "tie"],
    ["", "cut", "T"],
    ["good", "cut", "N"],
    ["bad", "cut", "N"],
    ["", "cut", "tie"],
    ["good", "cut", "cut"],
    ["bad", "cut", "cut"],
    ["good", "T", "T"],
    ["bad", "T", "T"],
    ["", "T", "N"],
    ["good", "T", "tie"],
    ["bad", "T", "tie"],
    ["good", "N", "N"],
    ["bad", "N", "N"],
    ["", "tie", "N"],
    ["good", "tie", "tie"],
    ["bad", "tie", "tie"]
];
let selectedOBL = [];
let scrambleList = [];

let previousScramble = null;

let remainingOBL = [];
let eachCase = 0; // 0 = random, n = get each case n times before moving on
const MIN_EACHCASE = 2;
const MAX_EACHCASE = 4;

let defaultLists = {};
let userLists = {};
let highlightedList = null;

let scrambleOffset = 0;
let generators;
let hasActiveScramble = false;
let hasPreviousScramble = false;
let isPopupOpen = false;

let cubeCenter, cubeScale;

let pressStartTime = null;
let holdTimeout = null;
let timerStart = null;
let intervalId = null;
let isRunning = false;
let readyToStart = false;
let otherKeyPressed = 0;
const startDelay = 0;

// HTML elements

// Top bar buttons
const toggleUiEl = document.getElementById("toggleui");
const uploadEl = document.getElementById("uploaddata");
const downloadEl = document.getElementById("downloaddata");
const fileEl = document.getElementById("fileinput");

const sidebarEl = document.getElementById("sidebar");
const contentEl = document.getElementById("content");

const OBLListEl = document.getElementById("results");
const filterInputEl = document.getElementById("filter");

const eachCaseEl = document.getElementById("allcases");

// Selection buttons
const selectAllEl = document.getElementById("sela");
const deselectAllEl = document.getElementById("desela");
const selectTheseEl = document.getElementById("selt");
const deselectTheseEl = document.getElementById("deselt");
const showSelectionEl = document.getElementById("showselected");
const showAllEl = document.getElementById("showall");

// List buttons
const openListsEl = document.getElementById("openlists");
const userListsEl = document.getElementById("userlists");
const defaultListsEl = document.getElementById("defaultlists");
const newListEl = document.getElementById("newlist");
const deleteListEl = document.getElementById("dellist");
const selectListEl = document.getElementById("sellist");
const trainListEl = document.getElementById("trainlist");

// Popup
const scramblePopupEl = document.getElementById("scram-popup");
const displayScramEl = document.getElementById("display-scram");
const canvasWrapperEl = document.getElementById("canvas-wrapper");
const displayOBLname = document.getElementById("OBLname");

const listPopupEl = document.getElementById("list-popup");

// initialize canvas declared at the very top of the file
canvas = document.getElementById("scram-canvas");
ctx = canvas.getContext("2d");

// Main page elements (scrambles and timer)
const currentScrambleEl = document.getElementById("cur-scram");
const previousScrambleEl = document.getElementById("prev-scram");
const prevScrambleButton = document.getElementById("prev");
const nextScrambleButton = document.getElementById("next");
const timerEl = document.getElementById("timer");
const timerBoxEl = document.getElementById("timerbox");

function usingTimer() {
    return isRunning || pressStartTime != null;
}

function OBLname(obl) {
    return obl[0] ? `${obl[0]} ${obl[1]}/${obl[2]}` : `${obl[1]}/${obl[2]}`;
}

function listLength(list) {
    let l = 0;
    for (let i of Object.values(list)) {
        l += i;
    }
    return l;
}

function getLocalStorageData() {
    // selectedOBL
    const storageSelectedOBL = localStorage.getItem("selectedOBL");
    if (storageSelectedOBL !== null) {
        selectedOBL = JSON.parse(storageSelectedOBL);
        for (let k of selectedOBL) {
            selectOBL(k);
        }
        if (eachCaseEl.checked) {
            enableGoEachCase(1);
        } else {
            enableGoEachCase(randInt(MIN_EACHCASE, MAX_EACHCASE));
        }
        generateScramble();
        if (selectedOBL.length != 0) {
            for (let obl of possibleOBL) {
                hideOBL(OBLname(obl));
            }
            for (let obl of selectedOBL) {
                showOBL(obl);
            }
        }
    }

    // userLists
    const storageUserLists = localStorage.getItem("userLists");
    if (storageUserLists !== null) {
        userLists = JSON.parse(storageUserLists);
        addUserLists();
    }
}

function saveSelectedOBL() {
    localStorage.setItem("selectedOBL", JSON.stringify(selectedOBL));
    if (!hasActiveScramble || selectedOBL.length == 0) generateScramble();
}

function saveUserLists() {
    localStorage.setItem("userLists", JSON.stringify(userLists));
}

function setHighlightedList(id) {
    if (id == "all") id = null;
    if (id != null) {
        const item = document.getElementById(id);
        item.classList.add("highlighted");
    }
    if (highlightedList != null) {
        document
            .getElementById(highlightedList)
            .classList.remove("highlighted");
    }
    highlightedList = id;
}

function addListItemEvent(item) {
    item.addEventListener("click", () => {
        if (item.classList.contains("highlighted")) {
            item.classList.remove("highlighted");
            highlightedList = null;
        } else {
            setHighlightedList(item.id);
        }
    });
}

async function init() {
    let buttons = "";
    for (obl of possibleOBL) {
        buttons += `
        <div class="case" id="${OBLname(obl)}">${OBLname(obl)}</div>`;
    }
    OBLListEl.innerHTML += buttons;

    // Load generators
    await fetch("./generators.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            generators = data;
            // Load local storage data only after generators
            // have been loaded, so we can generate a scramble
            getLocalStorageData();
        })
        .catch((error) => console.error("Failed to fetch data:", error));
    // Add buttons to the page for each OBL choice
    // Stored to a temp variable so we edit the page only once, and prevent a lag spike

    // Add event listener to each button, so we can click it
    document.querySelectorAll(".case").forEach((caseEl) => {
        caseEl.addEventListener("click", () => {
            const isChecked = caseEl.classList.contains("checked");
            n = caseEl.id;
            if (isChecked) {
                deselectOBL(n);
            } else {
                selectOBL(n);
            }
            saveSelectedOBL();
        });
    });

    // Load default lists
    await fetch("./defaultlists.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            defaultLists = data;
            addDefaultLists();
        })
        .catch((error) => console.error("Failed to fetch data:", error));
}

function isObl(obl, filter) {
    return obl.startsWith(filter);
}

function passesFilter(obl, filter) {
    let g = obl[0];
    let u = obl[1];
    let d = obl[2];
    filter = filter.replace("/", " ").toLowerCase();
    if (filter.split(" ")[0] == "good") {
        if (g != "good") return false;
        // if user only typed "good":
        if (filter.split(" ").length == 1 || filter.split(" ")[1] == "") return true;
        else {
            a = filter.split(" ")[1]
            // only top case:
            if (filter.split(" ").length == 2) {
                return isObl(u, a) || isObl(d, a);
            }
            else {
                b = filter.split(" ")[2]
                return isObl(u, a) && isObl(d, b) || 
                        isObl(u, b) && isObl(d, a);
            }
        }
    }
    if (filter.split(" ")[0] == "bad") {
        if (g != "bad") return false;
        // if user only typed "bad":
        if (filter.split(" ").length == 1 || filter.split(" ")[1] == "") return true;
        else {
            a = filter.split(" ")[1]
            // only top case:
            if (filter.split(" ").length == 2) {
                return isObl(u, a) || isObl(d, a);
            }
            else {
                b = filter.split(" ")[2]
                return isObl(u, a) && isObl(d, b) || 
                        isObl(u, b) && isObl(d, a);
            }
        }
    };
    // from here, filter's g = ""
    a = filter.split(" ")[0]
    // only top case:
    if (filter.split(" ").length == 1) {
        return isObl(u, a) || isObl(d, a);
    }
    else {
        b = filter.split(" ")[1]
        return isObl(u, a) && isObl(d, b) || 
                isObl(u, b) && isObl(d, a);
    }
}

function generateScramble() {
    scrambleOffset = 0;
    if (selectedOBL.length == 0) {
        timerEl.textContent = "--:--";
        currentScrambleEl.textContent = "Scramble will show up here";
        hasActiveScramble = false;
        scrambleList = [];
        return;
    }
    if (eachCase > 0) {
        if (remainingOBL.length == 0) {
            let number = eachCaseEl.checked
                ? 1
                : randInt(MIN_EACHCASE, MAX_EACHCASE);
            enableGoEachCase(number);
        }
        let caseNum = randInt(0, remainingOBL.length - 1);
        OBLChoice = remainingOBL.splice(caseNum, 1)[0];
    } else {
        OBLChoice = selectedOBL[randInt(0, selectedOBL.length - 1)];
    }

    OBLChoice += "-+"[randInt(0, 1)];

    scramble = generators[OBLChoice];
    // Add random begin and end layer moves
    let s = scramble[0];
    let e = scramble[scramble.length - 1];
    let start;
    let end;
    if (s == "A") {
        start = `${randrange(-5, 5, 3)},${randrange(-3, 7, 3)}`;
    } else {
        start = `${randrange(-3, 7, 3)},${randrange(-4, 6, 3)}`;
    }
    if (e == "A") {
        end = `${randrange(-4, 6, 3)},${randrange(-3, 7, 3)}`;
    } else {
        end = `${randrange(-3, 7, 3)},${randrange(-5, 5, 3)}`;
    }

    let final = (
        start +
        scramble.slice(1, scramble.length - 1) +
        end
    ).replaceAll("/", " / ");
    if (scrambleList.length != 0) {
        previousScramble = scrambleList[scrambleList.length - 1];
        previousScrambleEl.textContent =
            "Previous scramble : " + previousScramble;
        hasPreviousScramble = true;
    }
    if (!hasActiveScramble) {
        timerEl.textContent = "0.00";
    }
    currentScrambleEl.textContent = final;
    scrambleList.push(final);
    hasActiveScramble = true;
}

function showAll() {
    for (let OBL of possibleOBL) {
        showOBL(OBLname(OBL));
    }
}

function hideOBL(text) {
    document.getElementById(text).classList.add("hidden");
}

function showOBL(text) {
    document.getElementById(text).classList.remove("hidden");
}

function selectOBL(obl) {
    document.getElementById(obl).classList.add("checked");
    if (!selectedOBL.includes(obl)) {
        selectedOBL.push(obl);
    }
    if (eachCase > 0 && !remainingOBL.includes(obl)) {
        remainingOBL = remainingOBL.concat(Array(eachCase).fill(obl));
    }
}

function deselectOBL(obl) {
    document.getElementById(obl).classList.remove("checked");
    if (selectedOBL.includes(obl)) {
        selectedOBL = selectedOBL.filter((a) => a != obl);
    }
    if (eachCase && remainingOBL.includes(OBL)) {
        remainingOBL = remainingOBL.filter((a) => a != obl);
    }
}

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${seconds}.${centiseconds.toString().padStart(2, "0")}`;
}

function setColor(className) {
    timerEl.classList.remove("red", "green");
    if (className != "") timerEl.classList.add(className);
}

function startTimer() {
    timerStart = performance.now();
    intervalId = setInterval(() => {
        const now = performance.now();
        const elapsed = now - timerStart;
        timerEl.textContent = formatTime(elapsed);
    }, 10);
    isRunning = true;
    setColor();
}

function stopTimer() {
    clearInterval(intervalId);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    pressStartTime = null;
    holdTimeout = null;
    timerStart = null;
    intervalId = null;
    readyToStart = false;
    otherKeyPressed = 0;
    if (canInteractTimer()) {
        timerEl.textContent = "0.00";
    } else {
        timerEl.textContent = "--:--";
    }
    setColor("");
    console.log("Reset timer");
}
function timerBeginTouch(spaceEquivalent) {
    if (!hasActiveScramble) return;
    if (document.activeElement == filterInputEl) return;
    if (isRunning) {
        // Stop timer
        stopTimer();
        generateScramble();
        if (!spaceEquivalent) otherKeyPressed += 1;
    } else if (spaceEquivalent && otherKeyPressed <= 0) {
        if (!pressStartTime) {
            pressStartTime = performance.now();
            setColor("red");
            // Après 200ms, passer en vert
            holdTimeout = setTimeout(() => {
                setColor("green");
                readyToStart = true;
            }, startDelay);
        }
    }
}

function timerEndTouch(spaceEquivalent) {
    if (spaceEquivalent) {
        const heldTime = performance.now() - pressStartTime;
        clearTimeout(holdTimeout);
        if (!isRunning) {
            if (heldTime >= startDelay && readyToStart) {
                startTimer();
            } else {
                setColor();
            }
        }
        pressStartTime = null;
        readyToStart = false;
    } else {
        otherKeyPressed = Math.max(0, otherKeyPressed - 1);
    }
}

function addUserLists() {
    let content = "";
    for (k of Object.keys(userLists)) {
        content += `
        <div id="${k}" class=\"list-item\">${k} (${listLength(
            userLists[k]
        )})</div>`;
    }
    userListsEl.innerHTML = content;
    for (let item of document.querySelectorAll("#userlists>.list-item")) {
        addListItemEvent(item);
    }
    saveUserLists();
}

function addDefaultLists() {
    let content = "";
    for (k of Object.keys(defaultLists)) {
        content += `
        <div id="${k}" class=\"list-item\">${k} (${listLength(
            defaultLists[k]
        )})</div>`;
    }
    defaultListsEl.innerHTML = content;
    for (let item of document.querySelectorAll("#defaultlists>.list-item")) {
        addListItemEvent(item);
    }
}

function selectList(listName, setSelection) {
    if (listName == null) {
        showAll();
        return;
    }
    let list;
    if (Object.keys(defaultLists).includes(listName)) {
        list = defaultLists[listName];
    } else {
        list = userLists[listName];
    }
    if (setSelection) {
        for (let [obl, inlist] of Object.entries(list)) {
            if (inlist) {
                showOBL(obl);
                selectOBL(obl);
            } else {
                hideOBL(obl);
                deselectOBL(obl);
            }
        }

        saveSelectedOBL();
    } else {
        for (let [OBL, inlist] of Object.entries(list)) {
            if (inlist) {
                showOBL(OBL);
            } else {
                hideOBL(OBL);
            }
        }
    }
    saveUserLists();
}

function validName(n) {
    for (l of n) {
        if (
            l.toLowerCase() == l.toUpperCase() &&
            isNaN(parseInt(l)) &&
            !" /".includes(l)
        ) {
            return false;
        }
    }
    return true;
}

// function openScramblePopup(scramble) {
//     if (usingTimer()) return;
//     isPopupOpen = true;
//     scramblePopupEl.classList.add("open");

//     // Change canvas size
//     const w = canvasWrapperEl.offsetWidth;
//     const h = canvasWrapperEl.offsetHeight;

//     canvas.width = w;
//     canvas.height = h;
//     cubeCenter = new Point(parseInt(w / 2), parseInt(h / 2));
//     cubeScale = parseInt(w / 7);

//     let displayCube = new Cube(solved);
//     displayCube.applySequence(new Sequence(scramble));
//     displayCube.draw(cubeCenter, cubeScale);

//     displayScramEl.textContent = scramble;
//     displayOBLname.textContent = displayCube.OBLCase();
// }

function openListPopup() {
    if (usingTimer()) return;
    isPopupOpen = true;
    listPopupEl.classList.add("open");
}

function closePopup() {
    isPopupOpen = false;
    scramblePopupEl.classList.remove("open");
    listPopupEl.classList.remove("open");
}

function canInteractTimer() {
    return (
        hasActiveScramble &&
        document.activeElement != filterInputEl &&
        !isPopupOpen
    );
}

function enableGoEachCase(count) {
    eachCase = count;
    remainingOBL = selectedOBL.flatMap((el) => Array(eachCase).fill(el));
}

init();

filterInputEl.addEventListener("input", () => {
    filterInputEl.value = filterInputEl.value.replace(/[^a-zA-Z/\- ]+/g, "");
    setHighlightedList(null);
    for (obl of possibleOBL) {
        const n = OBLname(obl);
        if (passesFilter(obl, filterInputEl.value)) {
            showOBL(n);
        } else {
            hideOBL(n);
        }
    }
});

selectAllEl.addEventListener("click", () => {
    if (usingTimer()) return;
    for (let obl of possibleOBL) {
        selectOBL(OBLname(obl));
    }
    saveSelectedOBL();
});

deselectAllEl.addEventListener("click", () => {
    if (usingTimer()) return;
    for (let obl of possibleOBL) {
        deselectOBL(OBLname(obl));
    }
    saveSelectedOBL();
});

selectTheseEl.addEventListener("click", () => {
    if (usingTimer()) return;
    for (i of OBLListEl.children) {
        if (!i.classList.contains("hidden")) {
            selectOBL(i.id);
        }
    }
    saveSelectedOBL();
});

deselectTheseEl.addEventListener("click", () => {
    if (usingTimer()) return;
    for (i of OBLListEl.children) {
        if (!i.classList.contains("hidden")) {
            deselectOBL(i.id);
        }
    }
    saveSelectedOBL();
});

showAllEl.addEventListener("click", () => {
    if (usingTimer()) return;
    showAll();
});

showSelectionEl.addEventListener("click", () => {
    if (usingTimer()) return;
    for (obl of possibleOBL) {
        const n = OBLname(obl);
        if (selectedOBL.includes(n)) {
            showOBL(n);
        } else {
            hideOBL(n);
        }
    }
});

prevScrambleButton.addEventListener("click", () => {
    if (usingTimer()) return;
    if (scrambleList.length == 0) return;
    scrambleOffset = Math.min(scrambleOffset + 1, scrambleList.length - 1);
    currentScrambleEl.textContent =
        scrambleList[scrambleList.length - 1 - scrambleOffset];
});

nextScrambleButton.addEventListener("click", () => {
    if (usingTimer()) return;
    if (scrambleList.length == 0) return;
    scrambleOffset--;
    if (scrambleOffset < 0) {
        scrambleOffset = 0;
        generateScramble();
    } else {
        currentScrambleEl.textContent =
            scrambleList[scrambleList.length - 1 - scrambleOffset];
    }
});

openListsEl.addEventListener("click", () => {
    if (usingTimer()) return;
    openListPopup();
});

newListEl.addEventListener("click", () => {
    if (usingTimer()) return;
    if (selectedOBL.length == 0) {
        alert("Please select OBLs to create a list!");
        return;
    }
    let newListName = prompt("Name of your list:");
    if (newListName == null || newListName == "") {
        return;
    }
    newListName = newListName.trim();
    if (newListName == "" || !validName(newListName)) {
        alert(
            "Please enter a valid name (only letters, numbers, slashes, and spaces)"
        );
        return;
    }
    if (Object.keys(defaultLists).includes(newListName)) {
        alert("A default list already has this name!");
        return;
    }
    if (Object.keys(userLists).includes(newListName)) {
        alert("You already gave this name to a list");
        return;
    }
    if (document.getElementById(newListName) != null) {
        alert("You can't give this name to a list (id taken)");
        return;
    }
    let newList = {};
    for (obl of possibleOBL) {
        const n = OBLname(obl);
        if (selectedOBL.includes(n)) {
            newList[n] = 1;
        } else {
            newList[n] = 0;
        }
        userLists[newListName] = newList;
    }
    addUserLists();
    setHighlightedList(newListName);
});

selectListEl.addEventListener("click", () => {
    if (highlightedList == null) {
        alert("Please click on a list");
        return;
    }
    selectList(highlightedList, false);
    closePopup();
});

deleteListEl.addEventListener("click", () => {
    if (highlightedList == null) {
        return;
    }
    if (Object.keys(userLists).includes(highlightedList)) {
        if (confirm("You are about to delete list " + highlightedList)) {
            delete userLists[highlightedList];
            highlightedList = null;
            addUserLists();
        }
        return;
    }
    if (Object.keys(defaultLists).includes(highlightedList)) {
        return;
    }
    alert("Error");
});

trainListEl.addEventListener("click", () => {
    if (highlightedList == null) {
        alert("Please click on a list");
        return;
    }
    selectList(highlightedList, true);
    closePopup();
});

window.addEventListener("keydown", (e) => {
    if (e.code == "Escape") {
        if (isPopupOpen) {
            closePopup();
        }
        if (usingTimer()) {
            resetTimer();
        }
        return;
    }

    if (!canInteractTimer()) return;
    let isSpace = e.code == "Space";
    timerBeginTouch(isSpace);
    if (isSpace) e.preventDefault();
});

window.addEventListener("keyup", (e) => {
    if (!canInteractTimer()) return;
    let isSpace = e.code == "Space";
    timerEndTouch(isSpace);
    if (isSpace) e.preventDefault();
});

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState == "hidden") {
        resetTimer();
    }
});

timerBoxEl.addEventListener("touchstart", (e) => {
    if (isPopupOpen) return;
    if (!canInteractTimer()) return;
    timerBeginTouch(true);
});

timerBoxEl.addEventListener("touchend", (e) => {
    if (!canInteractTimer()) return;
    timerEndTouch(true);
});

// currentScrambleEl.addEventListener("click", () => {
//     if (usingTimer()) return;
//     if (isPopupOpen || !hasActiveScramble) return;
//     openScramblePopup(currentScrambleEl.innerText);
// });

// previousScrambleEl.addEventListener("click", () => {
//     if (usingTimer()) return;
//     if (isPopupOpen || !hasPreviousScramble) return;
//     openScramblePopup(previousScramble);
// });

toggleUiEl.addEventListener("click", () => {
    if (usingTimer()) return;
    if (sidebarEl.classList.contains("hidden")) {
        sidebarEl.classList.remove("hidden");
        sidebarEl.classList.add("full-width-mobile");
        contentEl.classList.add("hidden-mobile");
    } else {
        sidebarEl.classList.add("hidden");
        sidebarEl.classList.remove("full-width-mobile");
        contentEl.classList.remove("hidden-mobile");
    }
});

downloadEl.addEventListener("click", () => {
    if (usingTimer()) return;
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "OBLTrainerData.json";
    a.click();
    URL.revokeObjectURL(url);
});

uploadEl.addEventListener("click", () => {
    if (pressStartTime != null) return;
    fileEl.click();
});

fileEl.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            jsonData = JSON.parse(reader.result);
            localStorage.setItem("selectedOBL", jsonData["selectedOBL"]);
            localStorage.setItem("userLists", jsonData["userLists"]);
            getLocalStorageData();
        } catch (e) {
            console.error("Error:", e);
        }
    };
    reader.readAsText(file);
});

eachCaseEl.addEventListener("change", (e) => {
    eachCase = eachCaseEl.checked ? 1 : randInt(MIN_EACHCASE, MAX_EACHCASE);
    if (eachCase == 1) {
        enableGoEachCase(eachCase);
    }
});

// Enable crosses
for (let cross of document.querySelectorAll(".cross")) {
    cross.addEventListener("click", () => closePopup());
}
