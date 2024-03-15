const removeFromArray = (subject, rowIndex, value) => {
  let updatedArray = subject;
  let row = updatedArray[rowIndex];
  let removedCount = 0; // Variable to keep track of removed elements

  // Loop through the row and replace occurrences of the value with 0
  for (let i = 0; i < row.length; i++) {
    if (row[i] === value) {
      row[i] = 0;
      removedCount++;
    } else if (removedCount > 0) {
      // If there are removed elements, shift the current element to the left
      row[i - removedCount] = row[i];
      row[i] = 0; // Set the current element to 0 after shifting
    }
  }

  return updatedArray;
};

export default removeFromArray;
