export default function useConvert() {
    const toCelsius = (fahrenheit: number) => {
        return (fahrenheit - 32) * 5 / 9;
      };
}