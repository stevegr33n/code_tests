function pascalsTriangle(numberOfLayers) {
  
  const totalLayers = [
    [1],
  ];

  for (i = 0; i < numberOfLayers - 1; i++) {
    element = [];
    for (j = 0; j < totalLayers.length; j++) {
      const currentElement = totalLayers[i][j];
      const previousElement = totalLayers[i][j - 1];
      if (isNaN(currentElement + previousElement)) {
        element[j] = 1; // a layer's first element is always 1
      } else {
        element[j] = currentElement + previousElement;
      }
    }
    element.push(1) // a layer's last element is always 1
    totalLayers.push(element);
  }
  return totalLayers;
}

const triangle = pascalsTriangle(5);

for (layer in triangle) {
  console.log(triangle[layer].join(' '));
}