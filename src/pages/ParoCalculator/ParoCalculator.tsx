import { LayoutRectangle, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, useTheme, Icon, Button } from '@rneui/themed';
import { Disclaimer, InputLabel, CustomDropdown, ScrollBouncer } from '../../components';
import SecondSvg from '../../components/Svg/secondSvg';
import { useRef, useState } from 'react';
import { CHILDREN_IN_CHARGE, TIME_WORKED } from '../../constants';
import { LanguagesAvailable, LanguageWords, ParoInputNames } from '../../types';
import ParoResult from '../../components/Modal/ParoResult';
import { paroCalculator } from '../../utils/paro';
import { useTranslation } from 'react-i18next';

function ParoCalculator() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const averageSalaryRef = useRef<TextInput>();
  const resultRef = useRef<ScrollView>();

  const [averageSalary, setAverageSalary] = useState<number>(0);
  const [timeWorked, setTimeWorked] = useState<string>('15');
  const [childInCharge, setChildInCharge] = useState<string>('none');
  const [resultScroll, setResultScroll] = useState<LayoutRectangle | null>(null);
  const [paroResult, setParoResult] = useState<number>(0);
  const [isShowResult, setIsShowResult] = useState(false);

  const currentLanguage = i18n.language as LanguagesAvailable;
  
  const showResult = isShowResult && !!averageSalary && !!timeWorked && !!childInCharge;

  const handleShowResult = () => {
    setIsShowResult(true);
    const result = paroCalculator({ averageSalary, childInCharge });
    setParoResult(result);
    setTimeout(
      () => resultRef.current?.scrollTo({ y: resultScroll?.y, animated: true }), 
    100);
  }

  const handleInputChange = (value: string, input: ParoInputNames ) => {
    switch (input) {
      case ParoInputNames .AVERAGE_SALARY:
        setAverageSalary(Number(value))
        break;
      case ParoInputNames .TIME_WORKED:
        setTimeWorked(value)
        break;
      case ParoInputNames .CHILDREN_IN_CHARGE:
        setChildInCharge(value)
        break;
    }
    if (isShowResult) {
      setIsShowResult(false);
    }
  }

  const handleRecalculate = () => {
    setIsShowResult(false);
    setParoResult(0);
    averageSalaryRef.current?.focus();
  }

  return (
    <>
      <ScrollView 
        ref={resultRef as any}
        style={{
          backgroundColor: theme?.colors.background
        }}
        keyboardDismissMode="on-drag"
      >
        <SafeAreaView
          style={styles.centeredContainer}
        >
          <Input
            ref={averageSalaryRef as any}
            shake={() => { }}
            label={() => <InputLabel bold>{t(LanguageWords.INPUT_LABEL_PARO_AVERAGE_SALARY)}</InputLabel>}
            rightIcon={<Icon
              name='logo-euro'
              type='ionicon'
              color={theme?.colors.primary}
            />}
            value={averageSalary ? averageSalary.toString() : ''}
            onChangeText={(value) => handleInputChange(value, ParoInputNames .AVERAGE_SALARY)}
            keyboardType="numeric"
            placeholder={t(LanguageWords.INPUT_PLACEHOLDER_PARO_AVERAGE_SALARY)}
          />
          <CustomDropdown
            bold
            value={timeWorked}
            onChange={(value) => handleInputChange(value, ParoInputNames .TIME_WORKED)}
            data={TIME_WORKED[currentLanguage]}
            label={t(LanguageWords.INPUT_LABEL_PARO_TIME_WORKED)}
          />
          <CustomDropdown
            bold
            value={childInCharge}
            onChange={(value) => handleInputChange(value, ParoInputNames .CHILDREN_IN_CHARGE)}
            data={CHILDREN_IN_CHARGE[currentLanguage]}
            label={t(LanguageWords.INPUT_LABEL_PARO_CHILDREN_IN_CHARGE)}
          />

          <View style={{flex: 1, width: '100%'}}>
            <Button
              style={{ marginBottom: 40, marginTop: 15, }}
              title={t(LanguageWords.BUTTON_CALCULATE)}
              onPress={handleShowResult}
              disabled={showResult}
            />
          </View>

          <View 
            style={{flex: 1, width: '100%'}}
            onLayout={event => setResultScroll(event.nativeEvent.layout)}
          >
            {showResult &&
              <ParoResult
                isVisible={showResult}
                result={paroResult}
                onRecalculate={handleRecalculate}
              />
            }
          </View>

          <Disclaimer />

        </SafeAreaView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    marginTop: -20,
    paddingRight: 25,
    paddingLeft: 25,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ParoCalculator;