import {
    TextInput,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { currencyCodesList } from './utils/currencyCodesList';
import InputCurrencyProps from './InputCurrencyProps';
import {colors} from "./utils/colors";

const CurrencyButton = ({
      setModalWidth,
      setCurrencySelector,
      currency,
      currencySelector,
      align,
    }) => (
    <TouchableOpacity
      onLayout={event => {
        let {width} = event.nativeEvent.layout;
        setModalWidth(width);
      }}
      style={
        align === 'left'
          ? styles.currencyTouchableLeft
          : styles.currencyTouchableRight
      }
      onPress={() => {
        setCurrencySelector(!currencySelector);
      }}>
      <Text>{currency}</Text>
      <Text>&or;</Text>
    </TouchableOpacity>
);

export default React.forwardRef<InputCurrencyProps>(({
     currency,
     onChangeCurrency,
     value,
     onChangeValue,
     currencyPosition = 'right',
     textInputAlign = 'left',
     currencyCodes = undefined,
   }: InputCurrencyProps) => {
    const [currencySelector, setCurrencySelector] = useState(false);
    const [modalWidth, setModalWidth] = useState(0);
    const currencyList = currencyCodes || currencyCodesList;

    const windowHeight = Dimensions.get('window').height;

    return (
      <View style={styles.container}>
        {currencyPosition === 'left' && (
          <CurrencyButton
            setModalWidth={setModalWidth}
            setCurrencySelector={setCurrencySelector}
            currency={currency}
            currencySelector={currencySelector}
            align={currencyPosition}
          />
        )}
        <TextInput
          style={currencyInputStyle(textInputAlign)}
          keyboardType="numeric"
          value={value}
          onChangeText={onChangeValue}
          numberOfLines={1}
        />
        {currencyPosition === 'right' && (
          <CurrencyButton
            setModalWidth={setModalWidth}
            setCurrencySelector={setCurrencySelector}
            currency={currency}
            currencySelector={currencySelector}
            align={currencyPosition}
          />
        )}
        {currencySelector && (
          <View
            style={modalStyle(
              modalWidth,
              windowHeight,
              currencySelector,
              currencyPosition,
            )}
            onRequestClose={() => {
              setCurrencySelector(!currencySelector);
            }}>
            <ScrollView
              style={scrollViewStyle(windowHeight)}
              contentContainerStyle={{alignItems: 'center'}}
              showsVerticalScrollIndicator={false}>
              {currencyList.map((item: string, id: number) => (
                <TouchableOpacity
                  key={id}
                  style={{margin: 3}}
                  onPress={() => {
                    onChangeCurrency(item);
                    setCurrencySelector(!currencySelector);
                  }}>
                  <Text>{item}</Text>
                </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkGreyBackground,
    flexDirection: 'row',
    margin: 20,
    zIndex: 2,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.greyBorder,
  },
  currencyTouchableLeft: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRightWidth: 1,
    borderRightColor: colors.greyBorder,
  },
  currencyTouchableRight: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderLeftWidth: 1,
    borderLeftColor: colors.greyBorder,
  },
});

const modalStyle = (modalWidth, windowHeight, currencySelector, align) =>
  StyleSheet.create({
    position: 'absolute',
    backgroundColor: colors.greyBackground,
    width: modalWidth,
    maxHeight: windowHeight / 2,
    top: 30,
    left: align === 'left' ? 0 : undefined,
    right: align === 'right' ? 0 : undefined,
    borderRadius: 3,
    elevation: 3,
    display: currencySelector ? 'flex' : 'none',
  });

const scrollViewStyle = windowHeight =>
  StyleSheet.create({
    maxHeight: windowHeight / 2,
    width: '100%',
  });

const currencyInputStyle = textAlign =>
  StyleSheet.create({
    flex: 8,
    backgroundColor: colors.greyBackground,
    textAlign: textAlign,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  });