function mod(n, m) {
    return ((n % m) + m) % m;
}

function randInt(min, max) {
    // max included
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

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
}

function replaceWithDict(str, dict) {
    // keys are already sorted longest → shortest
    const pattern = new RegExp(Object.keys(dict).join("|"), "g");
    while (str.replace(pattern, match => dict[match]) !== str)
        str = str.replace(pattern, match => dict[match]);
    return str;
}


// here i'll attempt to generate algs
const OBL = {"1c": "BBwWWwWWwWWw",
       "cadj": "BBwBBwWWwWWw",
       "copp": "BBwWWwBBwWWw",
       "3c": "BBwBBwBBwWWw",
       "4e": "BBwBBwBBwBBw",
       "3e": "WWbWWbWWbWWw",
       "line": "WWbWWwWWbWWw",
       "L": "WWbWWbWWwWWw",
       "1e": "WWbWWwWWwWWw",

       "left pair": "WWbBBwWWwWWw",
       "right pair": "BBbWWwWWwWWw",
       "left arrow": "BBwWWwWWbWWw",
       "right arrow": "BBwWWbWWwWWw",
       "gem": "WWbBBbWWwWWw",
       "left knight": "WWwWWbWWbBBw",
       "right knight": "BBbWWbWWwWWw",
       "left axe": "WWwWWbWWwBBb",
       "right axe": "BBwWWbWWwWWb",
       "squid": "BBwWWbWWbWWw",
       "left thumb": "WWwWWbBBbWWb",
       "right thumb": "WWbBBbWWwWWb",
       "left bunny": "WWwBBbWWbWWb",
       "right bunny": "WWbWWbBBwWWb",

       "shell": "BBbBBwWWwWWw",
       "left bird": "BBwWWwWWbBBw",
       "right bird": "BBwBBbWWwWWw",
       "hazard": "BBwWWbWWwBBw",
       "left kite": "BBbBBbWWwWWw",
       "right kite": "WWwWWbBBbBBw",
       "left cut": "BBwBBwWWbWWb",
       "right cut": "BBwBBbWWbWWw",
       "black T": "BBbBBwWWbWWw",
       "white T": "WWwWWbBBwBBb",
       "left N": "WWbBBwWWbBBw",
       "right N": "WWwBBbWWwBBb",
       "black tie": "WWbBBbWWwBBw",
       "white tie": "BBwWWwBBbWWb",
       "left yoshi": "BBbWWwBBwWWw",
       "right yoshi": "WWwBBwWWbBBw"
}

// format is 16-character string, both corner first
const CUBEL = 24;
const HALF_L = 6;
const LAYERL = 12;
const THREE_FOUR_L = 18;
const SOLVED_a = "BBbBBbBBbBBbWWwWWwWWwWWw";
const SOLVED_A = "bBBbBBbBBbBBwWWwWWwWWwWW";
const SLICE_a = "WWwWWwBBbBBbBBbBBbWWwWWw";
const SLICE_A = "wWWwWWbBBbBBbBBbBBwWWwWW";
const KARN = {
    "3,0":   "U",
    "-3,0":  "U'",
    "0,3":   "D",
    "0,-3":  "D'",
    "3,3":   "e",
    "-3,-3": "e'",
    "3,-3":  "E",
    "-3,3":  "E'",
    "2,-1":  "u",
    "-2,1":  "u'",
    "-1,2":  "d",
    "1,-2":  "d'",
    "-4,-1": "F'",
    "4,1":   "F",
    "-1,-4": "f'",
    "1,4":   "f",
    "2,-4":  "T",
    "-2,4":  "T'",
    "-4,2":  "t'",
    "4,-2":  "t",
    "2,2":   "m",
    "-2,-2": "m'",
    "-1,-1": "M'",
    "1,1":   "M",
    "5,-1":  "u2",
    "-5,1":  "u2'"
};
const A_MOVES = [[3,0], [-3,0], [0,3], [0,-3], [3,3],
    [2,-1], [-1,2], [-4,-1], [-1,-4], [2,-4], [2,2], [-1,-1], [5,-1]];
const a_MOVES = [[3,0], [-3,0], [0,3], [0,-3], [3,3],
    [-2,1], [1,-2], [4,1], [1,4], [-2,4], [-2,-2], [1,1], [-5,1]];
// TODO: add more moves?
const KARNL = a_MOVES.length;
const HIGHKARN = {
    // add spaces for de-ambiguity
    " U U' U U' ": " U4 ",
    " U' U U' U ": " U4' ",
    " D D' D D' ": " D4 ",
    " D' D D' D ": " D4' ",
    " u u' u u' ": " u4 ",
    " u' u u' u ": " u4' ",
    " d d' d d' ": " d4 ",
    " d' d d' d ": " d4' ",

    " U U' U ": " U3 ",
    " U' U U' ": " U3' ",
    " D D' D ": " D3 ",
    " D' D D' ": " D3' ",
    " u u' u ": " u3 ",
    " u' u u' ": " u3' ",
    " d d' d ": " d3 ",
    " d' d d' ": " d3' ",
    " F F' F ": " F3 ",
    " F' F F' ": " F3' ",
    " f f' f ": " f3 ",
    " f' f f' ": " f3' ",

    " U U' ": " W ",
    " U' U ": " W' ",
    " D D' ": " B ",
    " D' D ": " B' ",
    " u u' ": " w ",
    " u' u ": " w' ",
    " d d' ": " b ",
    " d' d ": " b' ",
    " F F' ": " F2 ",
    " F' F ": " F2' ",
    " f f' ": " f2 ",
    " f' f ": " f2' ",

    " U U ": " UU ",
    " U' U' ": " UU' ",
    " D D ": " DD ",
    " D' D' ": " DD' ",

    " 60 ": " U2 ",
    " 63 ": " U2D ",
    " 6-3 ": " U2D' ",
    " 66 ": " U2D2 ",
    " 06 ": " D2 ",
    " 36 ": " UD2 ",
    " -36 ": " U'D2 "
};
// if the following moves accur, replace them with optimized ones
// UPDATE THIS
const OPTIM = {
    "/0,0/": "", // special case, handled in optimize()
    "/3,3/3,3/": "-3,-3/-3,-3",
    "/-3,-3/-3,-3/": "3,3/3,3",
    "/2,2/-2,-2/": "2,2/-2,-2",
    "/-2,-2/2,2/": "-2,-2/2,2",
    "/1,1/-1,-1/": "1,1/-1,-1",
    "/-1,-1/1,1/": "-1,-1/1,1",
    "/2,-4/-2,4/2,-4/": "2,-4/-2,4/2,-4",
    "/-2,4/2,-4/-2,4/": "-2,4/2,-4/-2,4",
    "/5,-1/-5,1/5,-1/": "5,-1/-5,1/5,-1",
    "/-5,1/5,-1/-5,1/": "-5,1/5,-1/-5,1"
}

const OPTIM_KEYS = Array.from(Object.keys(OPTIM)); // array of keys

