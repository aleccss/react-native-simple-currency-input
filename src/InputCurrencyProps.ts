export default interface InputCurrencyProps {
  currency: string;
  onChangeCurrency: (arg0: string) => void;
  value: number;
  onChangeValue: (arg0: number) => void;
  separator?: '.' | ',';
  currencyPosition?: 'left' | 'right';
  textInputAlign?: 'left' | 'center' | 'right';
  currencyCodes?: [string];
}
