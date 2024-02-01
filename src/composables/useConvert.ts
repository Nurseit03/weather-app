export default function useConvert() {
  const convertTemperature = (
    temperature: number,
    unit: 'celsius' | 'fahrenheit'
  ) => {
    const convertedTemperature =
      unit === 'celsius'
        ? ((temperature - 32) * 5) / 9
        : (temperature * 9) / 5 + 32;
    return `${convertedTemperature.toFixed(2)}${unit === 'celsius' ? '°C' : '°F'}`;
  };

  return {
    convertTemperature,
  };
}
