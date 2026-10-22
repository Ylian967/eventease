import { StyleProp, Text, TextStyle } from 'react-native';
import { paint } from '../theme';

type PaintedTitleProps = {
  text: string;
  style: StyleProp<TextStyle>;
};

// Titre « peint » : chaque lettre prend tour à tour une des 3 couleurs du thème
export default function PaintedTitle({ text, style }: PaintedTitleProps) {
  return (
    <Text style={style} accessibilityRole="header">
      {text.split('').map((letter, index) => (
        <Text key={index} style={{ color: paint[index % paint.length] }}>
          {letter}
        </Text>
      ))}
    </Text>
  );
}
