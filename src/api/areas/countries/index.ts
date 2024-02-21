export async function fetchCountries(): Promise<Response> {
    try {
      const response = await fetch('https://api.hh.ru/areas');
      return response;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  }
  