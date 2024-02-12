export default function useConvert() {
  const convertTemperature = (
    temperature: number, 
    unit: 'celsius' | 'fahrenheit',   // единица измерения температуры, выбранная пользователем
    initUnit?: string   // единица измерения температуры, которая приходит из запроса 
  ) => {
    const isSameUnit = unit === initUnit;
    const convertedTemperature = isSameUnit
      ? temperature  
      : unit === 'celsius'
      ? ((temperature - 32) * 5) / 9
      : unit === 'fahrenheit'
      ? (temperature * 9) / 5 + 32
      : 0;
    return `${convertedTemperature.toFixed(2)}${
      unit === 'celsius' ? '°C' : '°F'
    }`;
  };

  return {
    convertTemperature,
  };
}