function isOBL(layer, obl) {
    // layer: 12-char string w/ BbWw, in cs
    // obl: a key of OBL dict
    // return: bool
    let target = OBL[obl]
    // if it's top misalign, change to bottom misalign
    if (layer.charAt(0).toUpperCase() !== layer.charAt(0)) layer = shift(layer,-1);
    for (let move = 0; move <= 3; move++) {
        if (target === shift(layer, 3*move)) return true;
    }
    if (obl.split(" ").at(-1) !== "T" && obl.split(" ").at(-1) !== "tie") {   
        // T and tie colors are specified 
        layer = layer_flip(layer);
        for (let move = 0; move <= 3; move++) {
            if (target === shift(layer, 3*move)) return true;
        }}
    return false;
}

function randAMove() {
    // return: element of A_MOVES
    return JSON.parse(JSON.stringify(A_MOVES))[randInt(0,KARNL-1)];
}

function randaMove() {
    // return: element of a_MOVES
    return JSON.parse(JSON.stringify(a_MOVES))[randInt(0,KARNL-1)];
}

function layer_flip(state){
    `flips "w" to "b" and vice versa in the given state

    Args:
        state (str): the state (e.g. "BBbBBbWWwWWw")
        
    Returns:
        str: the flipped state (e.g. "WWwWWwBBbBBb")
    `
    let return_val = [];
    for (let c of state) {
        switch (c) {
            case "b":
                return_val.push("w");
                break;
            case "B":
                return_val.push("W");
                break;
            case "w":
                return_val.push("b");
                break;
            case "W":
                return_val.push("B");
                break;
            default:
                console.log(c, ": from: layer_flip(): unrecognized piece")
        }
    }
    return return_val.join("")
}

function shift(a, amount) {
    // shift "ABC" to "CAB" aka cw move
    // assumes amount <= a.length (although if it's equal it makes no impact)
    amount *= -1;
    if (amount < 0) amount += a.length;
    return a.slice(amount) + a.slice(0, amount);
}

function move(cube, u,d) {
    // u,d in int
    return shift(cube.slice(0,LAYERL), u) + 
            shift(cube.slice(LAYERL), d)
}

function slice(cube) {
    return  cube.slice(LAYERL, THREE_FOUR_L) + // bottom sliced up
            cube.slice(HALF_L, LAYERL) +
            cube.slice(0,HALF_L) +
            cube.slice(THREE_FOUR_L, CUBEL)
}

function changesAlignment(move) {
    // move in [u, d], returns boolean
    return mod(move, 3) != 0
}

function karnify(scramble) {
    // scramble: e.g. "A/-3,0/-1,2/1,-2/-1,2/3,3/-2,-2/3,3/-3,0/-1,2/3,3/3,3/-2,4/A"
    // returns "A U' d3 e m' e U' d e e T' A"
    scramble = scramble.split("/");
    // first level karnify; skip the A and a
    for (let i = 1; i < scramble.length-1; i++) {
        if (scramble[i] in KARN) scramble[i] = KARN[scramble[i]];
        else {scramble[i] = scramble[i].replace(",", "")}
    }
    // second level karnify
    scramble = scramble.join(" ")
    scramble = replaceWithDict(scramble, HIGHKARN)
    return scramble
}

function legalMove(move) {
    // move: (int) -10 ~ 12 (i think)
    // returns: -5 ~ 6
    if (move < -5) {
        return move + 12;
    }
    else if (move > 6) {
        return move - 12;
    }
    return move;
}

function addMoves(move1, move2) {
    // move1/2: "3,-3" or "A", "a"; cannot both be alignments
    let alignments = false;
    let startA;
    if (move1.toLowerCase() === "a" || move2.toLowerCase() === "a") {
        alignments = true;
        let Atranslation = {"A": "a", "a": "A"};
        if (move1 in Atranslation) {
            return changesAlignment(parseInt(move2.split(",")[0], 10)) ? Atranslation[move1] : move1;
        }
        if (move2 in Atranslation) {
            return changesAlignment(parseInt(move1.split(",")[0], 10)) ? Atranslation[move2] : move2;
        }
    }
    move1 = move1.split(",");
    move2 = move2.split(",");
    let result = [legalMove(parseInt(move1[0],10) + parseInt(move2[0],10)),
                legalMove(parseInt(move1[1],10) + parseInt(move2[1],10))];
    return result.join(",");
}

function optimize(scramble) {
    // scramble: "A/-3,-3/0,3/0,-3/-1,-4/-3,0/3,0/0,-3/0,3/a"
    while (replaceWithDict(scramble, OPTIM) !== scramble) {
        // optimize needed
        let moves = scramble.split("/");
        // moves now in ["A","3,-3", "3,0", "a"]
        let atSlice = 0; // the index of the next move in "moves"
        let cycleCompleted = false;
        for (let i = 0; i < scramble.length; i++) {
            // going over every character of scramble
            if (cycleCompleted) break;
            if (scramble.at(i) !== "/") continue;
            atSlice++;
            for (let optimable of OPTIM_KEYS) {
                // avoid getting the last "a" also
                if (scramble.length - 1-i < optimable.length) continue;
                if (scramble.slice(i, i+optimable.length) === optimable) {
                    // match!!
                    if (optimable === "/0,0/") {
                        // special case
                        moves[atSlice-1] = addMoves(moves[atSlice-1], moves[atSlice+1]);
                        moves.splice(atSlice, 2);
                        scramble = moves.join("/")
                        cycleCompleted = true;
                        break;
                    }
                    let optimableLen = optimable.split("/").length;
                    let optimTo = OPTIM[optimable].split("/"); // no slice at beginning/end
                    let delSliceNum = optimableLen - 2;
                    moves[atSlice-1] = addMoves(moves[atSlice-1], optimTo.shift());
                    moves[atSlice+optimableLen-2] = addMoves(moves[atSlice+optimableLen-2], optimTo.pop());
                    // now optimTo has the two merged moves removed
                    moves.splice(atSlice, delSliceNum, ...optimTo);
                    scramble = moves.join("/")
                    cycleCompleted = true;
                    break;
                }
            }
        }
    }
    return scramble;
}

