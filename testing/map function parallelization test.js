const func = (function(){
    const arr = new Map();
    Array(100000).fill(null).forEach((v, i, a)=>{
        arr.set(i, Math.random());
    })
    return arr;
})
Array(5).fill(func).map(f => f()); // Array(x) => time scales with x linearily.