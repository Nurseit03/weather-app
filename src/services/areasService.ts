import { fetchCountries } from '@/api/areas/countries';

export const fetchAndFilterCountries = async () => {
  try {
    const countries = await fetchCountries();
    const data = await countries.json();

    const countriesData = Array.isArray(data) ? data : [];

    const otherRegionsObject = countriesData.find(
      (region) => region?.name === 'Другие регионы'
    );

    if (otherRegionsObject && otherRegionsObject.areas) {
      return [
        ...countriesData.filter((region) => region !== otherRegionsObject),
        ...otherRegionsObject.areas,
      ];
    } else {
      return countriesData;
    }
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error; 
  }
};
