const rect = require('./rectangle');

//Functions
// const solveRect = (l, b) => {
//     console.log(`Solving for rectangle with l = ${l} and b = ${b}`);
//     if (l <= 0 || b <= 0) {
//         console.log(`Rectangle dimensions should be greater than zero: l = ${l}, and b = ${b}`);
//     } else {
//         console.log(`The area of the rectangle is: ${rect.area(l, b)}`);
//         console.log(`The perimeter of the rectangle is: ${rect.perimeter(l, b)}`);
//     }
// }

// const solveRect = (l, b) => {
//     console.log(`Solving for rectangle with l = ${l} and b = ${b}`);
//     rect(l, b, (err, rectangle) => {
//         if (err) {
//             console.log("ERROR", err.message);
//         } else {
//             console.log(`The area of the rectangle is: ${rectangle.area()}`);
//             console.log(`The perimeter of the rectangle is: ${rectangle.perimeter()}`);
//         }
//     });
//     console.log("This statement is logged after the call to rect()");
// }

//Test: Asynchronous - Callback

// function solveRect(l, b) {
//     console.log(`Solving for rectangle with l = ${l} and b = ${b}`);
//     rect(l, b, (err, rectangle) => {
//         if (err) {
//             console.log("ERROR", err.message);
//         } else {
//             console.log(`The area of the rectangle is: ${rectangle.area()}`);
//             console.log(`The perimeter of the rectangle is: ${rectangle.perimeter()}`);
//         }
//     });
//     console.log("This statement is logged after the call to rect()");
// }

//Test: Asynchronous - Promises
// const solveRect = (l, b) => {
//     console.log(`Solving for rectangle with l = ${l} and b = ${b}`);
//     rect(l, b)
//         .then((rectangle) => {
//             console.log(`The area of the rectangle is: ${rectangle.area()}`);
//             console.log(`The perimeter of the rectangle is: ${rectangle.perimeter()}`);
//         })
//         .catch((err) => {
//             console.log("ERROR", err.message);
//         });
//     console.log("This statement is logged after the call to rect()");
// }

//Test: Asynchronous - Async/Await
const solveRect = async (l, b) => {
    console.log(`Solving for rectangle with l = ${l} and b = ${b}`);
    try {
        const { perimeter: p, area: a } = await rect(l, b);
        console.log(`The area of the rectangle is: ${a}`);
        console.log(`The perimeter of the rectangle is: ${p}`);
    } catch (err) {
        console.log("ERROR", err.message);
    }
    console.log("This statement is logged after the call to rect()");
}

//Execute
solveRect(2, 4);
solveRect(3, -4);