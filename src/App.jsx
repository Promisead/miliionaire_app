import { useEffect, useMemo, useState } from 'react';
import Start from './components/Start';
import Timer from './components/Timer';
import Trivia from './components/Trivia';
import './App.css';
import data from './data';

function App() {
  const [username, setUsername] = useState(null);
  const [stop, setStop] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState('$ 0');

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: '$ 100' },
        { id: 2, amount: '$ 200' },
        { id: 3, amount: '$ 300' },
        { id: 4, amount: '$ 500' },
        { id: 5, amount: '$ 1.000' },
        { id: 6, amount: '$ 2.000' },
        { id: 7, amount: '$ 4.000' },
        { id: 8, amount: '$ 8.000' },
        { id: 9, amount: '$ 16.000' },
        { id: 10, amount: '$ 32.000' },
        { id: 11, amount: '$ 64.000' },
        { id: 12, amount: '$ 125.000' },
        { id: 13, amount: '$ 250.000' },
        { id: 14, amount: '$ 500.000' },
        { id: 15, amount: '$ 1.000.000' },
        { id: 16, amount: '$ Jumbo Prize ' },
      ].reverse(),
    []
  );
  /*   useEffect(() => {
    console.log(data);
  }); */

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">Congrats,You Won: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setStop={setStop}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  key={m.id}
                  className={
                    questionNumber === m.id
                      ? 'moneyListItem active'
                      : 'moneyListItem'
                  }
                >
                  <span className="moneyListItemNumber"></span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
