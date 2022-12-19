import '../index.css';
import {useEffect, useState} from 'react';

const Clock = ({whiteMove}) => {
  const [whiteTime, setWhiteTime] = useState(500);
  const [blackTime, setBlackTime] = useState(500);

  useEffect(() => {
    const pTime = setInterval(() => {
      if (whiteMove) {
	console.log("black turn");
	setWhiteTime(prev => prev - 1);
      }
      if (!whiteMove) {
	console.log("white turn");
	setBlackTime(prev => prev - 1);
      }
    }, 1000);
    return () => clearInterval(pTime);
  }, [whiteMove]);


  return (
    <>
    <div className="clock-face">
      <div className="time">
        {blackTime}
      </div>
      <div className="time">
        {whiteTime}
      </div>
    </div>
    </>
  );
};

export default Clock;
