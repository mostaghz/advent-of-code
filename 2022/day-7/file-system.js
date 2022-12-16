let sampleInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

let arrayEquals = (arr1, arr2) =>
    arr1.length === arr2.length && arr1.every((value, i) => value === arr2[i]);

let modifyTree = (tree, newKey, newVal, destination, path = []) => {
    let newTree = Object.entries(tree).reduce((newTree, [key, value]) => {
        let nextValue = typeof value === "object" ? modifyTree(value, newKey, newVal, destination, [...path, key]) : value;
        return {...newTree, [key]: nextValue };
    }, {});

    return arrayEquals(destination, path)
        ? { ...newTree, [newKey]: newVal }
        : newTree;
};

let fileTree = {
    a : {
        f: 29116,
        g: 2557,
        "h.lst": 62596,
    },
    "b.txt": 14848514,
    "c.dat": 8504156,
    d: {
        j: 4060174,
        "d.log": 8033020,
        "d.ext": 5626152,
        k: 7214296,
    },
};

let tree2 = modifyTree(fileTree, "e", {}, ["a"]);
console.log(tree2)

let tree3 = modifyTree(tree2, "i", 584, ["a", "e"]);
console.log(tree3)


// create a tree of the file system (nested objects)


// depth first search the tree to find the size of each directory


// find all the directories under 100000 and add up their sizes