function getScramble(obl) {
    // obl: e.g. "left gem/knight"
    // return: e.g. ["A/-3,-3/0,3/0,-3/-1,-4/-3,0/3,0/0,-3/0,3/a", in karn]
    let moves = "";
    let abf;
    let topA; // bool: top misalign?
    let [u, d] = obl.split("/");
    let state;
    while (true) {
        if (Math.random() < 0.5) {
            // A start
            moves += "A/";
            topA = true;
            state = SLICE_A;
        }
        else {
            // a start
            moves += "a/";
            topA = false;
            state = SLICE_a;
        }
        // first 5 slices
        for (let i = 2; i < 6; i++) {
            abf = topA ? randAMove() : randaMove();
            state = slice(move(state, abf[0], abf[1]));
            moves += `${abf[0]},${abf[1]}/`
            if (changesAlignment(abf[0])) topA = !topA;
        }
        // slice 6-10
        for (let i = 6; i <= 10; i++){
            abf = topA ? randAMove() : randaMove();
            state = slice(move(state, abf[0], abf[1]));
            moves += `${abf[0]},${abf[1]}/`
            if (changesAlignment(abf[0])) topA = !topA;
            // includes check for layer flip
            if ((isOBL(state.slice(0,LAYERL), u) &&
                isOBL(state.slice(LAYERL), d)) ||
                (isOBL(state.slice(0,LAYERL), d) &&
                isOBL(state.slice(LAYERL), u))) {
                let currentA = topA ? "A" : "a";
                moves += currentA;
                console.log("preoptim moves "+moves);
                moves = optimize(moves);
                console.log("postoptim moves "+moves);
                return [moves, karnify(moves)];
            }
        }
        moves = "";
    }
}

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
    ["same", "axe", "axe"],
    ["diff", "axe", "axe"],
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
    ["same", "yoshi", "yoshi"],
    ["diff", "yoshi", "yoshi"],
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
let OBLtranslation = {
    // layer flips are generated by getScramble()
    "1c/1c": ["1c/1c"],
    "cadj/cadj": ["cadj/cadj"],
    "cadj/copp": ["cadj/copp"],
    "copp/copp": ["copp/copp"],
    "3c/3c": ["3c/3c"],
    "4e/4e": ["4e/4e"],
    "3e/3e": ["3e/3e"],
    "line/line": ["line/line"],
    "L/line": ["L/line"],
    "L/L": ["L/L"],
    "1e/1e": ["1e/1e"],
    "good pair/pair": ["left pair/left pair", "right pair/right pair"],
    "bad pair/pair": ["left pair/right pair"],
    "good arrow/pair": ["left arrow/right pair", "right arrow/left pair"],
    "bad arrow/pair": ["left arrow/left pair", "right arrow/right pair"],
    "good arrow/arrow": ["left arrow/left arrow", "right arrow/right arrow"],
    "bad arrow/arrow": ["left arrow/right arrow"],
    "gem/gem": ["gem/gem"],
    "gem/knight": ["gem/left knight", "gem/right knight"],
    "gem/axe": ["gem/left axe", "gem/right axe"],
    "gem/squid": ["gem/squid"],
    "good knight/knight": ["left knight/right knight"],
    "bad knight/knight": ["left knight/left knight", "right knight/right knight"],
    "good knight/axe": ["left knight/left axe", "right knight/right axe"],
    "bad knight/axe": ["left knight/right axe", "right knight/left axe"],
    "same axe/axe": ["left axe/left axe", "right axe/right axe"],
    "diff axe/axe": ["left axe/right axe"],
    "squid/knight": ["squid/left knight", "squid/right knight"],
    "squid/axe": ["squid/left axe", "squid/right axe"],
    "squid/squid": ["squid/squid"],
    "good thumb/thumb": ["left thumb/left thumb", "right thumb/right thumb"],
    "bad thumb/thumb": ["left thumb/right thumb"],
    "good thumb/bunny": ["left thumb/right bunny", "right thumb/left bunny"],
    "bad thumb/bunny": ["left thumb/left bunny", "right thumb/right bunny"],
    "good bunny/bunny": ["left bunny/left bunny", "right bunny/right bunny"],
    "bad bunny/bunny": ["left bunny/right bunny"],
    "shell/shell": ["shell/shell"],
    "shell/bird": ["shell/left bird", "shell/right bird"],
    "shell/hazard": ["shell/hazard"],
    "yoshi/shell": ["left yoshi/shell", "right yoshi/shell"],
    "good bird/bird": ["left bird/right bird"],
    "bad bird/bird": ["left bird/left bird", "right bird/right bird"],
    "bird/hazard": ["left bird/hazard", "right bird/hazard"],
    "hazard/hazard": ["hazard/hazard"],
    "good yoshi/bird": ["left yoshi/left bird", "right yoshi/right bird"],
    "bad yoshi/bird": ["left yoshi/right bird", "right yoshi/left bird"],
    "yoshi/hazard": ["left yoshi/hazard", "right yoshi/hazard"],
    "same yoshi/yoshi": ["left yoshi/left yoshi", "right yoshi/right yoshi"],
    "diff yoshi/yoshi": ["left yoshi/right yoshi"],
    "good kite/kite": ["left kite/left kite", "right kite/right kite"],
    "bad kite/kite": ["left kite/right kite"],
    "good kite/cut": ["left kite/left cut", "right kite/right cut"],
    "bad kite/cut": ["left kite/right cut", "right kite/left cut"],
    "kite/T": ["left kite/black T", "left kite/white T",
                "right kite/black T", "right kite/white T"],
    "good kite/N": ["left kite/right N", "right kite/left N"],
    "bad kite/N": ["left kite/left N", "right kite/right N"],
    "kite/tie": ["left kite/black tie", "left kite/white tie",
                "right kite/black tie", "right kite/white tie"],
    "cut/T": ["left cut/black T", "left cut/white T",
                "right cut/black T", "right cut/white T"],
    "good cut/N": ["left cut/left N", "right cut/right N"],
    "bad cut/N": ["left cut/right N", "right cut/left N"],
    "cut/tie": ["left cut/black tie", "left cut/white tie",
                "right cut/black tie", "right cut/white tie"],
    "good cut/cut": ["left cut/left cut", "right cut/right cut"],
    "bad cut/cut": ["left cut/right cut"],
    "good T/T": ["black T/black T", "white T/white T"],
    "bad T/T": ["black T/white T"],
    "T/N": ["black T/left N", "black T/right N",
            "white T/left N", "white T/right N"],
    "good T/tie": ["black T/black tie", "white T/white tie"],
    "bad T/tie": ["black T/white tie", "white T/black tie"],
    "good N/N": ["left N/left N", "right N/right N"],
    "bad N/N": ["left N/right N"],
    "tie/N": ["black tie/left N", "black tie/right N",
            "white tie/left N", "white tie/right N"],
    "good tie/tie": ["black tie/black tie", "white tie/white tie"],
    "bad tie/tie": ["black tie/white tie"]
}

let selectedOBL = [[], []]; // [[oblidgood/bad], [oblidleft/right]]
let scrambleList = []; // [[normal, karn], etc.]

let previousScramble = null;

let remainingOBL = [[], []]; // [[oblidgood/bad], [oblidleft/right]]
let eachCase = 0; // 0 = random, n = get each case n times before moving on
let usingKarn = 0; // 0 = not using karn, etc.
let usingSpe = 0; // 0 = not using specific naming, etc.
let usingOBLP = false;
let buttons = [];
const MIN_EACHCASE = 2;
const MAX_EACHCASE = 4;

let defaultLists = {};
let userLists = {};
let highlightedList = null;

let scrambleOffset = 0;
let hasActiveScramble = false;
let isPopupOpen = false;

let lastRemoved;

