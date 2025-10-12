"""generates random obl states for an obl and then inverts solutions"""
import random
import pyperclip

OBL = {"1c": "bwwwwwww",
       "cadj": "bwbwwwww",
       "copp": "bwwwbwww",
       "3c": "bwbwbwww",
       "4e": "bwbwbwbw",
       "3e": "wbwbwbww",
       "line": "wbwwwbww",
       "L": "wbwbwwww",
       "1e": "wbwwwwww",

       "left pair": "wbbwwwww",
       "right pair": "bbwwwwww",
       "left arrow": "bwwwwwbw",
       "right arrow": "bwwbwwww",
       "gem": "bbbwwwww",
       "left knight": "wwwbwbbw",
       "right knight": "bbwbwwww",
       "left axe": "wwwbwwbb",
       "right axe": "bwwbwwwb",
       "squid": "bwwbwbww",
       "left thumb": "wwwbbbwb",
       "right thumb": "wbbbwwwb",
       "left bunny": "wwbbwbwb",
       "right bunny": "wbwbbwwb",

       "shell": "bbbwwwww",
       "left bird": "bwwwwbbw",
       "right bird": "bwbbwwww",
       "hazard": "bwwbwwbw",
       "left kite": "bbbbwwww",
       "right kite": "wwwbbbbw",
       "left cut": "bwbwwbwb",
       "right cut": "bwbbwbww",
       "T": "bbbwwbww",
       "left N": "wbbwwbbw",
       "right N": "wwbbwwbb",
       "tie": "wbbbwwbw",
       "lefty yoshi": "bbwwbwww",
       "righty yoshi": "wwbwwbbw"}

def layer_flip(state: str) -> str:
    """flips "w" to "b" and vice versa in the given state

    Args:
        state (str): the state (e.g. "bbbbwwww")
        
    Returns:
        str: the flipped state (e.g. "wwwwbbbb")
    """
    return ''.join('w' if c == 'b' else 'b' for c in state)

def rand_postabf(state: str) -> str:
    """generates a random postabf for the given OBL state

    Args:
        state (str): the given state (e.g. "A1B2E5F6")
        
    Returns:
        str: a random postabf state (e.g. "6A1B2E5F")
    """
    offset_top = random.randint(0, 3)
    offset_bottom = random.randint(0, 3)
    # only does 3 moves
    return (shift(state[:8], 2*offset_top) + shift(state[8:], 2*offset_bottom))

def shift(string: str, n: int) -> str:
    """shifts a string by n characters

    Args:
        string (str): the string to be shifted (e.g. "ABCDEFGH")
        n (int): the number of characters to shift by (e.g. 3)
    
    Returns:
        str: the shifted string (e.g. "DEFGHABC")
    """
    return string[n:] + string[:n]

def random_seq_corner() -> dict:
    """generates a random sequence of corner states

    Returns:
        dict: a random sequence of corner states (e.g. "BFEDACGH")
    """
    return {"b": random.sample(["A", "B", "C", "D"], k=4),
            "w": random.sample(["E", "F", "G", "H"], k=4)}

def random_seq_edge() -> dict:
    """generates a random sequence of edge states

    Returns:
        dict: a random sequence of corner states (e.g. "16547328")
    """
    return {"b": random.sample(["1", "2", "3", "4"], k=4),
            "w": random.sample(["5", "6", "7", "8"], k=4)}

def generate(iterations: int) -> list:
    """prints the obl states with sq1optim command

    Args:
        iterations (int): how many times to generate
        
    Returns:
        list: the list of generated states
    """
    return_val = []
    for i in range(iterations):
        corner_seq = random_seq_corner()
        edge_seq = random_seq_edge()
        state = ""
        # decides if color flip
        if random.randint(0, 1) == 0:
            state += layer_flip(OBL[obl_case[0]]) + OBL[obl_case[1]]
        else:
            state += OBL[obl_case[0]] + layer_flip(OBL[obl_case[1]])

        randomized = ""
        for j in range(8):
            # pop the first item in the randomized corner and edge sequences
            randomized += corner_seq[state[2*j]].pop(0)
            randomized += edge_seq[state[2*j+1]].pop(0)

        # shift bottom by one cuz its corner first rn
        state = randomized[:8] + randomized[9:] + randomized[8]
        state = "SQUARE1 " + rand_postabf(state)
        return_val.append(state)
        print(state)
    return return_val

def inverse_solution(states: list) -> int:
    """inverts the sq1optim solutions
    
    Args:
        states (list): the states to be copied
    
    Returns: how many times we need to regenerate"""
    return_val = 0 # see above
    for i in range(iterations):
        pyperclip.copy(states[i])
        sol = input()
        if sol == "":
            return_val += 1
            continue
        sol = sol.replace(" ", "").split("/") # e.g. ["(1,0)", "(0,-1)"]
        sol.reverse()
        inverted_sol = []
        for j, move in enumerate(sol):
            move = move[1:-1] # remove parentheses
            top, bottom = move.split(",")
            top = -1*int(top)
            bottom = -1*int(bottom)
            inverted_sol.append(f"{top},{bottom}")
        inverse_sols.append("/".join(inverted_sol))
    return return_val

inverse_sols = []
obl_case = input("obl case (e.g. left knight/gem): ").split("/")
iterations: int = int(input("number of random states to generate: "))
while iterations != 0:
    iterations = inverse_solution(generate(iterations))
print("[\"" + "\",\n\"".join(inverse_sols) + "\"]") # formatted for pasting
