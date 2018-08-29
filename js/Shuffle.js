export const shuffle = (array) => {
  let currentIndex = array.length; let
    randomIndex;
  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  // While shuffle restore elements to their initial settings
  array.forEach((playersChoice) => {
    playersChoice.disable = false;
    playersChoice.cover = 'img/cover.png';
  });
  return array;
};
