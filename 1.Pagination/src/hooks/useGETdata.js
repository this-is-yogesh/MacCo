import { useEffect, useState } from "react";
import axios from "axios";

export default function useGETData(endpoint) {
  const [data, setData] = useState();
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      let dataJSON = await axios.get(endpoint);
      let {
        data: { products: renamedPR },
      } = dataJSON;
      setData(renamedPR);
    } catch (e) {
      console.log(e, "errorFailData");
    }
  }

  return { data: data };
}
