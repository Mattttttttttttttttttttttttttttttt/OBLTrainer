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
const OBL = {"BBwWWwWWwWWw": "1c", // CHANGED
       "BBwBBwWWwWWw": "cadj",
       "BBwWWwBBwWWw": "copp",
       "BBwBBwBBwWWw": "3c",
       "BBwBBwBBwBBw": "4e",
       "WWbWWbWWbWWw": "3e",
       "WWbWWwWWbWWw": "line",
       "WWbWWbWWwWWw": "L",
       "WWbWWwWWwWWw": "1e",
       "WWbBBwWWwWWw": "left pair",
       "BBbWWwWWwWWw": "right pair",
       "BBwWWwWWbWWw": "left arrow",
       "BBwWWbWWwWWw": "right arrow",
       "WWbBBbWWwWWw": "gem",
       "WWwWWbWWbBBw": "left knight",
       "BBbWWbWWwWWw": "right knight",
       "WWwWWbWWwBBb": "left axe",
       "BBwWWbWWwWWb": "right axe",
       "BBwWWbWWbWWw": "squid",
       "WWwWWbBBbWWb": "left thumb",
       "WWbBBbWWwWWb": "right thumb",
       "WWwBBbWWbWWb": "left bunny",
       "WWbWWbBBwWWb": "right bunny",
       "BBbBBwWWwWWw": "shell",
       "BBwWWwWWbBBw": "left bird",
       "BBwBBbWWwWWw": "right bird",
       "BBwWWbWWwBBw": "hazard",
       "BBbBBbWWwWWw": "left kite",
       "WWwWWbBBbBBw": "right kite",
       "BBwBBwWWbWWb": "left cut",
       "BBwBBbWWbWWw": "right cut",
       "BBbBBwWWbWWw": "black T",
       "WWwWWbBBwBBb": "white T",
       "WWbBBwWWbBBw": "left N",
       "WWwBBbWWwBBb": "right N",
       "WWbBBbWWwBBw": "black tie",
       "BBwWWwBBbWWb": "white tie",
       "BBbWWwBBwWWw": "left yoshi",
       "WWwBBwWWbBBw": "right yoshi"
}

const OToP = {// CHANGED
    "A": "B",
    "B": "B",
    "C": "B",
    "D": "B",
    "1": "b",
    "2": "b",
    "3": "b",
    "4": "b",
    "E": "W",
    "F": "W",
    "G": "W",
    "H": "W",
    "5": "w",
    "6": "w",
    "7": "w",
    "8": "w"
}

const PBL={
    "Al": ["CC1BB2DD3AA4", "HH5FF6EE7GG8"],
    "Ar": ["DD1BB2AA3CC4", "GG5FF6HH7EE8"]
} // TODO: ADD IN STATES OF EVERY PBL; need both U and D

// format is 16-character string, both corner first
const CUBEL = 24;
const HALF_L = 6;
const LAYERL = 12;
const THREE_FOUR_L = 18;
const SLICE_a = "FF6GG7DD4AA1BB2CC3HH8EE5";
const SLICE_a_OBL = "WWwWWwBBbBBbBBbBBbWWwWWw";
const SLICE_A = "5FF6GG3DD4AA1BB2CC7HH8EE";
const SLICE_A_OBL = "wWWwWWbBBbBBbBBbBBwWWwWW";

