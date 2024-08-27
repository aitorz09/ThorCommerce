import { useEffect } from "react";

export const useProducts = (url :string,setProdcuts) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/products`);
        const data = await response.json();
        setProdcuts(data.products)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);
};
