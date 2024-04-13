export function matchingPrefixIndex(str1: string, str2: string) {
  let index = 0;
  while (index < str1.length && index < str2.length) {
    if (str1[index].toLowerCase() !== str2[index].toLowerCase()) {
      break;
    }
    index++;
  }
  return index;
}
