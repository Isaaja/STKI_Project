import axios from "axios";
import Card from "../components/Card";
import TopicPopuler_Card from "../components/TopicPopuler_Card";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const News = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { category } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = category
          ? `${import.meta.env.VITE_API_URL}?page=1`
          : `${import.meta.env.VITE_API_URL}?page=1`;

        const response = await axios.get(url); 
        setData(response.data.news); 
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred");
      }
    };

    fetchData();
  }, [category]);

  if (error) {
    return <div className="text-red-500">Error fetching data: {error}</div>;
  }

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full font-mulish">
      <div className=" ml-3 text-xl font-bold text-[#F60E2A] mt-3">TOPIK POPULER</div>
      {/* Grid untuk kartu */}
      <div className="ml-3 grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <TopicPopuler_Card title="#Beritaku 1" />
        <TopicPopuler_Card title="#Beritaku 2" />
        <TopicPopuler_Card title="#Beritaku 3" />
        <TopicPopuler_Card title="#Beritaku 4" />
      </div>
      <div className="ml-3 text-xl font-bold text-[#F60E2A] mt-3">NEWS</div>
      {/* Grid container for cards */}
      <div className="ml-1 grid grid-cols-2 gap-4 pb-4  md:ml-3 lg:pb-0 lg:grid-cols-4 mt-4">
          {data.map((item, index) => (
            <Card
              key={index}
              id={item.id}
              title={item.title}
              image={item.image}
              // summary={item.summary}
            />
          ))}
        </div>
    </div>
  );
};

export default News;
