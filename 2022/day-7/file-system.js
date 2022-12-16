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
        let nextValue =
            typeof value === "object"
                ? modifyTree(value, newKey, newVal, destination, [...path, key])
                : value;
        return {...newTree, [key]: nextValue };
    }, {});

    return arrayEquals(destination, path)
        ? { ...newTree, [newKey]: newVal }
        : newTree;
};

let lines = sampleInput.split("\n");

let fileTree = lines.reduce(
    ({tree, location}, line) => {
    let doNothing = () => ({tree, location});

    let closeDirectory = () => ({tree, location: location.slice(0, -1)});

    let goToHomeDirectory = () => ({tree, location: []});

    let openDirectory = (line) => {
        let dir = line.match(/\$ cd (\w+)/)[1];
        return {tree, location: [...location, dir]};
    };

    let createDirectory = (line) => {
        let dir = line.match(/dir (\w+)/)[1];
        let nextTree = modifyTree(tree, dir, {}, location);
        return {tree: nextTree, location};
    };

    let createFile = (line) => {
        let [size, file] = line.match(/(\d+) (.+)/).slice(1);
        let nextTree = modifyTree(tree, file, Number(size), location);
        return {tree: nextTree, location};
    };

    let commandMap = [
        { expression: /\$ ls/, function: doNothing },
        { expression: /\$ cd \.\./, function: closeDirectory },
        { expression: /\$ cd\//, function: goToHomeDirectory },
        { expression: /\$ cd \w+/, function: openDirectory },
        { expression: /dir \w+/, function: createDirectory },
        { expression: /\d+ .+/, function: createFile },
    ];

    let command = commandMap.find(({expression}) =>
        expression.test(line)
    ).function;

    return command(line);
    },
    { tree: {}, location: [] }
).tree;

console.log(fileTree)

// create a tree of the file system (nested objects)


// depth first search the tree to find the size of each directory


// find all the directories under 100000 and add up their sizes