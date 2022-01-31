import axios from "axios";
import { useEffect, useRef, useState } from "react";

const useFetch = (url) => {
  const cache = useRef({});
  const [isFetched, setIsFetched] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (cache.current[url]) {
        const data = cache.current[url];
        setData(data);
        setIsFetched(true);
      } else {
        try {
          const response = await axios.get(url);
          cache.current[url] = response.data;
          setData(response.data);
          setIsFetched(true);
        } catch {
          setIsError(true);
        }
      }
    };

    fetchData();
  }, [url]);

  return [isFetched, isError, data];
};

export default useFetch;
