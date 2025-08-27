// 1. Scope - Global, Function, Block

const { read } = require("./read-write");

const testConst = "";

const myFun = () => {
  var myVar = "Hello var!";
  let myLet = "Hello let";
  if (true) {
    var testVar = "Hello";
  }
  console.log(testVar);
};

// Callback
const callback = (fn, num) => {
  // sekogas imaat funkcija kako parametar
  if (num % 2 === 0) {
    fn(`${num} is even number!`);
    // greet(`${num} is even number!`)
  } else {
    fn(`${num} is odd number!`);
  }
};

const greet = (paramString) => {
  console.log("f1 - ", paramString);
};

const giveMeAnswer = (paramString) => {
  console.log("f2 - ", paramString);
};

callback(greet, 2);
callback(giveMeAnswer, 3);

// const fetchCallback = () => {
//   const res = fetch("/api");
// res.then(success).catch(failed).finally(alwaysExecuted)
// };

// Callback hell - vgnezdeni callback povici

// Promises - fullfilled, pending, rejected

// function main() {
//   read("cars.json")
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))
//     .finally(() => console.log("Request done!"));
// }

// Async/await

async function main() {
  try {
    const content = await read("cars.json");
    console.log(content);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Finally!");
  }
}

main();

// Iskoristete write() za da zapisete 3 avtomobili vo cars.json
// Zapazete go istiot format
// Napravete read za da gi vidime novite avtomobili
