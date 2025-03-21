import React, { useState } from 'react';
import { View, Text, StyleSheet, GestureResponderEvent, Button } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../theme/theme';
import commonStyles from '../theme/commonStyles';
import NumberOption from './NumberOption';
import { useEffect } from 'react';

interface Props {
  numberOptions: Array<number>;
  target: number;
  roundTime: number;
  wins: number;
  setWins: (w: number) => void;
  loses: number;
  setLoses: (l: number) => void;
  reset: () => void;
}

const Game: React.FC<Props> = (
  {
    numberOptions,
    target,
    roundTime,
    wins,
    setWins,
    loses,
    setLoses,
    reset,
  }) => {
  const [selected, setSelected] = useState<Array<number>>([]);
  const [timer, setTimer] = useState<number>(roundTime);
  const [status, setStatus] = useState<'play'|'win'|'loose'>('play');

  const onSelect = (e: GestureResponderEvent, index: number) => {
    e.preventDefault();
    setSelected([...selected, index]);
  };

  useEffect(() => {
    const selectedSum = selected.reduce((acc, val) => acc + numberOptions[val], 0);
    if (selectedSum === target) {
      setStatus('win');
    }
    else if (selectedSum > target) {
      setStatus('loose');
    }
  }, [selected, numberOptions, target]);

  const isDisabled = (index: number) => {
    return selected.indexOf(index) >= 0 || status === 'loose';
  };

  const updateTally = (result: string) => {
    if(result === 'win'){
      setWins(wins + 1);
    } else if(result === 'loose') {
      setLoses(loses + 1);
    }
  };

  useEffect(() => {
    if (timer > 0 && status === 'play') {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
    if (timer === 0) {
      setStatus('loose');
    }

    updateTally(status);
  }, [timer, status]);

  const resetGame = (e: GestureResponderEvent) => {
    e.preventDefault();
    if(reset) {
      reset();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.target, styles[`status_${status}`]]}>{target}</Text>
      <View style={styles.options}>
        {numberOptions.map((n: number, i: number) => (
          <NumberOption
            key={i}
            index={i}
            value={n}
            disable={isDisabled(i)}
            onSelect={onSelect}
          />
        ))}
      </View>
      <Text style={styles.timer} >{timer}</Text>
      <Text style={styles.tally} >Wins: {wins}, Loses: {loses}</Text>
      {status !== 'play' && <Button title="Reset" onPress={resetGame} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.grow,
    ...commonStyles.centered,
  },
  target: {
    ...commonStyles.column,
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    width: SPACING.xxl * 4,
    padding: SPACING.md,
    borderWidth: SPACING.xxs,
    borderRadius: BORDER_RADIUS.sm,
    textAlign: 'center',
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    ...commonStyles.spaceAround,
  },
  status_play: {
    backgroundColor: COLORS.primaryDark,
  },
  status_win: {
    backgroundColor: COLORS.secondary,
  },
  status_loose: {
    backgroundColor: COLORS.accent,
  },
  timer: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.medium,
    padding: SPACING.sm,
    marginTop: SPACING.xs,
    borderWidth: SPACING.xxs,
    borderRadius: BORDER_RADIUS.round,
    borderColor: COLORS.border,
    textAlign: 'center',
  },
  tally: {
    marginTop: SPACING.lg,
  },
});

export default Game;
