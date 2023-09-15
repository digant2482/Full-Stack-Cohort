/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function sortString(string){
  /* Converts string to lowercase
   * Sorts the string
   * @return processed string
   */
  string = string.toLowerCase();
  let stringArray = string.split("");
  stringArray.sort();
  let ans = stringArray.join("");
  return ans;
}

function isAnagram(str1, str2) {
  let sortedStr1 = sortString(str1);
  let sortedStr2 = sortString(str2);

  if (sortedStr1 == sortedStr2){
    return true;
  }
  else{
    return false;
  }
}

module.exports = isAnagram;