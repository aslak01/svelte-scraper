export function findUniqueEntries(arr1: string[], arr2: string[]): string[] {
  const combinedArray = [...arr1, ...arr2];

  const uniqueEntries = combinedArray.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  return uniqueEntries;
}
