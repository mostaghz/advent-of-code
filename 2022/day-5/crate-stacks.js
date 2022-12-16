// puzzle input
// use when testing in the browser... sampleInput on 21 is now puzzleInput
const summonPuzzleInput = async (day) => {
    let response = await fetch("https://adventofcode.com/2022/day/5/input");
    let responseText = await response.text();
    return responseText.slice(0, -1);
};

let puzzleInput = await summonPuzzleInput();

let sampleInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

let [stackPart, instructionsPart] = puzzleInput.split("\n\n");

// represent stacks as an array of strings
let stackRows = stackPart.split("\n").slice(0, -1);
let stackMatrix = stackRows.map((row) =>
    [...row].filter((_, i) => i % 4 === 1)
);

let howManyStacks = stackMatrix[0].length;

let initialStacks = stackMatrix.reduce(
    (arr, row) =>
        row.reduce(
            (arr, char, j) =>
                char === " " ? arr : arr.map((str, k) => (j === k ? str + char : str)),
            arr
        ),
    Array(howManyStacks).fill("")
);

// write function for moving crates
let reverse = (str) => [...str].reverse().join("");

let moveCrates = (stacks, amount, from, to) =>
    stacks.map((stack, i) =>
    i === from - 1
        ? stack.slice(amount)
        : i === to - 1
        ? reverse(stacks[from - 1].slice(0, amount)) + stack
        : stack
    );

let multiMoveCrates = (stacks, amount, from, to) =>
    stacks.map((stack, i) =>
        i === from - 1
            ? stack.slice(amount)
            : i === to - 1
                ? stacks[from - 1].slice(0, amount) + stack
                : stack
    );

// parse list of instructions and execute them
let convertInstruction = (instructionStr) => {
    let [amount, from, to] = instructionStr
        .match(/move (\d+) from (\d+) to (\d+)/)
        .slice(1)
        .map(Number);
    return [amount, from, to];
};

let instructions = instructionsPart.split("\n").map(convertInstruction);

// PART 1
let finalStacks = instructions.reduce(
    (stacks, [amount, from, to]) => moveCrates(stacks, amount, from, to),
    initialStacks
);

let stackTops = finalStacks.map((stack) => stack[0]).join("");

// PART 2 (literally the same as part one just without the reverse from 49)
let finalStacks2 = instructions.reduce(
    (stacks, [amount, from, to]) => multiMoveCrates(stacks, amount, from, to),
    initialStacks
);

let stackTops2 = finalStacks2.map((stack) => stack[0]).join("");

console.log(stackTops2)

// part 1 outputs TLFGBZHCN
// part 2 outputs QRQFHFWCL