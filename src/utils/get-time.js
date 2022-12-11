export default function convertMillisecondsToTime(ms) {
  const addZeros = (time) => time < 10 ? `0${time}` : time;
  const addZerosMs = (time) => {
    if (time < 10) { return `00${time}`; }
    if (time < 100) { return `0${time}`; }
    return time;
  }
  const milliseconds = ms % 1000;
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (60 * 1000)) % 60);

  return `${ addZeros(minutes) }:${ addZeros(seconds) }.${ addZerosMs(milliseconds) }`;
}
