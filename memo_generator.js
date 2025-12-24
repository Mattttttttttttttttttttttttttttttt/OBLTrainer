// this module generates the memo from a scramble

class OBLCube {
    constructor(u, d) {
        // u, d: cw from the top left for both
        this.u = u !== undefined ? u : "BBbBBbBBbBBb";
        this.d = d !== undefined ? d : "wWWwWWwWWwWW";
        this.state = this.u + this.d
    }

    twist() {
        this.state = this.state.slice(0, 3) + 
                     this.state.slice(15, 21) + // bottom sliced up
                     this.state.slice(9, 12) +
                     this.state.slice(12, 15) + 
                     this.state.slice(3, 9) +
                     this.state.slice(21, 24);
        this.u = this.state.slice(0, 12);
        this.d = this.state.slice(12, 24);
    }

    move(u, d) {
        u = (u % 12 + 12) % 12;
        d = (d % 12 + 12) % 12;
        this.u = this.u.slice(-1 * u) + this.u.slice(0, -1 * u);
        this.d = this.d.slice(-1 * d) + this.d.slice(0, -1 * d);
        this.state = this.u + this.d;
    }

    doMoves(moves) {
        moves = moves.replaceAll(" ", "");
        for (let m of moves.split("/")) {
            let ms = m.split(",")
            this.move(parseInt(ms[0], 10), parseInt(ms[1], 10));
            this.twist();
        }
        this.twist();
    } 

    getMemo(inverse) {
        // inverse? : x2 invariance
        inverse = inverse !== undefined ? inverse : Math.random() < 0.5;
        let misalignedD = this.d.slice(1) + this.d.slice(0, 1); // this.d is edge first, not good
        let memoArr = inverse ? [this.u, misalignedD] : [misalignedD, this.u];
        let memo = "";
        let memoLetter = "b";
        for (let layer of memoArr) {
            let memoIndex = 0;
            for (let index = 0; index < 12; index++) {
                if (index === 0 || layer.charAt(index) !== layer.charAt(index-1)) {
                    memoIndex++;
                    if (layer.charAt(index).toLowerCase() === memoLetter) memo += String(memoIndex);
                }
            }
            memoLetter = memo.length >= 4 ? "b" : "w";
            memo += " ";
        }
        memo = memo.trim();
        return inverse ? memo + " w/ x2" : memo;
    }

    toString() {
        return this.state;
    }
}

if (window !== undefined) window.cube = OBLCube;