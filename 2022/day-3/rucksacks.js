let sampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

// puzzle input
// use when testing in the browser... sampleInput on 20 is now puzzleInput
const summonPuzzleInput = async (day) => {
    let response = await fetch("https://adventofcode.com/2022/day/3/input");
    let responseText = await response.text();
    return responseText.trim();
};

let puzzleInput = await summonPuzzleInput();

let sumReducer = (sum, num) => sum + num;

let rucksacks = puzzleInput.split("\n");

// find the common item for each rucksack
let sampleRucksack = 'vJrwpWtwJgWrhcsFMMfFFhFp';

let findCommonItem = (rucksack) => {
    // divide the string into two halves
    let halfIndex = rucksack.length / 2;
    // destructuring
    let [firstHalf, secondHalf] = [
        rucksack.slice(0, halfIndex),
        rucksack.slice(halfIndex),
    ];

    let firstHalfSet = new Set(firstHalf);

    // find which characters of the second half are also in the first half
    let commonItem = [...secondHalf].find((item) => firstHalfSet.has(item));

    // return that character (there should only be one)
    return commonItem;
};

// find the priority of each item... use regex for lower case
    let getItemPriority = (item) =>
        // subtract 96 or 38 based on capital or lower case letters
        item.charCodeAt() - (/[a-z]/.test(item) ? 96 : 38);

// add them all up
let commonItems = rucksacks.map(findCommonItem);
let itemPriorities = commonItems.map(getItemPriority);
let prioritySum = itemPriorities.reduce(sumReducer, 0);

console.log(prioritySum)

// part 1 outputs 7674
