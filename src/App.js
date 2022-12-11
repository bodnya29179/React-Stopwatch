import { Fragment, useEffect, useState } from 'react';
import { convertMillisecondsToTime } from './utils';
import classes from './App.module.scss';

const App = () => {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isStopped, setIsStopped] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isStopped) {
        setTime((prevTime) => prevTime + 100);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isStopped]);

  const lap = () => {
    const lap = time - (laps[0] || 0);
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

  return (
    <div className={classes.container}>
      <span className={classes.clock}>{convertMillisecondsToTime(time)}</span>

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
            <div key={index} className={classes.lap}>
              <span>Lap {laps.length - index} </span>

              <span>{ convertMillisecondsToTime(lap - (laps[index + 1] || 0)) }</span>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
