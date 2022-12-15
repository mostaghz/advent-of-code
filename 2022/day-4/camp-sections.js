// puzzle input
// use when testing in the browser... sampleInput on 18 is now puzzleInput
const summonPuzzleInput = async (day) => {
    let response = await fetch("https://adventofcode.com/2022/day/4/input");
    let responseText = await response.text();
    return responseText.trim();
};

let puzzleInput = await summonPuzzleInput();

let sampleInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

let ranges = puzzleInput.split("\n");

// find coordinates of each range
let samplePair = '2-4,6-8';

let parseRangePair = (rangePair) => {
    let [start1, end1, start2, end2] = rangePair
        .match(/(\d+)-(\d+),(\d+)-(\d+)/)
        .slice(1)
        .map(Number);
    return [start1, end1, start2, end2];
};

// count how many pairs have one range fully contained within the other
let checkContaining = ([start1, end1, start2, end2]) =>
    (start1 >= start2 && end1 <= end2) || (start1 <= start2 && end1 >= end2);

let coordinates = ranges.map(parseRangePair);
// predicate... returning a boolean. results that are true will be included; falses are removed
let containing = coordinates.filter(checkContaining);
let containingCount = containing.length;

console.log(containingCount)

// part 1 outputs 441