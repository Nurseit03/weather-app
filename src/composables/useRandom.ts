export default function useRandom() {
  const randomColor = (unsetFlag?: boolean) => {
    if (unsetFlag) {
      return 'unset';
    }

    const colors = [
      'cornflowerblue',
      'skyblue',
      'white',
      'lightseagreen',
      'white',
      'lightskyblue',
      'mediumturquoise',
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return {
    randomColor,
  };
}
