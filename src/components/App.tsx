import React, { useState } from 'react';
import Game from './Game';
import { GenerateRandomNumber } from '../utils/utils';
import shuffle from 'lodash/shuffle';

const App: React.FC = () => {
  const randomNumberCount = GenerateRandomNumber(4, 1);
  const numberOptions = Array.from({ length: randomNumberCount }).map(() => GenerateRandomNumber(1, 10));
  const target = numberOptions.slice(0, randomNumberCount - 2).reduce((sum, value) => sum + value, 0);
  const roundTime = 10;
  const shuffledOptions = shuffle(numberOptions);
  const [gameId, setGameId] = useState<number>(0);
  const [wins, setWins] = useState<number>(0);
  const [loses, setLoses] = useState<number>(0);

  const resetGame = () => {
    setGameId(gameId + 1);
  };
  return (
    <Game
      key={gameId}
      numberOptions={shuffledOptions}
      target={target}
      roundTime={roundTime}
      wins={wins}
      setWins={setWins}
      loses={loses}
      setLoses={setLoses}
      reset={resetGame}
    />
  );
};

export default App;