let pressStartTime = null;
let holdTimeout = null;
let timerStart = null;
let intervalId = null;
let isRunning = false;
let readyToStart = false;
let otherKeyPressed = 0;
const startDelay = 200;

let currentCase = "";

// HTML elements

// Top bar buttons
const toggleUiEl = document.getElementById("toggleui");
const openHelpEl = document.getElementById("open-help");
const uploadEl = document.getElementById("uploaddata");
const downloadEl = document.getElementById("downloaddata");
const fileEl = document.getElementById("fileinput");

const sidebarEl = document.getElementById("sidebar");
const contentEl = document.getElementById("content");

const OBLListEl = document.getElementById("results");
const filterInputEl = document.getElementById("pbl-filter");

const eachCaseEl = document.getElementById("allcases");
const karnEl = document.getElementById("karn");
const speEl = document.getElementById("specific");
const OBLPEl = document.getElementById("oblp");
const settingList = [eachCaseEl, karnEl, speEl, OBLPEl];
const removeLastEl = document.getElementById("unselprev");

// Selection buttons
const selectAllEl = document.getElementById("sela");
const deselectAllEl = document.getElementById("desela");
const selectTheseEl = document.getElementById("selt");
const deselectTheseEl = document.getElementById("deselt");
const showSelectionEl = document.getElementById("showselected");
const showAllEl = document.getElementById("showall");
const selCountEl = document.getElementById("selcount");

// List buttons
const openListsEl = document.getElementById("openlists");
const userListsEl = document.getElementById("userlists");
const defaultListsEl = document.getElementById("defaultlists");
const newListEl = document.getElementById("newlist");
const deleteListEl = document.getElementById("dellist");
const overwriteListEl = document.getElementById("overlist");
const selectListEl = document.getElementById("sellist");
const trainListEl = document.getElementById("trainlist");

// Popup
const listPopupEl = document.getElementById("list-popup");
const helpPopupEl = document.getElementById("help-popup");

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
    // obl in an array, gives english
    return obl[0] ? `${obl[0]} ${obl[1]}/${obl[2]}` : `${obl[1]}/${obl[2]}`;
}

// localStorage wrapper with OBL suffix
const STORAGE_SUFFIX = 'OBL';

const storage = {
    getItem: (key) => localStorage.getItem(key + STORAGE_SUFFIX),
    setItem: (key, value) => localStorage.setItem(key + STORAGE_SUFFIX, value),
    removeItem: (key) => localStorage.removeItem(key + STORAGE_SUFFIX)
};

// Migration function for legacy data
function migrateLegacyData() {
    const legacyKeys = ['settings', 'selected', 'userLists'];
    let migrated = false;
    
    for (let key of legacyKeys) {
        const legacyData = localStorage.getItem(key);
        const newData = storage.getItem(key);
        
        // Only migrate if legacy data exists and new data doesn't
        if (legacyData !== null && newData === null) {
            storage.setItem(key, legacyData);
            localStorage.removeItem(key); // Clean up old data
            migrated = true;
        }
    }
    
    if (migrated) {
        console.log('Migrated legacy OBL data to new storage format');
    }
}

function getLocalStorageData() {
    // Call migration before any other localStorage access
    migrateLegacyData();
    // settings; in a string, 0 and 1 represent (un)checked, in order of settingList
    // this goes before selecting OBLs because of eachCase.
    const storageSettings = storage.getItem("settings");
    // uncheck everything
    for (let el of settingList) {
        if (el.checked) el.click();
    }
    if (storageSettings === null)
        // legacy
        storage.setItem("settings", "0".repeat(settingList.length));
    else {
        for (let i = 0; i < storageSettings.length; i++)
            if (storageSettings[i] === "1") settingList[i].click();
        // add 0s if the settings is too short
        while (storage.getItem("settings").length !== settingList.length) {
            storage.setItem("settings", storage.getItem("settings") + "0")
        }
    }

    // selectedOBL
    const storageSelectedOBL = storage.getItem("selected");
    if (storageSelectedOBL !== null) {
        selectedOBL = JSON.parse(storageSelectedOBL);
        if (selectedOBL.length === 0 || typeof selectedOBL[0] === "string"){
            selectedOBL = [selectedOBL, []]; // legacy
            saveSelectedOBL();
        }
        for (let k of selectedOBL[usingSpe]) {
            selectOBL(k);
        }
        updateSelCount();
        enableGoEachCase();
        generateScramble();
    }

    // userLists
    const storageUserLists = storage.getItem("userLists");
    if (storageUserLists !== null) {
        userLists = JSON.parse(storageUserLists);
        // LEGACY: convert list to new array format
        for (let listName of Object.keys(userLists)) {
            if (!Array.isArray(userLists[listName])) {
                console.log("Legacy user list");
                let formattedList = []
                for (let obl of possibleOBL)
                    if (userLists[listName][OBLname(obl)] == 1)
                        formattedList.push(OBLname(obl));
                userLists[listName] = [formattedList.copyWithin(), getSpeList(formattedList)];
            }
        }
        addUserLists();
    }
}

function saveSelectedOBL() {
    // convert the selectedOBL to the other list
    if (!usingSpe) 
        // good/bad → left/right
        selectedOBL[1] = [...getSpeList(selectedOBL[0])];
    else
        // left/right → good/bad
        selectedOBL[0] = [...getNonSpeList(selectedOBL[1])];

    storage.setItem("selected", JSON.stringify(selectedOBL));
    // this is === 0 cuz genScram() has a if statement that deletes the scram if so
    if (!hasActiveScramble || selectedOBL[usingSpe].length === 0) generateScramble();
    else if (!(selectedOBL[usingSpe].includes(currentCase)) && currentCase != "") generateScramble(true);
}

function saveUserLists() {
    storage.setItem("userLists", JSON.stringify(userLists));
}

function saveSettings() {
    let store = "";
    for (let el of settingList)
        if (el.checked)
            store += "1";
        else
            store += "0";
    storage.setItem("settings", store);
}

function updateSelCount() {
    selCountEl.textContent = "Selected: "+selectedOBL[usingSpe].length;
}

function setHighlightedList(id) {
    if (id == "all") id = null;
    if (id != null) {
        const item = document.getElementById(id);
        item.classList.add("highlighted");
    }
    if (highlightedList != null)
        document.getElementById(highlightedList).classList.remove("highlighted");
    highlightedList = id;
}

function addListItemEvent(item) {
    item.addEventListener("click", () => {
        if (item.classList.contains("highlighted")) {
            item.classList.remove("highlighted");
            highlightedList = null;
        } else
            setHighlightedList(item.id);
    });
}

function addCaseButtons() {
    // Add event listener to each button, so we can click it
    document.querySelectorAll(".case").forEach((caseEl) => {
        caseEl.addEventListener("click", () => {
            const isChecked = caseEl.classList.contains("checked");
            let n = caseEl.id;
            if (isChecked)
                deselectOBL(n);
            else
                selectOBL(n);
            saveSelectedOBL();
        });
    });
}

