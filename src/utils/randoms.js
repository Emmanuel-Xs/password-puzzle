/* eslint-disable no-irregular-whitespace */

function generateRandomDigit(maxDigit = 10) {
  return Math.floor(Math.random() * maxDigit);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function convertPositionsToADigit(positionArr) {
  return positionArr.reduce((acc, position) => {
    return position ? acc + 1 : acc;
  }, 0);
}

function generateRandomIndexArray(arrayLength) {
  if (arrayLength < 1) {
    throw new Error("Invalid arrayLength value");
  }

  let indexArrayLength = generateRandomDigit(arrayLength);
  // console.log("indexArrayLength ", indexArrayLength);

  const indexArray = new Set();

  while (indexArray.size < indexArrayLength) {
    const randomIndex = generateRandomDigit(arrayLength);
    indexArray.add(randomIndex);
  }

  return Array.from(indexArray);
}

export function generateUniqueRandomDigits(count = 3) {
  if (count > 10) {
    throw new Error("Cannot generate more than 10 unique digits.");
  }
  const uniqueDigits = new Set();
  while (uniqueDigits.size < count) {
    const randomDigit = generateRandomDigit();
    uniqueDigits.add(randomDigit);
  }

  return Array.from(uniqueDigits);
}

function getRandomUniqueSubsetFrom(uniqueDigits) {
  if (uniqueDigits.length > 10) {
    throw new Error("Cannot generate more than 10 unique digits.");
  }
  // console.log("uniqueDigits: ", uniqueDigits);

  const arrayIndexes = generateRandomIndexArray(uniqueDigits.length);
  // console.log("arrayIndexes: ", arrayIndexes);

  //get the elements of the unique digits from the array index
  const randomUniqueSubset = arrayIndexes.map((index) => uniqueDigits[index]);
  // console.log("randomUniqueSubset: ", randomUniqueSubset);

  while (randomUniqueSubset.length < uniqueDigits.length) {
    const randomDigit = generateRandomDigit();

    //all digits have to be unique
    if (
      !uniqueDigits.includes(randomDigit) &&
      !randomUniqueSubset.includes(randomDigit)
    ) {
      randomUniqueSubset.push(randomDigit);
      // console.log("randomUniqueSubset: ", randomUniqueSubset);
    }
  }

  // Shuffle the array
  return shuffleArray(randomUniqueSubset);
}

function checkElementsInArray(firstArray, secondArray) {
  const result = {
    positions: [],
    isPresent: 0,
    isNotPresent: 0,
  };

  firstArray.forEach((element, index) => {
    const position = secondArray.indexOf(element);
    const isCorrectPosition = position === index;

    result.positions.push(isCorrectPosition);

    if (position !== -1) {
      result.isPresent++;
    } else {
      result.isNotPresent++;
    }
  });

  return result;
}

function transformResult(result) {
  let resultStr = "";

  // if (result.isNotPresent === result.positions.length) {
  //   resultStr = "Nothing is correct";
  //   return resultStr;
  // }

  //check if ispresent
  switch (result.isPresent) {
    case 1:
      resultStr += "One number is correct";
      break;
    case 2:
      resultStr += "Two number are correct";
      break;

    default:
      resultStr = "Nothing is correct";
      break;
  }

  //placement
  const positionDigit = convertPositionsToADigit(result.positions);

  if (result.isPresent === 1) {
    switch (positionDigit) {
      case 0:
        resultStr += " but wrongly placed";
        break;
      case 1:
        resultStr += " and well placed";
        break;
      default:
        return;
    }
  }

  if (result.isPresent === 2) {
    switch (positionDigit) {
      case 0:
        resultStr += " but wrongly placed";
        break;
      case 1:
        resultStr += " but only One is correctly placed";
        break;
      case 2:
        resultStr += " and well placed";
        break;
      default:
        return;
    }
  }

  return resultStr;
}

export function isObjectEmpty(objectName) {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
}

//test
export function runComparisonLoop() {
  const results = {};
  const numberOfIterations = 1_000_000;
  let totalMatches = 0;

  for (let i = 0; i < numberOfIterations; i++) {
    const uniqueRandomDigits = generateUniqueRandomDigits();

    const uniqueSubset = getRandomUniqueSubsetFrom(uniqueRandomDigits);

    const isSubset = uniqueRandomDigits.every((digit) =>
      uniqueSubset.includes(digit)
    );

    if (isSubset) {
      const key = uniqueRandomDigits.join(", ");
      if (results[key]) {
        results[key]++;
      } else {
        results[key] = 1;
      }
      totalMatches++;
    }
  }
  results.totalMatches = totalMatches;
  return results;
}

function isEveryElementInGroup(array, groupOfArrays) {
  for (const element of array) {
    const foundInGroup = groupOfArrays?.some((arr) => arr.includes(element));

    if (!foundInGroup) {
      return false;
    }
  }
  return true;
}

export function checkUserGuess(answer, userguess) {
  return answer.every((element) => userguess.includes(element));
}

export function arePasswordHintsCorrect(answer, passwordHints) {
  const groupOfHints = passwordHints?.map((element) => element.passwordHintArr);
  return isEveryElementInGroup(answer, groupOfHints);
}

export function getArrayOfUniqueSubset(answer) {
  const dummyArr = [];
  while (dummyArr.length < 5) {
    const passwordHintArr = getRandomUniqueSubsetFrom(answer);
    const passwordHintStr = transformResult(
      checkElementsInArray(answer, passwordHintArr)
    );
    dummyArr.push({ passwordHintArr, passwordHintStr });
  }

  return dummyArr;
}

export const handleReload = () => {
  window.location.reload();
};
