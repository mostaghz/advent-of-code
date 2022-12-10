// In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?

// import calorie list
// divide calorie list into array of groups
// find sum of each list groups
// find sum of the largest list group

// let numberGroups = sampleInput.split("\n\n");
let sampleGroup = "1000\n2000\n3000";

let getSumOfGroup = (group)  => {
    let strNumList = group.split("\n");
    let numList = strNumList.map((str) => Number(str))
    let numSum = numList.reduce((sum, num) => sum + num, 0)
    return numSum;
};

console.log(getSumOfGroup(sampleGroup));