function getNonSpe(spec) {
    // spec: "black tie/left N"
    // return: "tie/N"
    for (let nonSpec in OBLtranslation) {
        if (OBLtranslation[nonSpec].includes(spec) ||
            OBLtranslation[nonSpec].includes(spec.split("/")[1]+"/"+spec.split("/")[0]))
            return nonSpec;
    }
    throw Error("spec: "+spec+" not in OBLtranslation");
}

function getSpe(obl) {
    // obl in english
    // returns: an array of specific cases
    let ret = [];
    if (!obl in OBLtranslation) throw new Error("not in OBLtranslation: obl: "+obl);
    for (let spec of OBLtranslation[obl]) {
        ret.push(spec);
        let spec2 = spec.split("/")[1] + "/" + spec.split("/")[0];
        if (spec2 !== spec)
            ret.push(spec2)
    }
    return ret;
}

function getNonSpeList(l) {
    // l: a list of specific obls in english
    // returns: a list of non-specific obls in english
    let ret_repeats = [];
    for (let obl of l)
        ret_repeats.push(getNonSpe(obl));
    return [...new Set(ret_repeats)]; // dedupe the non-specific list that had repeats
}

function getSpeList(l) {
    // l: a list of non-specific obls in english
    // returns: a list of specific obls in english
    let ret = [];
    for (let obl of l)
        ret.push(...getSpe(obl));
    return ret;
}

async function init() {
    // Add buttons to the page for each OBL choice
    // Stored to a temp variable so we edit the page only once, and prevent a lag spike
    let buttons1 = "";
    let buttons2 = "";
    for (let obl of possibleOBL) {
        buttons1 += `
        <div class="case" id="${OBLname(obl)}">${OBLname(obl)}</div>`;
        for (let spec of getSpe(OBLname(obl))) {
            buttons2 += `
        <div class="case" id="${spec}">${spec}</div>`;
        }
    }
    buttons = [buttons1, buttons2];
    OBLListEl.innerHTML = buttons[usingSpe];

    lastRemoved = "";

    getLocalStorageData();
    addCaseButtons();

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
            for (let l in defaultLists)
                defaultLists[l] = [defaultLists[l], getSpeList(defaultLists[l])]
            addDefaultLists();
        })
        .catch((error) => console.error("Failed to fetch data:", error));

}

function checkFirstWord(word, g, filter, u, d) {
    if (g != word) return false;
    else {
        // if user only typed word:
        if (filter.length === 1 || filter[1] === "") 
            return true;
        else {
            a = filter[1]
            // only top case:
            if (filter.length === 2) {
                return u.startsWith(a) || d.startsWith(a);
            }
            else {
                b = filter[2]
                return (u === a && d.startsWith(b)) || (d === a && u.startsWith(b));
            }
        }
    }
}

function passesFilter(obl, filter) {
    // obl is the name of a .case element
    if (filter === "") return true;
    filter = filter.replace("/", " ").toLowerCase().split(" ");
    if (usingSpe) {
        // filter left/right
        obllst = obl.split("/");
        u = obllst[0];
        ulst = u.split(" ");
        d = obllst[1];
        dlst = d.split(" ");
        obl = obl.replaceAll("/", " ").split(" ")
        filter = filter.filter((i) => i !== "");
        switch (filter.length) {
            case 1:
                return obl.some((i) => i.startsWith(filter[0]));
            case 2:
                if (["left", "right"].includes(filter[0])) {
                    // "left knight"
                    return u.startsWith(filter.join(" ")) ||
                            d.startsWith(filter.join(" "));
                }
                else if ("left".startsWith(filter[1] || "right".startsWith(filter[1]))) {
                    // "gem left" or "knight left"
                    return (ulst.at(-1) === filter[0] && dlst[0].startsWith(filter[1])) ||
                            (dlst.at(-1) === filter[0] && ulst[0].startsWith(filter[1]));
                }
                else {
                    // "gem knight"
                    return (ulst.at(-1) === filter[0] && dlst.at(-1).startsWith(filter[1])) ||
                            (dlst.at(-1) === filter[0] && ulst.at(-1).startsWith(filter[1]));
                }
            case 3:
                if (["left", "right"].includes(filter[0])) {
                    // "left knight gem" or "left knight left"
                    return (u === filter[0]+" "+filter[1] && 
                            dlst.some((i) => i.startsWith(filter.at(-1)))) ||
                            (d === filter[0]+" "+filter[1] && 
                            ulst.some((i) => i.startsWith(filter.at(-1))));
                }
                else if (["left", "right"].includes(filter[1])) {
                    // "gem left knight" or "knight left knight"
                    return (ulst.at(-1) === filter[0] && d.startsWith(filter[1]+" "+filter[2])) ||
                            (dlst.at(-1) === filter[0] && u.startsWith(filter[1]+" "+filter[2]));
                }
                else {
                    // "left knight left" handled already; "left knight gem"
                    return (ulst.at(-1) === filter[2] && d.startsWith(filter[0]+" "+filter[1])) ||
                            (dlst.at(-1) === filter[2] && u.startsWith(filter[0]+" "+filter[1]))
                }
            case 4:
                // "left bunny right thumb"
                return (u === filter[0]+" "+filter[1] && d.startsWith(filter[2]+" "+filter[3])) ||
                        (d === filter[0]+" "+filter[1] && u.startsWith(filter[2]+" "+filter[3]));
            default:
                return false;
        }
    }
    else {
        // filter good/bad
        obl = obl.replaceAll("/", " ").split(" ");
        if (obl.length === 2) obl.unshift("");
        let g = obl[0];
        let u = obl[1].toLowerCase();
        let d = obl[2].toLowerCase();
        let result_from_good_bad, result_from_non_good_bad, a, b;
        if ("good".startsWith(filter[0])) {
            result_from_good_bad = checkFirstWord("good", g, filter, u, d);
        }
        if ("bad".startsWith(filter[0])) {
            result_from_good_bad = checkFirstWord("bad", g, filter, u, d);
        }
        if ("same".startsWith(filter[0])) {
            result_from_good_bad = checkFirstWord("same", g, filter, u, d);
        }
        if ("different".startsWith(filter[0])) {
            // make "different" count also
            if (g != "diff") return false;
            else {
                // if user typed "differ ":
                if (!(["diff", "different"].includes(filter[0])) && filter.length > 1) 
                    result_from_good_bad = false;
                // if user only typed "different", "diff":
                else if (filter.length === 1 || filter[1] === "")
                    result_from_good_bad = true;
                else {
                    a = filter[1]
                    // only top case:
                    if (filter.length === 2) {
                        result_from_good_bad = u.startsWith(a) || d.startsWith(a);
                    }
                    else {
                        b = filter[2]
                        result_from_good_bad = (u === a && d.startsWith(b)) || (d === a && u.startsWith(b));
                    }
                }
            }
        }
        // from here, filter's g = ""
        a = filter[0]
        // only top case:
        if (filter.length == 1 || filter[1] == "") {
            result_from_non_good_bad = u.startsWith(a) || d.startsWith(a);
        }
        else {
            b = filter[1]
            result_from_non_good_bad = (u == a && d.startsWith(b)) || 
                    (d == a && u.startsWith(b));
        }
        return result_from_good_bad || result_from_non_good_bad;
    }
}

