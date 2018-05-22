export const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  // While there remain elements to shuffle
  while (0 !== currentIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element
    [array[currentIndex],array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
  // While shuffle restore elements to their initial settings
  array.forEach(function (playersChoice) {
    playersChoice.disable = false;
    playersChoice.cover = 'img/cover.png';
  });
  return array;
};