const KARN = {
    " 3,0 ": " U ",
    " -3,0 ": " U' ",
    " 0,3 ": " D ",
    " 0,-3 ": " D' ",
    " 3,3 ": " e ",
    " 2,-1 ": " u ",
    " -1,2 ": " d ",
    " -4,-1 ": " F' ",
    " -1,-4 ": " f' ",
    " 2,-4 ": " T ",
    " 2,2 ": " m ",
    " -1,-1 ": " M' ",
    " 5,-1 ": " u2 ",
    " -2,1 ": " u' ",
    " 1,-2 ": " d' ",
    " 4,1 ": " F ",
    " 1,4 ": " f ",
    " -2,4 ": " T' ",
    " -2,-2 ": " m' ",
    " 1,1 ": " M ",
    " -5,1 ": " u2' "
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
    " 36 ": " UD2",
    " -36 ": " U'D2"
};
// if the following moves accur, replace them with optimized ones
// UPDATE THIS
const OPTIM = {
    // longest first
    "/3,3/3,3/": "-3,-3/-3,-3",
    "/-3,-3/-3,-3/": "3,3/3,3",
    "/2,2/-2,-2/": "2,2/-2,-2",
    "/-2,-2/2,2/": "-2,-2/2,2",
    "/1,1/-1,-1/": "1,1/-1,-1",
    "/-1,-1/1,1/": "-1,-1/1,1"
}

const OPTIM_KEYS = Array.from(Object.keys(OPTIM)); // array of keys

function Dmisa(a) {
    // turns 12-char string w/ BbWw, in cs to bottom misalign, aka corner first 
    return a.charAt(0).toUpperCase() !== a.charAt(0) ? shift(a,-1) : a;
}

function isOBL(layer, target) {
    // layer: 12-char string w/ BbWw, in cs
    // target: NOT NECESSARILY a key of OBL dict; CHANGED
    // return: bool
    // if it's top misalign, change to bottom misalign
    let obl;
    layer = Dmisa(layer);
    target = Dmisa(target);
    for (let move = 0; move <= 3; move++) {
        if (target === shift(layer, 3*move)) return true;
    }
    layer = layer_flip(layer);
    for (let move = 0; move <= 3; move++) {
        if (shift(layer, 3*move) in Object.keys(OBL)) obl = OBL[shift(layer, 3*move)]; // CHANGED
    }
    for (let move = 0; move <= 3; move++) {
        if (target === shift(layer, 3*move)){
            // T and tie colors are specified 
            if (obl !== undefined) {
                return obl.split(" ").at(-1) !== "T" && obl.split(" ").at(-1) !== "tie";
            }
            else return true;
        }
    }
    return false;
}

function isPBL(layer, target){
    // layer (str): 12-char string with A1B2, in cs
    // target (str): 12-char string with A1B2 of the PBL
    // returns: bool: the verdict
    // if it's top misalign, change to bottom misalign
    if (/\d/.test(layer.charAt(0))) {
        layer = shift(layer, -1);
    }
    for (let i = 0; i < 4; i++) {
        layer = PBL_shift(layer);
        for (let m = 0; m < 4; m++) {
            if (target === shift(layer, 3 * m)) {
                return true;
            }
        }
    }
    return false;
}

function PBL_shift(a){
    // a (str): the PBL layer
    // returns: str: shifted PBL layer
    let ret = [];
    for (const char of a) {
        if (/\d/.test(char)) {
            ret.push(String(PBL_mini_shift(parseInt(char, 10))));
        } else {
            // map A..H -> 1..8, apply PBL_mini_shift, map back to A..H
            const idx = char.charCodeAt(0) - "A".charCodeAt(0) + 1;
            const newCharCode = PBL_mini_shift(idx) - 1 + "A".charCodeAt(0);
            ret.push(String.fromCharCode(newCharCode));
        }
    }
    return ret.join("");
}

function PBL_mini_shift(n){
    // n (int): 1-8 number
    // ValueError: if n not in 1-8
    // returns: int: mapped int
    if (1 <= n && n <= 4)
        return (n % 4) + 1;
    else if (5 <= n && n <= 8)
        return ((n - 4) % 4) + 5;
    else
        throw Error("Input must be in the range 1 to 8")
}

function PBLToOBL(state) {
    // state: e.g. "AA3DD6HH2EE1"
    // returns: e.g. "BBbBBwWWbWWb"
    return replaceWithDict(state, OToP);
}

