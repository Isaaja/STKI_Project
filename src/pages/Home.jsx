import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import fetchData from "../api/News";

const Home = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); // State untuk pagination
  const [error, setError] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await fetchData({ category, page });
      if (error) {
        setError(error);
      } else {
        setData(data);
      }
    };

    getData();
  }, [category, page]);

  if (error) {
    return <div className="text-red-500">Error fetching data: {error}</div>;
  }

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-start lg:ml-3 font-mulish">
      <div className="max-w-screen-xl mt-2 mx-auto w-full px-4 lg:px-8">
        <div className="font-black text-[#F60E2A] text-xl lg:text-2xl mb-4">
          BERITA LAINNYA
        </div>
        {/* Grid container for cards */}
        <div className="grid grid-cols-2 gap-4 pb-4 lg:pb-0 lg:grid-cols-4 mt-4">
          {data.map((item, index) => (
            <Card
              key={item.id || index}
              id={item.id}
              title={item.title}
              image={item.image}
              // summary={item.summary} // Uncomment if needed
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
