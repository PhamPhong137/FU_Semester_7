// const area = (w, h) => w * h;
// const perimeter = (w, h) => 2 * (w + h);

// module.exports = { area, perimeter }


//------ASYNCHRONOUS method------

//Method 1: Using Callbacks
// const CalcRectangle = (x, y, callback) => {
//     if (x <= 0 || y <= 0) {
//         setTimeout(() =>
//             callback(new Error(`Rectangle dimensions should be greater than zero: x = ${x}, and y = ${y}`),
//                 null),
//             2000
//         )
//     } else {
//         setTimeout(() =>
//             callback(null, {
//                 perimeter: () => 2 * (x + y),
//                 area: () => x * y
//             }),
//             2000
//         )
//     }
// }

//Method 2: Using Promises
// const CalcRectangle = (x, y) => {
//     return new Promise((resolve, reject) => {
//         if (x <= 0 || y <= 0) {
//             reject(new Error(`Rectangle dimensions should be greater than zero: x = ${x}, and y = ${y}`))
//         } else {
//             resolve({
//                 perimeter: () => 2 * (x + y),
//                 area: () => x * y
//             })
//         }
//     })
// }


// Method 3: Using Async/Await
const CalcRectangle = async (x, y) => {
    if (x <= 0 || y <= 0) {
        throw new Error(`Rectangle dimensions should be greater than zero: x = ${x}, and y = ${y}`)
    } else {
        return {
            perimeter: () => 2 * (x + y),
            area: () => x * y
        }
    }
}

module.exports = CalcRectangle