function toD(layer) {
    // layer: e.g. "AA3DD4CC2BB1"
    // returns: e.g. "EE7HH8GG6FF2"
    let ret = [];
    for (const char of layer) {
        if (/\d/.test(char)) {
            ret.push(String(parseInt(char, 10) + 4));
        } else {
            ret.push(String.fromCharCode(char.charCodeAt(0) + 4));
        }
    }
    return ret.join("");
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
    // move in int, returns boolean
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
    // returns: (int) -5 ~ 6
    if (move < -5) {
        return move + 12;
    }
    else if (move > 6) {
        return move - 12;
    }
    return move;
}

function addMoves(move1, move2) {
    // move1/2: "3,-3"
    move1 = move1.split(",");
    move2 = move2.split(",");
    result = [legalMove(parseInt(move1[0],10) + parseInt(move2[0],10)),
                legalMove(parseInt(move1[1],10) + parseInt(move2[1],10))];
    return result.join(",");
}

function optimize(scramble) {
    // scramble: "A/-3,-3/0,3/0,-3/-1,-4/-3,0/3,0/0,-3/0,3/a"
    while (replaceWithDict(scramble, OPTIM) !== scramble) {
        //optimize needed
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
                if (scramble.length - 1- i < optimable.length) continue;
                if (scramble.slice(i, i+optimable.length) === optimable) {
                    // match!!
                    let optimableSlice = optimable.split("/");
                    let optimTo = OPTIM[optimable].split("/"); // no slice at beginning/end
                    let delSliceNum = optimableSlice.length - optimTo.length;
                    if (atSlice === 1) {
                        // we at the beginning; not at the end
                        if (changesAlignment(optimTo.shift().split(",")[0])) {
                            moves[0] = moves[0] === "a" ? "A" : "a";
                        }
                        // else no change
                        // now we add the end move to the next move
                        moves[atSlice+optimableSlice.length-2] = addMoves(moves[atSlice+optimableSlice.length-2], optimTo.pop());
                    }
                    else if (atSlice + optimableSlice.length -1 === moves.length) {
                        // -1 cuz it starts&ends with slice
                        // we at the end; not at the beginning
                        if (changesAlignment(optimTo.pop().split(",")[0])) {
                            moves.push(moves.pop() === "a" ? "A" : "a");
                        }
                        // else no change
                        // now we add the first move to the previous move
                        moves[atSlice-1] = addMoves(moves[atSlice-1], optimTo.shift());
                    }
                    else {
                        moves[atSlice-1] = addMoves(moves[atSlice-1], optimTo.shift());
                        moves[atSlice+optimableSlice.length-2] = addMoves(moves[atSlice+optimableSlice.length-2], optimTo.pop());
                    }
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

function getOBLSol(obl, s) {
    // obl: e.g. "BBbBBwWWwWWwBBwWWbWWwBBw" (shell/hazard)
    // return: e.g. "0,-3/0,3/-3,0/3,0/1,4/0,3/0,-3/3,3/A"
    let moves = "";
    let abf;
    let topA; // bool: top misalign?
    let [u, d] = [obl.slice(0,LAYERL), obl.slice(LAYERL)];
    let state;
    while (true) {
        if (Math.random() < 0.5) {
            // A start
            moves += "A/";
            topA = true;
            state = SLICE_A_OBL;
        }
        else {
            // a start
            moves += "a/";
            topA = false;
            state = SLICE_a_OBL;
        }
        // first 5 slices
        for (let i = 2; i < s+1; i++) {
            abf = topA ? randAMove() : randaMove();
            state = slice(move(state, abf[0], abf[1]));
            moves += `${abf[0]},${abf[1]}/`
            if (changesAlignment(abf[0])) topA = !topA;
            if ((isOBL(state.slice(0,LAYERL), u) &&
                isOBL(state.slice(LAYERL), d))) {
                temp = getABF(state, u, d)
                moves += temp[0];
                return inv(moves, temp[1]);
            }
        }
        moves = "";
    }
}

function inv(moves, l_f) {
    // moves: e.g. "A/-3,-3/0,3/0,-3/-1,-4/-3,0/3,0/0,-3/0,3"
    // return: e.g. "0,-3/0,3/-3,0/3,0/1,4/0,3/0,-3/3,3/A"
    moves = moves.split("/");
    l_f = l_f ? 6 : 0;
    let ret = [];
    m = moves.at(-1).split(",");
    ret.push(legalMove(l_f+(-1)*parseInt(m[0], 10)).toString()+","+
            legalMove(l_f+(-1)*parseInt(m[1], 10)).toString());
    for (let i = moves.length-2; i > 0; i--) {
        m = moves[i].split(",");
        ret.push((-1*parseInt(m[0], 10)).toString()+","+
                (-1*parseInt(m[1], 10)).toString());
    }
    ret.push(moves[0]);
    return ret.join("/")
}

function getScramble(pbl, bf) {
    // pbl: e.g. "Pl/Ba"
    // bf: "+" or "-"
    // return: e.g. ["A/-3,-3/0,3/0,-3/-1,-4/-3,0/3,0/0,-3/0,3/a", in karn]
    let moves = "";
    let abf;
    let topA; // bool: top misalign?
    let [u, d] = pbl.split("/");
    u = PBL[u][0];
    d = PBL[d][1];
    let state;
    let s = bf === "+" ? 7 : 6;
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
        // first 6 slices
        for (let i = 2; i < 7; i++) {
            abf = topA ? randAMove() : randaMove();
            state = slice(move(state, abf[0], abf[1]));
            moves += `${abf[0]},${abf[1]}/`
            if (changesAlignment(abf[0])) topA = !topA;
        }
        let oblSol = getOBLSol(PBLToOBL(state), s)
        state = doMoves(state, oblSol)
        // if (isPBL(state.slice(0,LAYERL), u)) console.log("u layer matched "+state.slice(LAYERL));
        // if (isPBL(state.slice(LAYERL), d)) console.log("d layer matched");
        if (isPBL(state.slice(0,LAYERL), u) &&
            isPBL(state.slice(LAYERL), d)) {
            moves += oblSol;
            moves = optimize(moves);
            return [moves, karnify(moves)];
        }
        moves = "";
    }
}

function doMoves(state, m) {
    // state: "5FF6GG3DD4AA1BB2CC7HH8EE"
    // m: "0,-3/0,3/-3,0/3,0/1,4/0,3/0,-3/3,3/A"
    m = m.split("/");
    for (let i = 0; i < m.length - 1; i++) {
        m[i] = m[i].split(",");
        m[i] = [parseInt(m[i][0], 10), parseInt(m[i][1], 10)]
        state = slice(move(state, m[i][0], m[i][1]));
    }
    return state;
}

function getABF(state, u, d) {
    // state: e.g. "BBbBBwWWwWWwBBwWWbWWwBBw" (shell/hazard)
    // u: the U state from PBL random walk
    // d: the U state from PBL random walk
    // return: ["4,-2", true]
    let um, dm = 0;
    [um, l_f] = getAUF(state.slice(0,LAYERL), u);
    [dm, l_f] = getAUF(state.slice(LAYERL), d);
    return [um+","+dm, l_f]
}

function getAUF(layer, target) {
    // what move from layer to target
    // return: [int, whether its layer flip]
    let ret = 0;
    let lower = (a) => a.charAt(0).toUpperCase() !== a.charAt(0);
    if (lower(layer) && !lower(target)) {
        layer = shift(layer,-1);
        ret += -1;
    }
    else if (!lower(layer) && lower(target)) {
        layer = shift(layer,1);
        ret += 1;
    }
    layer2 = layer_flip(layer);
    for (let move = 0; move <= 3; move++) {
        if (target === shift(layer, 3*move) ||
            target === shift(layer2, 3*move)) return [legalMove(3*move+ret).toString(),
                                                    target === shift(layer2, 3*move)];
    }
    throw Error("layer: "+layer+" and target: "+target+"is not the same shape")
}

console.log(getScramble("Al/Ar", "+"))
// console.log(getOBLSol("bBBwWWbWWbBBwWWwBBwBBbWW", 7))
// console.log(isPBL("EE5GG6HH7FF8", "GG5FF6HH7EE8"))

