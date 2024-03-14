const calculateScore = (rowNumbers, rowNum) => {
  // Create an object to store the occurrences of each item
  const occurrences = {};

  // Iterate through the array to count occurrences
  rowNumbers.forEach((item) => {
    occurrences[item] = (occurrences[item] || 0) + 1;
  });
  // Calculate the final values based on occurrences
  const resultArr = rowNumbers.map((item) => {
    if (occurrences[item] === 2) {
      return item * 2; // Double the value for items that appear twice
    } else if (occurrences[item] === 3) {
      return item * 3; // Triple the value for items that appear three times
    } else {
      return item; // Keep the original value for other items
    }
  });
  const result = resultArr.reduce((a, b) => a + b, 0);
  return result;
};

export default calculateScore;
