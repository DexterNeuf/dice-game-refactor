const checkForDuplicates = (subjectArray, rowNumber) => {
  let arr = subjectArray[rowNumber];
  let countsForSameNumber = arr.reduce((acc, num) => {
    if (num !== 0) {
      acc[num] = (acc[num] || 0) + 1;
    }
    return acc;
  }, {});

  const rowToBeAdded = arr.map((num) =>
    num === 0 ? 0 : countsForSameNumber[num]
  );
  return rowToBeAdded;
};

export default checkForDuplicates;
