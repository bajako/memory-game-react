export const playersResult = playersTime => `${playersTime < 10
  ? `00:0${playersTime}`
  : playersTime < 60
    ? `00:${playersTime}`
    : playersTime % 60 < 10
      ? `0${Math.floor(playersTime / 60)}:0${playersTime % 60}`
      : `0${Math.floor(playersTime / 60)}:${playersTime % 60}`}`;
