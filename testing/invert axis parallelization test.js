const arr1 = Array(10000000).fill(undefined).map(v => {return Math.random()})
const arr2 = Array(10000000).fill(undefined).map(v => {return Math.random()})

function arrayInvertAxis(array) { // Self-made, not copied! You can steal it if you want to >:P
    // array: Array with arrays inside.
    // This "flips" their axis.
    let result = [];
    array.forEach((elm1, i1) => {
        elm1.forEach((elm2, i2) => {
            result[i2] = result[i2] ?? []; // If it's not there yet, set it
            result[i2][i1] = elm2;
        });
    })
    return result;
}
function arrayInvertAxisMap(array) { // Self-made, not copied! You can steal it if you want to >:P
    // array: Array with arrays inside.
    // This "flips" their axis.
    let result = [];
    array.map((elm1, i1) => {
        elm1.map((elm2, i2) => {
            result[i2] = result[i2] ?? []; // If it's not there yet, set it
            result[i2][i1] = elm2;
        });
    })
    return result;
}


const start1 = performance.now();
arrayInvertAxis([arr1,arr2]); // is shorter
const end1 = performance.now();

const start2 = performance.now();
arrayInvertAxisMap([arr1,arr2]); // than this
const end2 = performance.now();

// by about 100-200ms

console.log(`Execution time 1: ${end1 - start1} ms\nExecution time 2: ${end2 - start2} ms`);