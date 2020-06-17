const { Node } = Numeric = require("../src/index.js");
const randomNumber = () => Math.floor(Math.random() * 100);
const randomFloatArr = (size) => (new Float64Array(size)).map(randomNumber);
const activator = (value, bias) => (Math.tanh(value - bias) + 1) / 2;
const results = [], size = 10000;

console.time("time");
for (let i = 0; i < size; i++) {

    const n0 = new Node(2, randomFloatArr(2));
    const n1 = new Node(2, randomFloatArr(2));
    const n2 = new Node(2, randomFloatArr(2));

    const e0_1 = n0.connect(n1, 1, randomFloatArr(1));
    const e1_2 = n1.connect(n2, 1, randomFloatArr(1));
    // console.log("edge:", e0_1);


    n1.tensor.data[0] += n0.tensor.data[0] * e0_1.tensor.data[0];
    const v1 = activator(n1.tensor.data[0], n1.tensor.data[1]);
    if (v1 < .5) continue;
    n2.tensor.data[0] += n1.tensor.data[0] * e1_2.tensor.data[0];
    const v2 = activator(n2.tensor.data[0], n2.tensor.data[1]);
    if (v1 !== 1 || v2 !== 1) results.push({ v1, v2 });
}
console.timeEnd("time");

console.log({ size, results });