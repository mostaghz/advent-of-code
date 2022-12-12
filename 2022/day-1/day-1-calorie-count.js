// import { calorieList } from "./day-1-calorie-list";

// import calorie list
// divide calorie list into array of groups
// find sum of each list groups
// find sum of the largest list group

// PRACTICE BEFORE ACTUAL SOLUTION

const summonCalorieListInput = async () => {
    let response = await fetch("https://adventofcode.com/2022/day/1/input");
    let responseText = await response.text();
    return responseText;
};

let calorieListInput = await summonCalorieListInput();

let sumReducer = (sum, num) => sum + num

const getSumOfGroup = (group)  => {
    let strNumList = group.split("\n");
    // modify each object in array then spits out new array of modified objects then changes from string to integers
    let numList = strNumList.map((str) => Number(str))
    // takes all objects in array and turns them into single value... so sum of each group
    let numSum = numList.reduce(sumReducer, 0)
    return numSum;
};

// ACTUAL SOLUTION
let numberGroups = calorieListInput.split("\n\n");

let groupSums = numberGroups.map(getSumOfGroup);

// PART 1
let maxSum = Math.max(...groupSums);


// PART 2
// find top 3 sums

// sort array in descending order
let sortedSums = [...groupSums].sort((num1, num2) => num2 - num1);

// add top 3 sums
let top3Sums = sortedSums.slice(0, 3);
let sumOfTop3 = top3Sums.reduce(sumReducer, 0)

console.log(sumOfTop3);

// SOLUTION PART 2
// code in lines above BUT used fetch to grab calorie list api... can't run in terminal but can copy/paste into browser console. hit enter to get answer