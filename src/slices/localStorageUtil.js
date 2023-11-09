
export const getStoredLaptops = () => {
    try {
      const storedData = JSON.parse(localStorage.getItem("laptopRegistrations")) || [];
      return storedData;
    } catch (error) {
      throw error;
    }
  };
  