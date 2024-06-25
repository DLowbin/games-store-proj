export function search(dataArray, searchOptions, searchQuery) {
  let searchArray = [];
  for (let option of searchOptions) {
    const searchBy = dataArray.filter(
      (product) => product[option].toLowerCase().indexOf(searchQuery.toLocaleLowerCase()) !== -1
    );
    searchArray.push(...searchBy);
  }
  return [...new Set([...searchArray])];
}
