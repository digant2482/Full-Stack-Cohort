/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isPalindrome(str) {
  var alphabetPattern = /[A-Za-z]/;
  str = str.toLowerCase();
  let i = 0;
  let j = str.length - 1;
  while (i <= j){
    while (!alphabetPattern.test(str[i])){
      i++;
    }
    while (!alphabetPattern.test(str[j])){
      j--;
    }
    if (str[i] != str[j]){
      return false;
    }
    i++;
    j--;
  }
  
  return true;
}

module.exports = isPalindrome;