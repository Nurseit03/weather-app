export default function useRandom() {
  const randomColor = (colors?: string[], unsetFlag?: boolean): string => {
    if (unsetFlag) {
      return 'unset';
    }

    const defaultColors = [
      'cornflowerblue',
      'white',
      'cornflowerblue',
      'lightskyblue',
    ];

    const colorArray = colors || defaultColors;
    const randomIndex = Math.floor(Math.random() * colorArray.length);

    return colorArray[randomIndex];
  };

  return {
    randomColor,
  };
}
