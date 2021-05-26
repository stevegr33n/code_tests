/*
Imagine we have an image. We'll represent this image as a simple 2D array where every pixel is a 1 or a 0.

The image you get is known to have potentially many distinct rectangles of 0s on a background of 1's.
Write a function that takes in the image and returns the coordinates of all the 0 rectangles -- top-left and bottom-right; or top-left, width and height.

image1 = [
  [0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 1],
  [1, 1, 1, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 0],
]

Sample output variations (only one is necessary):

findRectangles(image1) =>
  // (using top-left-row-column and bottom-right):
  [
    [[0,0],[0,0]],
    [[2,0],[2,0]],
    [[2,3],[3,5]],
    [[3,1],[5,1]],
    [[5,3],[6,4]],
    [[7,6],[7,6]],
  ]
  // (using top-left-row-column and width/height):
  [
    [[0,0],[1,1]],
    [[2,0],[1,1]],
    [[2,3],[3,2]],
    [[3,1],[1,3]],
    [[5,3],[2,2]],
    [[7,6],[1,1]],
  ]

Other test cases:

image2 = [
  [0],
]

findRectangles(image2) =>
  // (using top-left-row-column and bottom-right):
  [
    [[0,0],[0,0]],
  ]

  // (using top-left-row-column and width/height):
  [
    [[0,0],[1,1]],
  ]

image3 = [
  [1],
]

findRectangles(image3) => []

image4 = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
]

findRectangles(image4) =>
  // (using top-left-row-column, and bottom-right or width/height):
  [
    [[1,1],[3,3]],
  ]

n: number of rows in the input image
m: number of columns in the input image

*/


"use strict";

const image1 = [
  [0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0],
  [1, 0, 1, 0, 0, 1, 1],
  [1, 1, 1, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 0],
];

const image2 = [
  [0],
];

const image3 = [
  [1],
];

const image4 = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
];

const image5 = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 1],
];

function findRectangles(image) {
  const keys = []
  let noUp = false
  let noLeft = false
  let noBot = false
  let noRight = false
  const smallestDiff = {val: image.length + 1, tl: null}
  const res = {}

  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {

      if (image[i][j] === 0) {
        noUp = image[i - 1] == null || image[i - 1][j] !== 0
        noLeft = image[i][j - 1] == null || image[i][j - 1] !== 0
        noBot = image[i + 1] == null || image[i + 1][j] !== 0
        noRight = image[i][j + 1] == null || image[i][j + 1] !== 0

        // if thing above you and thing to the left of you isnt a zero, you must be tl
        if (noUp && noLeft) {
          res[`${i}-${j}`] = {tl: [i, j], br: null}
          keys.push(`${i}-${j}`)
        }

        // if thing below you and thing to the right of you isnt a zero, you must be br
        if (noBot && noRight) {
          if (res[`${i}-${j}`] || keys.length === 1) {
            // if key already exists for a br co-ordinate, we know its a 1x1 rect
            res[keys.pop()].br = [i, j]
          } else {
            // pick the smallest co-ordinate difference between
            // br and all keys to find this br's key
            keys.forEach((k, index) => {
              let [ki, kj] = k.split('-')
              let diff = (i - Number(ki)) + (j - Number(kj))
              if (diff < smallestDiff.val) {
                smallestDiff.val = diff
                smallestDiff.tl = k
                smallestDiff.index = index
              }
            })
            res[smallestDiff.tl].br = [i, j]
            keys.splice(smallestDiff.index, 1)
          }
        }
      }
    }
  }
  for (const [k, v] of Object.entries(res)) {
    console.log(k, v)
  }
}

console.log("")
console.log("image1")
findRectangles(image1)
console.log("")
console.log("image2")
findRectangles(image2)
console.log("")
console.log("image3")
findRectangles(image3)
console.log("")
console.log("image4")
findRectangles(image4)
console.log("")
console.log("image5")
findRectangles(image5)

function findRectangle(image) {
  const res = []
  for(let i = 0; i < image.length; i++) {
    let line = image[i]
    for(let j = 0; j < line.length; j++) {
      if (line[j] === 0) {
        res.push(`${i},${j}`)
      }
    }
  }
  return `${res[0]} ${res[res.length -1]}`
}
