import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FONT_SIZES, COLORS, SPACING, BORDER_RADIUS } from '../theme/theme';

interface Props {
  index: number,
  value: number,
  disable: boolean,
  onSelect: (e: GestureResponderEvent, index: number) => void,
}

const NumberOption: React.FC<Props> = ({index, value, disable, onSelect}) => {
  const pressOption = (e: GestureResponderEvent, i: number) => {
    if(!disable){
      onSelect(e, i);
    }
  };

  return (
    <TouchableOpacity onPress={(e) => pressOption(e, index)}>
      <Text
        key={`option_${index}`}
        style={[styles.option, disable && styles.optionSelected]}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    fontSize: FONT_SIZES.lg,
    backgroundColor: COLORS.background,
    width: SPACING.xxl * 2,
    textAlign: 'center',
    padding: SPACING.sm,
    borderWidth: SPACING.xxs,
    borderRadius: BORDER_RADIUS.sm,
    marginHorizontal: SPACING.xxl,
    marginVertical: SPACING.xl,
  },
  optionSelected: {
    opacity: 0.3,
  },
});

export default NumberOption;