function generateScramble(regen=false) {
    let eachCaseAlert = false;
    if (scrambleOffset >= 0 && !regen && scrambleList.length > 0 && selectedOBL[usingSpe].length !== 0) {
        // user probably timed one of the prev scrams
        displayPrevScram();
        let suffix = usingOBLP ? ` (${scrambleList.at(-1-scrambleOffset)[3]})` : "";
        currentScrambleEl.textContent =
            scrambleList.at(-1-scrambleOffset)[usingKarn] + suffix;
        return;
    }
    else if (scrambleOffset < 0) scrambleOffset = 0;
    if (selectedOBL[usingSpe].length === 0) {
        timerEl.textContent = "--:--";
        currentScrambleEl.textContent = "Scramble will show up here";
        previousScrambleEl.textContent = "Last scramble will show up here";
        hasActiveScramble = false;
        scrambleList = [];
        return;
    }
    if (remainingOBL[usingSpe].length === 0) {
        // start a new cycle
        if (eachCaseEl.checked) eachCaseAlert = true;
        enableGoEachCase();
    }
    let caseNum = randInt(0, remainingOBL[usingSpe].length - 1);
    let OBLChoice = remainingOBL[usingSpe].splice(caseNum, 1)[0]; // OBLChoice: "good knight/axe"

    currentCase = OBLChoice; // could be either good/bad or left/right
    OBLChoice = usingSpe ? OBLChoice : 
            OBLtranslation[OBLChoice][randInt(0, OBLtranslation[OBLChoice].length - 1)];
    let scramble = getScramble(OBLChoice); // getScramble() takes in specific case naming

    // Add random begin and end layer moves
    let s = scramble[0].at(0);
    let e = scramble[0].at(-1);
    let start;
    let end;
    if (s === "A") {
        start = [randrange(-5, 5, 3),randrange(-3, 7, 3)];
    } else {
        start = [randrange(-3, 7, 3),randrange(-4, 6, 3)];
    }
    if (e === "A") {
        end = [randrange(-4, 6, 3),randrange(-3, 7, 3)];
    } else {
        end = [randrange(-3, 7, 3),randrange(-5, 5, 3)];
    }

    let final = [
        (start.join(",") + 
            scramble[0].slice(1, -1) + 
            end.join(",")).replaceAll("/", " / "),
        start.join("") + 
            scramble[1].slice(1, -1) + 
            end.join(""),
        currentCase
    ];

    let cube = new window.cube();
    cube.doMoves(final[0]);
    let memo = cube.getMemo();
    final.push(memo);

    if (regen) {
        scrambleList[scrambleList.length-1] = final;
        // set current scram only if we are on the current scram
        if (scrambleOffset === 0) {
            let suffix = usingOBLP ? ` (${scrambleList.at(-1-scrambleOffset)[3]})` : "";
            currentScrambleEl.textContent = final[usingKarn] + suffix;
        }
    }
    else {
        if (scrambleList.length != 0) {
            previousScrambleEl.textContent = "Previous scramble: " + 
                scrambleList.at(-1)[usingKarn] + " (" +
                scrambleList.at(-1)[2] + ")";
        }
        let suffix = usingOBLP ? ` (${memo})` : ""
        currentScrambleEl.textContent = final[usingKarn] + suffix;
        scrambleList.push(final);
    }
    if (!hasActiveScramble) timerEl.textContent = "0.00"; // prob for first scram
    hasActiveScramble = true;
    if (eachCaseAlert)
        setTimeout(function() {alert("You have gone through each case!");}, 50);
}

function displayPrevScram() {
    if (scrambleList.at(-2-scrambleOffset) !== undefined) {
        // we have a prev scram to display
        previousScrambleEl.textContent = "Previous scramble: " + 
            scrambleList.at(-2-scrambleOffset)[usingKarn] + " (" +
            scrambleList.at(-2-scrambleOffset)[2] + ")";
    }
    else {
        previousScrambleEl.textContent = "Last scramble will show up here"
    }
}

function hideOBL(text) {
    document.getElementById(text).classList.add("hidden");
}

function showOBL(text) {
    document.getElementById(text).classList.remove("hidden");
}

function selectOBL(obl) {
    // obl is the id of the element, which is in english
    document.getElementById(obl).classList.add("checked");
    if (usingSpe) {
        if (!selectedOBL[1].includes(obl)) {
            selectedOBL[1].push(obl);
            updateSelCount();
        }
        if (eachCase > 0 && !remainingOBL[1].includes(obl)) {
            remainingOBL[1] = remainingOBL[1].concat(Array(eachCase).fill(obl));
        }
    }
    else {
        if (!selectedOBL[0].includes(obl)) {
            selectedOBL[0].push(obl);
            updateSelCount();
        }
        if (eachCase > 0 && !remainingOBL[0].includes(obl)) {
            remainingOBL[0] = remainingOBL[0].concat(Array(eachCase).fill(obl));
        }
    }
}

