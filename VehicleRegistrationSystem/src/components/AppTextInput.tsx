import React from 'react';
import {useController} from 'react-hook-form';
import {
  TextInput,
  TextInputProps,
  View,
  ViewProps,
  StyleSheet,
} from 'react-native';


interface IAppTextInput {
  name?: any;
  control?: any;
  outerViewProps?: ViewProps;
  textInputProps?: TextInputProps;
  setCurrentValue?: any;
  currentValue?: any;
  editable?: any;
}

export default function AppTextInput({
  name,
  control,
  outerViewProps = {},
  textInputProps = {},
  setCurrentValue,
  editable,
 }: IAppTextInput) { 

  const {style: outerViewStyle, ...outerViewRestProps} = outerViewProps;
  const {style: textInputStyle, ...textInputRest} = textInputProps;
  const {field} = useController({name, control});

  return (
    <View
      style={[style.inputFieldOuterStyle, outerViewStyle]}
      {...outerViewRestProps}>
      <TextInput
        editable={editable}
        placeholderTextColor={'#8d8d8d'}
        onChangeText={e => {
          setCurrentValue && setCurrentValue(e);
          field.onChange(e);
        }}
        value={field.value}
        style={[style.inputFieldInnerStyle, textInputStyle]}
        {...textInputRest}
      />
    </View>
  );
}

const style = StyleSheet.create({
  //  AppText & AppTextArea Input Style
  inputFieldOuterStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:  '#e5e5e5',
    borderRadius: 5,
    marginVertical: 10,
    opacity: 0.8,
    height: 50,
    overflow: 'hidden',
  },

  inputFieldInnerStyle: {
    flex: 1,
    fontSize: 15,
    paddingLeft: 10,
    color: 'black',
    backgroundColor: '#e5e5e5',
  },
});
