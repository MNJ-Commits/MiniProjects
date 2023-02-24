import React, {useEffect, useState, memo} from 'react';
import {useController} from 'react-hook-form';
import {TextInputProps, ViewProps} from 'react-native';
import DropDownPicker, {
  DropDownPickerProps,
} from 'react-native-dropdown-picker';

interface AppDropdown {
  name?: any; //should be string
  control?: any;
  multiple?: any;
  outerViewProps?: ViewProps;
  dropdownInputProps?: any;
  textProps?: any;
  data?: any;
  isLoading?: boolean;
  disabled?: boolean;
  setCurrentValue?: any;
  currentValue?: any;
  placeHolderStyle?: any;
  disable?: any;
}

function AppDropdown({
  name,
  control,
  // multiple,
  outerViewProps = {},
  dropdownInputProps = {},
  textProps = {},
  data,
  isLoading,
  disabled,
  setCurrentValue,
  currentValue,
  placeHolderStyle,
}: AppDropdown) {

  const {field} = useController({name, control});
  const [opendropdown, setopendropdown] = useState(false);
  const [valuedropdown, setvaluedropdown] = useState<any>(null);
  const [itemsdropdown, setitemsdropdown] = useState(data);
  const {textStyle: textPropsStyle, ...textRestProps} = textProps;
  const {style: outerViewStyle, ...outerViewRestProps} = outerViewProps;
  const {
    style: textInputStyle,
    open,
    value,
    setOpen,
    setValue,
    ...restOfdropdownInputProps
  } = dropdownInputProps;

  useEffect(() => {
    currentValue && setvaluedropdown(currentValue);
  }, [currentValue]);

  useEffect(() => {
    setitemsdropdown(data);
  }, [isLoading]);

  

  return (
    <DropDownPicker
      disable={true}
      style={[
        outerViewStyle,
        {
          backgroundColor: '#e5e5e5',
          borderColor: '#FFFFFF',
          borderWidth: 1,
          borderRadius: 5,
          flexDirection: 'row' 
        },
      ]}
      labelStyle={{color: '#212326', fontSize: 18}}
      textStyle={[
        {
          fontSize: 13,
          textAlign: 'left'
        },
          textPropsStyle,
        ]}
        listItemContainerStyle={{height: 50}}
        placeholderStyle={{color: '#B9B9B9'}}
        min={1}
        zIndex={3000}
        zIndexInverse={1000}
        open={opendropdown}
        value={valuedropdown}
        listMode="MODAL"
        mode="SIMPLE"
        items={data}
        setValue={setvaluedropdown}
        setOpen={setopendropdown}
        setItems={setitemsdropdown}
        onChangeValue={(value: any) => {
          setCurrentValue && setCurrentValue(value);
          field.onChange(value);
        }}
        loading={isLoading}
        disabled={disabled}
        {...restOfdropdownInputProps}
    />
  );
}

export default AppDropdown;
