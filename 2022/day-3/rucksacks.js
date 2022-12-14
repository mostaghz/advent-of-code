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

// PART 1

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

// PART 2

// divide rucksacks into groups of three (recursive function = function that calls itself... similar to a loop)
let getGroupsOf3 = (arr) =>
    arr.length ? [arr.slice(0, 3), ...getGroupsOf3(arr.slice(3))] : [];

// find common item for each group of three
let sampleGroup = [
        'vJrwpWtwJgWrhcsFMMfFFhFp',
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
        'PmmdzqPrVvPwwTWBwg'
];

let findCommonItemInGroupOf3 = ([sack1, sack2, sack3]) => {
    // convert first two groups into sets
    let [set1, set2] = [new Set(sack1), new Set(sack2)];

    // find item in group 3 that's in both sets
    let commonItem = [...sack3].find((item) => set1.has(item) && set2.has(item));

    return commonItem
};


// find priorities

// add them all up
let prioritySumOfGroups = getGroupsOf3(rucksacks)
    .map(findCommonItemInGroupOf3)
    .map(getItemPriority)
    .reduce(sumReducer, 0)

console.log(prioritySumOfGroups)

// part 1 outputs 7674
// part 2 outputs 2805
