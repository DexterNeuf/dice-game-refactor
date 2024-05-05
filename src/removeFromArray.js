const removeFromArray = (subject, rowIndex, value) => {
  let updatedArray = subject;
  let row = updatedArray[rowIndex];

  // Remove all instances of the value from the row
  row = row.filter((element) => element !== value);

  // Move remaining elements to the left
  for (let i = 0; i < row.length; i++) {
    if (row[i] === 0) {
      row.splice(i, 1);
      i--; // Adjust index after removing an element
    }
  }

  // Fill the row with zeros to match the original length
  while (row.length < subject[rowIndex].length) {
    row.push(0);
  }
  row.reverse();
  updatedArray.splice(rowIndex, rowIndex + 1, row);
  console.log(updatedArray);
  return updatedArray;
};

export default removeFromArray;
