import { Text, Button, useTheme } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import { LanguageWords, NettSalaryCalculator } from '../../types';
import { forwardRef } from 'react';
import { getCurrencyFormatter } from '../../utils/currencyFormatter';
import { useTranslation } from 'react-i18next';

interface Props {
  result: NettSalaryCalculator;
  onRecalculate: () => void;
  isVisible: boolean;
}

const ResultModal = forwardRef((props: Props, ref) => {
  const { t } = useTranslation();
  const { result, onRecalculate, isVisible } = props;
  const { theme } = useTheme();

  return (
    <View 
      style={[styles.modalView]}
    >
      <View style={styles.innerContainer}>
        <View style={styles.salary}>
          <Text bold style={styles.text}>
            {t(LanguageWords.RESULTS_NI_TITLE)}
          </Text>
          <Text 
            bold 
            style={{
              ...styles.salaryText,
              color: theme?.colors.primary,
              fontWeight: 'bold',
            }}
          >
            {getCurrencyFormatter(result.monthlySalary)}
          </Text>
        </View>
        <View style={styles.moreInfo}>
          <View>
            <Text bold style={styles.text}>
              {t(LanguageWords.RESULTS_NI_MONTHLY_IRPF)}
            </Text>
            <Text bold style={styles.value}>
              {result.irpf || '0'} %
            </Text>
          </View>
          <View>
            <Text bold style={styles.text}>
              {t(LanguageWords.RESULTS_NI_MONTHLY_SS)}
            </Text>
            <Text bold style={styles.value}>
              {result.ss || '0'} %
            </Text>
          </View>
        </View>
        <View style={styles.moreInfo}>
          <View>
            <Text bold style={styles.text}>
              {t(LanguageWords.RESULTS_NI_ANUAL_IRPF)}
            </Text>
            <Text bold style={styles.value}>
              {getCurrencyFormatter(result.anualIRPF)}
            </Text>
          </View>
          <View>
            <Text bold style={styles.text}>
              {t(LanguageWords.RESULTS_NI_ANUAL_SS)}
            </Text>
            <Text bold style={styles.value}>
              {getCurrencyFormatter(result.anualSS)}
            </Text>
          </View>
        </View>
        <Button
          style={{
            marginTop: 20,
          }}
          onPress={onRecalculate}
          title={t(LanguageWords.BUTTON_RECALCULATE)}
        />
      </View>
    </View>
  );
})

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: '100%',
    padding: 18,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    width: '100%'
  },
  salary: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  salaryText: {
    fontSize: 45,
    marginBottom: 25,
    marginLeft: 10
  },
  moreInfo: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    marginBottom: 2,
    color: '#888'
  },
  value: {
    fontSize: 26,
    marginBottom: 20,
    marginLeft: 10
  }
});

export default ResultModal;