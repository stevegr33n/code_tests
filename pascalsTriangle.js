function pascalsTriangle(layer) {
  // 1
  // 1 1
  // 1 2 1
  // 1 3 3 1

  // triangle = [
  //   { 0:'1'},
  //   { 0:'1', 1:'1'},
  //   { 0:'1', 1:'2', 2:'2' }
  // ]

  triangle = []
  firstElement = {}
  firstElement[0] = 1
  triangle.push(firstElement)

  for (i = 0; i < layer; i++) {
    element = {}
    element[0] = 1 // a layer always starts with an element called 1
    for (j = 0; j < triangle.length; j++) {
      if (isNaN(Number(triangle[i][j] + triangle[i][j - 1]))) {
        element[j] = 1
      } else {
        element[j] = Number(triangle[i][j] + triangle[i][j - 1])
      }
    }
    element[j] = 1 // a layer always ends with an element called 1
    triangle.push(element)
  }
  return triangle
}

console.log(JSON.stringify(pascalsTriangle(4), null, 2))