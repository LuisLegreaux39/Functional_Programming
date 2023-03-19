/*
 #######
 #       #    # #    #  ####  ##### #  ####  #    #   ##   #
 #       #    # ##   # #    #   #   # #    # ##   #  #  #  #
 #####   #    # # #  # #        #   # #    # # #  # #    # #
 #       #    # #  # # #        #   # #    # #  # # ###### #
 #       #    # #   ## #    #   #   # #    # #   ## #    # #
 #        ####  #    #  ####    #   #  ####  #    # #    # ######

       #
       #   ##   #    #   ##    ####   ####  #####  # #####  #####
       #  #  #  #    #  #  #  #      #    # #    # # #    #   #
       # #    # #    # #    #  ####  #      #    # # #    #   #
 #     # ###### #    # ######      # #      #####  # #####    #
 #     # #    #  #  #  #    # #    # #    # #   #  # #        #
  #####  #    #   ##   #    #  ####   ####  #    # # #        #

*/

// Testing how to copy objects
// - 1
// Primitive
// let a = 1;
// let b = a;

// console.log(a, b);

// b = 4;

// console.log(a, b)


// // Compuestos

// let obj1 = {
//     name: 'juan',
//     age: 5
// }

// let newObj = obj1;

// console.log({ newObj, obj1 })

// newObj.age = 6

// console.log({ newObj, obj1 })

// let newObj2 = Object.assign({}, obj1);

// console.log({ newObj2, obj1 })

// newObj2.age = 74;

// console.log({ newObj2, obj1 })

// // Deep copy
// let obj2 = {
//     name: 'juan',
//     age: 5,
//     owner: {
//         count: 1,
//         example: 5
//     }
// }


// // This method on typescript do not persist the type from the source object where you are copying from 
// const newObject = JSON.parse(
//     JSON.stringify(
//         obj2
//     )
// )

// console.log({ obj2, newObject })
// newObject.owner = 6

// console.log({ obj2, newObject })


const R = require("ramda");

// const addFourNumbers = (a, b, c) => a + b + c;

// const curriedAddFourNumbers = R.curry(
//     addFourNumbers
// );

// const result = curriedAddFourNumbers(1, 2)(3)
// const result2 = curriedAddFourNumbers(1)(2)(3)
// console.log(result)
// console.log(result2)

// console.log(
//     R.intersection(["12345"], ["12345"]).length
// )

// console.log(
//   R.difference([1, 2, 3, 4], [7, 6, 5, 4, 3])
// )

const arr = [2013, 2013, 2013, 2014, 2014, 2014, 2014, 2015, 2015, 2015, 2015, 2015, 2015, 2015, 2016, 2016, 2016, 2016, 2016, 2017, 2017, 2017]
console.log(
  R.countBy(R.identity(arr))
)


// Manejar un shared State
const sharedState1 = {
  value: 2
}
// Ejemplo de funciones no predecibles
const addOneToSharedState = () => sharedState1.value += 1;
const timesTwoToSharedState = () => sharedState1.value *= 2;

// addOneToSharedState()
// timesTwoToSharedState()

// console.log(sharedState1.value) // 6

// timesTwoToSharedState()
// addOneToSharedState()

// console.log(sharedState1.value) // 5

// const sharedState2 = {
//   value: 2
// }


// const addOneToShareState2 = x => Object.assign({}, x, { value: x.value + 1 })
// const timesTowShareState2 = x => Object.assign({}, x, { value: x.value * 2 })
// console.log(timesTowShareState2(sharedState1))
// console.log(addOneToShareState2(sharedState1))




// Coping arrays
const list = [1, 2, 3]
const copiedList = JSON.parse(JSON.stringify(list))
console.log(copiedList) // 1 2 3
console.log(list) // 1 2 3

copiedList.push(6)
console.log(copiedList) // 1 2 3 6
console.log(list)// 1 2 3


// Function composition
const sharedState2 = {
  value: 2
}


const addOneToShareState2 = x => Object.assign({}, x, { value: x.value + 1 })
const timesTowShareState2 = x => Object.assign({}, x, { value: x.value * 2 })
console.log(addOneToShareState2(sharedState2))
console.log(timesTowShareState2(sharedState2))


// Ejemplo de funciones compuestas
console.log(
  addOneToShareState2(
    timesTowShareState2(
      sharedState2
    )
  )
)


const tags = {
  tag: 'h1',
  attrs: {
    class: 'class1',
    id: 'id1'
  }
}


function reduceAtrributesOnString(tag) {
  return Object.keys(tag).reduce((prev, curr) => {
    const prop = `"${curr}"="${tag[curr]}"`
    return `${prop} ${prev}`
  }, '')
}

const createTag = (tag) => (attr) => (content = '') => `<${tag}${attr !== undefined ? ` ${attr}` : ``}>${content}</${tag}>`;

console.log(reduceAtrributesOnString(tags.attrs))
console.log(createTag('h1')(reduceAtrributesOnString(tags.attrs))('jelo'))