function deselectOBL(obl) {
    document.getElementById(obl).classList.remove("checked");
    if (usingSpe) {
        if (selectedOBL[1].includes(obl)) {
            selectedOBL[1] = selectedOBL[1].filter((a) => a != obl);
            updateSelCount();
        }
        if (eachCase > 0 && remainingOBL[1].includes(obl)) {
            remainingOBL[1] = remainingOBL[1].filter((a) => a != obl);
        }
    }
    else {
        if (selectedOBL[0].includes(obl)) {
            selectedOBL[0] = selectedOBL[0].filter((a) => a != obl);
            updateSelCount();
        }
        if (eachCase > 0 && remainingOBL[0].includes(obl)) {
            remainingOBL[0] = remainingOBL[0].filter((a) => a != obl);
        }
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

function resetTimer(hidden) {
    stopTimer();
    pressStartTime = null;
    holdTimeout = null;
    timerStart = null;
    intervalId = null;
    readyToStart = false;
    otherKeyPressed = 0;
    if (canInteractTimer() && !hidden) {
        timerEl.textContent = "0.00";
    }
    else if (!hidden) {
        timerEl.textContent = "--:--";
    }
    setColor("");
}

function timerBeginTouch(spaceEquivalent) {
    if (!hasActiveScramble) return;
    if (document.activeElement == filterInputEl) return;
    if (isRunning) {
        // Stop timer
        stopTimer();
        scrambleOffset--;
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
    for (let k of Object.keys(userLists)) {
        content += `
        <div id="${k}" class=\"list-item\">${k} (${
            userLists[k][usingSpe].length
        })</div>`;
    }
    userListsEl.innerHTML = content;
    for (let item of document.querySelectorAll("#userlists>.list-item")) {
        addListItemEvent(item);
    }
    saveUserLists();
}

function addDefaultLists() {
    let content = "";
    for (let k of Object.keys(defaultLists)) {
        content += `
        <div id="${k}" class=\"list-item\">${k} (${
            defaultLists[k][usingSpe].length
        })</div>`;
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
    let isDefault = Object.keys(defaultLists).includes(listName);
    if (isDefault) {
        list = defaultLists[listName];
    } else {
        list = userLists[listName];
    }

    hideAll();
    if (!Array.isArray(list)) location.reload(); // legacy handling
    for (let obl of list[usingSpe])
        showOBL(obl);
    if (setSelection) {
        deselectAll();
        selectThese();
    }

    selCountEl.textContent = setSelection ? "Selected list: "+listName :
                                            "Viewing list: "+listName;
    saveSelectedOBL();
    saveUserLists();
}

function validName(n) {
    for (let l of n) {
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

function openListPopup() {
    if (isPopupOpen === false) {
        isPopupOpen = true;
        listPopupEl.classList.add("open");
    }
}

function openHelpPopup() {
    if (isPopupOpen === false) {
        isPopupOpen = true;
        helpPopupEl.classList.add("open");
    }
}

function closePopup() {
    isPopupOpen = false;
    listPopupEl.classList.remove("open");
    helpPopupEl.classList.remove("open");
}

function canInteractTimer() {
    return (
        hasActiveScramble &&
        document.activeElement != filterInputEl &&
        !isPopupOpen
    );
}

function enableGoEachCase() {
    eachCase = eachCaseEl.checked ? 1 : randInt(MIN_EACHCASE, MAX_EACHCASE);
    remainingOBL[usingSpe] = selectedOBL[usingSpe].flatMap((el) => Array(eachCase).fill(el));
}

function filterInput() {
    filterInputEl.value = filterInputEl.value.replace(/[^a-zA-Z1-4/\- ]+/g, "");
    setHighlightedList(null);
    document.querySelectorAll(".case").forEach((caseEl) => {
        let obl = caseEl.id;
        if (passesFilter(obl, filterInputEl.value)) {
            showOBL(obl);
        } else {
            hideOBL(obl);
        }
    });
    updateSelCount();
}

filterInputEl.addEventListener("input", filterInput);

function selectAll() {
    if (usingTimer()) return;
    document.querySelectorAll(".case").forEach((caseEl) => {
        selectOBL(caseEl.id);
    });
    document.querySelectorAll(".case.hidden").forEach((caseEl) => {
        selectOBL(caseEl.id);
    });
    saveSelectedOBL();
}

selectAllEl.addEventListener("click", selectAll);

function deselectAll() {
    if (usingTimer()) return;
    document.querySelectorAll(".case").forEach((caseEl) => {
        deselectOBL(caseEl.id);
    });
    document.querySelectorAll(".case.hidden").forEach((caseEl) => {
        deselectOBL(caseEl.id);
    });
    saveSelectedOBL();
}

deselectAllEl.addEventListener("click", deselectAll);

function selectThese() {
    if (usingTimer()) return;
    for (let i of OBLListEl.children) {
        if (!i.classList.contains("hidden")) {
            selectOBL(i.id);
        }
    }
    saveSelectedOBL();
}

selectTheseEl.addEventListener("click", selectThese);

function deselectThese() {
    if (usingTimer()) return;
    for (let i of OBLListEl.children) {
        if (!i.classList.contains("hidden")) {
            deselectOBL(i.id);
        }
    }
    saveSelectedOBL();
}

deselectTheseEl.addEventListener("click", deselectThese);

function hideAll() {
    if (usingTimer()) return;
    for (let i of OBLListEl.children) {
        if (!i.classList.contains("hidden")) {
            hideOBL(i.id);
        }
    }
    updateSelCount();
}

function showAll() {
    if (usingTimer()) return;
    for (let i of OBLListEl.children) {
        if (i.classList.contains("hidden")) {
            showOBL(i.id);
        }
    }
    updateSelCount();
}

showAllEl.addEventListener("click", showAll);

function showSelection() {
    if (usingTimer()) return;
    for (let i of OBLListEl.children) {
        if (selectedOBL[usingSpe].includes(i.id)) {
            showOBL(i.id);
        }
        else hideOBL(i.id);
    }
    updateSelCount();
}

showSelectionEl.addEventListener("click", showSelection);

function prevScram() {
    if (usingTimer()) return;
    if (scrambleList.length == 0) return;
    scrambleOffset = Math.min(scrambleOffset + 1, scrambleList.length - 1);

    let suffix = usingOBLP ? ` (${scrambleList.at(-1-scrambleOffset)[3]})` : "";
    currentScrambleEl.textContent =
        scrambleList.at(-1-scrambleOffset)[usingKarn] + suffix;
    displayPrevScram()
}

prevScrambleButton.addEventListener("click", prevScram);

function nextScram() {
    if (usingTimer()) return;
    if (scrambleList.length == 0) return;
    scrambleOffset--;
    if (scrambleOffset < 0) {
        // scrambleOffset = 0;: this is already set in the function below
        generateScramble();
    } else {
        let suffix = usingOBLP ? ` (${scrambleList.at(-1-scrambleOffset)[3]})` : "";
        currentScrambleEl.textContent =
            scrambleList.at(-1-scrambleOffset)[usingKarn] + suffix;
        displayPrevScram()
    }
}

nextScrambleButton.addEventListener("click", nextScram);

openListsEl.addEventListener("click", () => {
    if (usingTimer()) return;
    openListPopup();
});

openHelpEl.addEventListener("click", () => {
    if (usingTimer()) return;
    openHelpPopup();
})

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
    // New way of creating a list
    let newList = [[], []];
    newList[usingSpe] = selectedOBL[usingSpe].copyWithin();
    if (usingSpe) newList[0] = getNonSpeList(newList[1]);
    else newList[1] = getSpeList(newList[0]);

    userLists[newListName] = newList;
    addUserLists();
    setHighlightedList(newListName);
});

overwriteListEl.addEventListener("click", () => {
    if (usingTimer()) return;
    if (highlightedList == null) {
        alert("Please click on a list");
        return;
    }
    else if (Object.keys(defaultLists).includes(highlightedList)) {
        alert("You cannot overwrite a default list")
        return;
    }
    if (selectedOBL.length == 0) {
        alert("Please select OBLs to create a list!");
        return;
    }

    // valid request
    if (confirm("You are about to overwrite list " + highlightedList)) {
        // New way of creating a list
        let newList = [[], []];
        newList[usingSpe] = selectedOBL[usingSpe].copyWithin();
        if (usingSpe) newList[0] = getNonSpeList(newList[1]);
        else newList[1] = getSpeList(newList[0]);
        
        userLists[highlightedList] = newList;
        addUserLists();
        selectList(highlightedList, true);
        highlightedList = null;
        closePopup();
    }
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
        alert("You cannot overwrite a default list")
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

function isMac() {
  if (navigator.userAgentData) {
    // Newer, privacy-preserving API
    return navigator.userAgentData.platform === "macOS";
  }
  // Fallback for older browsers
  return navigator.userAgent.toUpperCase().includes("MAC");
}

window.addEventListener("keydown", (e) => {
    const inInput = document.activeElement === filterInputEl;
    if (e.code == "Escape") {
        if (isPopupOpen) {
            closePopup();
        }
        if (usingTimer()) {
            resetTimer(false);
        }
        if (inInput) filterInputEl.blur();
        return;
    }

    // space (start timer)
    if (canInteractTimer()) {
        let isSpace = e.code == "Space";
        let runningTemp = isRunning;
        timerBeginTouch(isSpace);
        if (isSpace) e.preventDefault();
        if (runningTemp) return;
    }

    // ctrl F (search cases); ctrl Z (undo remove last); ctrl Y (redo remove last)
    const ctrl = isMac() ? e.metaKey : e.ctrlKey;
    if (ctrl && !e.altKey) {
        if (e.shiftKey) {
            // ctrl + shift +
            switch (e.key.toLowerCase()) {
                case "a":
                    e.preventDefault();
                    deselectAll();
                    return;
                case "s":
                    e.preventDefault();
                    deselectThese();
                    return;
            }
        }
        else {
            // ctrl + 
            switch (e.key.toLowerCase()) {
                case "a":
                    if (!inInput) {
                        e.preventDefault();
                        selectAll();
                    }
                    return;
                case "s":
                    e.preventDefault();
                    selectThese();
                    return;

                case "f":
                    e.preventDefault(); // stop the browser’s find box
                    filterInputEl.focus();
                    return;
                case "z":
                    e.preventDefault();
                    selectOBL(lastRemoved);
                    saveSelectedOBL();
                    return;
                case "y":
                    e.preventDefault();
                    deselectOBL(lastRemoved);
                    saveSelectedOBL();
                    return;
            }
        }
    }
    else if (!ctrl && e.altKey && !e.shiftKey) {
        // alt + 
        switch (e.key.toLowerCase()) {
            case "a":
                e.preventDefault();
                showAll();
                return;
            case "s":
                e.preventDefault();
                showSelection();
                return;
        }
    }

    // backspace (remove last); left arrow (prev scram); right arrow (next scram)
    if (!inInput && !ctrl && !e.altKey && !e.shiftKey) {
        switch (e.key.toLowerCase()) {
            case "backspace":
                e.preventDefault();
                removeLast();
                return;
            case "arrowleft":
                e.preventDefault();
                prevScram();
                return;
            case "arrowright":
                e.preventDefault();
                nextScram();
                return;
            case "e":
                e.preventDefault();
                eachCaseEl.click();
                return;
            case "k":
                e.preventDefault();
                karnEl.click();
                return;
            case "s":
                e.preventDefault();
                speEl.click();
                return;
            case "p":
                e.preventDefault();
                OBLPEl.click();
                return;
        }
    }
});

window.addEventListener("keyup", (e) => {
    if (!canInteractTimer()) return;
    let isSpace = e.code == "Space";
    timerEndTouch(isSpace);
    if (isSpace) e.preventDefault();
});

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState == "hidden") {
        resetTimer(true);
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
    } // TODO defaultlists
});

downloadEl.addEventListener("click", () => {
    if (usingTimer()) return;
    const data = JSON.stringify({
        'settingsOBL': storage.getItem('settings'),
        'selectedOBL': storage.getItem('selected'),
        'userListsOBL': storage.getItem('userLists')
    });
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
            deselectAll();
            jsonData = JSON.parse(reader.result);
            storage.setItem("selected", jsonData["selectedPBL"]);
            
            let outdated = false;
            if ("userListsOBL" in jsonData) storage.setItem("userLists", jsonData["userListsOBL"]);
            else if ("userLists" in jsonData) {
                storage.setItem("userLists", jsonData["userLists"]);
                outdated = true;
            }
            if ("settingsOBL" in jsonData) storage.setItem("settings", jsonData["settingsOBL"]);
            else if ("settings" in jsonData) {
                storage.setItem("settings", jsonData["settings"]);
                outdated = true;
            }
            if (outdated) {
                alert("File formatting is outdated, re-export recommended.");
            }
            getLocalStorageData();
        } catch (e) {
            console.error("Error:", e);
        } finally {
            // Clear the file input so the same file can be selected again
            e.target.value = '';
        }
    };
    reader.readAsText(file);
});

eachCaseEl.addEventListener("change", (e) => {
    enableGoEachCase();
    saveSettings();
});

function removeLast() {
    if (scrambleList.at(-2-scrambleOffset) !== undefined) {
        deselectOBL(scrambleList.at(-2-scrambleOffset)[2])
        lastRemoved = scrambleList.at(-2-scrambleOffset)[2];
        saveSelectedOBL();
    }
}

removeLastEl.addEventListener("click", removeLast)

karnEl.addEventListener("change", (e) => {
    usingKarn ^= 1; // switches between 0 and 1 with XOR
    if (hasActiveScramble) {
        let suffix = usingOBLP ? ` (${scrambleList.at(-1-scrambleOffset)[3]})` : "";
        currentScrambleEl.textContent =
            scrambleList.at(-1-scrambleOffset)[usingKarn] + suffix;
    };
    displayPrevScram();
    saveSettings();
});

speEl.addEventListener("change", (e) => {
    usingSpe ^= 1; // switches between 0 and 1 with XOR
    if (usingSpe) {
        // good/bad → left/right
        OBLListEl.innerHTML = buttons[usingSpe];
        filterInputEl.setAttribute("maxlength", 25);
        selectedOBL[1] = [];
        for (let nonspe of selectedOBL[0]) {
            for (let spe of getSpe(nonspe)){
                selectedOBL[1].push(spe);
                selectOBL(spe);
            }
        }
        filterInput();
        enableGoEachCase();
    }
    else {
        // left/right → good/bad
        OBLListEl.innerHTML = buttons[usingSpe];
        filterInputEl.setAttribute("maxlength", 18);
        selectedOBL[0] = [];
        for (let spe of selectedOBL[1]) {
            if (!selectedOBL[0].includes(getNonSpe(spe))) {
                selectedOBL[0].push(getNonSpe(spe));
                selectOBL(getNonSpe(spe));
            }
        }
        filterInput();
        enableGoEachCase();
    }
    addCaseButtons();
    addDefaultLists();
    addUserLists();
    updateSelCount();
    saveSettings();
});

OBLPEl.addEventListener("change", (e) => {
    usingOBLP = !usingOBLP;
    if (scrambleList.length !== 0) {
        let suffix = usingOBLP ? ` (${scrambleList.at(-1-scrambleOffset)[3]})` : "";
        currentScrambleEl.textContent =
            scrambleList.at(-1-scrambleOffset)[usingKarn] + suffix;
    }
    saveSettings();
})

// Enable crosses
for (let cross of document.querySelectorAll(".cross")) {
    cross.addEventListener("click", () => closePopup());
}

init();
