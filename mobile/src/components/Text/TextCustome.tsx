import * as React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

const OpenSansFont: { [key: string]: string } = {
    normal: 'normal',
    bold: 'Bold',
    '100': 'Light',
    '200': 'Light',
    '300': 'Light',
    '400': 'normal',
    '500': 'normal',
    '600': 'SemiBold',
    '700': 'Bold',
    '800': 'Bold',
    '900': 'Bold',
};

const disableStyles: StyleProp<TextStyle> = {
    fontStyle: 'normal',
    fontWeight: 'normal',
};

type TextProps = Text['props'];

export function OpenSansText(props: TextProps) {
    const { fontWeight = '400', fontStyle } = StyleSheet.flatten(props.style || {}) as TextStyle;

    const fontFamily = `Raleway-${OpenSansFont[fontWeight] || 'normal'}${fontStyle === 'italic' ? 'Italic' : ''}`;

    return <Text {...props} style={[{ fontFamily }, props.style, disableStyles]} />;
}
