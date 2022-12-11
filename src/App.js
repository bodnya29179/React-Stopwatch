import { Fragment, useEffect, useState } from 'react';
import { convertMillisecondsToTime } from './utils';
import classes from './App.module.scss';

const App = () => {
  const [time, setTime] = useState(0);
  const [isStopped, setIsStopped] = useState(true);

  const [laps, setLaps] = useState([]);
  const [lastLapTime, setLastLapTime] = useState(0);

  const [minLapIndex, setMinLapIndex] = useState();
  const [maxLapIndex, setMaxLapIndex] = useState();

  const lap = () => {
    const lap = time - lastLapTime;
    setLaps([lap, ...laps]);
  };

  const reset = () => {
    setLaps([]);
    setTime(0);
  };

  const start = () => {
    setIsStopped(false);
  };

  const stop = () => {
    setIsStopped(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isStopped) {
        setTime((prevTime) => prevTime + 50);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isStopped]);

  useEffect(() => {
    setLastLapTime(time);

    if (laps.length >= 3) {
      const minIndex = laps.indexOf(Math.min(...laps));
      setMinLapIndex(minIndex);

      const maxIndex = laps.indexOf(Math.max(...laps))
      setMaxLapIndex(maxIndex);
    }
  }, [laps]);

  return (
    <div className={classes.container}>
      <span className={classes.clock}>
        {
          convertMillisecondsToTime(time)
            .split('')
            .map((symbol) => <span>{symbol}</span>)
        }
      </span>

      <div className={classes.buttons}>
        {
          isStopped
            ? (
              <Fragment>
                <button
                  className={classes.button}
                  onClick={reset}
                  disabled={time === 0}>
                  Reset
                </button>

                <button
                  className={classes.button}
                  onClick={start}>
                  Start
                </button>
              </Fragment>
            )
            : (
              <Fragment>
                <button className={classes.button} onClick={lap}>Lap</button>
                <button className={classes.button} onClick={stop}>Stop</button>
              </Fragment>
            )
        }
      </div>

      <div className={classes.laps}>
        {
          !!laps.length && laps.map((lap, index) => (
            <div
              key={index}
              className={`${classes.lap} ${minLapIndex === index && classes.min} ${maxLapIndex === index && classes.max}`}
            >
              <span>Lap {laps.length - index} </span>

              <span>{convertMillisecondsToTime(lap)}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
