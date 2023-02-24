import React from 'react';
import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

interface IAppButton {
  buttonProps?: TouchableOpacityProps;
  innerTextProps?: TextProps;
  text?: string;
  isLoading?: boolean;
  loaderColor?: string;
  disabled?:boolean
}
export default function AppButton({
  buttonProps = {},
  innerTextProps = {},
  text,
  isLoading,
  loaderColor,
}: IAppButton) {
  
  const {style: buttonStyle, ...buttonRest} = buttonProps;
  const {style: textStyle, ...textRest} = innerTextProps;

  return (
    <TouchableOpacity
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
          height: 45,
        },
        buttonStyle,
      ]}
      {...buttonRest}>
      {!isLoading ? (
        <View style={{flexDirection:'row'}} >
          <Text
            style={[
              {fontSize: 20, fontFamily: 'OpenSans-Regular', color: 'white'},
              textStyle,
            ]}
            {...textRest}>
            {text}
          </Text>
        </View>
        ) : (
        <ActivityIndicator size="small" color={loaderColor} />
        )
      }
    </TouchableOpacity>
  );
}
