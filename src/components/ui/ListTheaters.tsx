import { Tabs } from "antd";
import { getListMovieTheater } from "apis/movieApi";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { InfoRap } from "types";

export const ListTheaters = () => {
  const [dataTheater, setDataTheater] = useState([]);
  console.log("dataTheater", dataTheater);
  console.log(dataTheater[1]);
  const fetchData = async () => {
    try {
      const res = await getListMovieTheater();
      setDataTheater(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateTabItems = () => {
    if (!dataTheater.length) return [];
    return dataTheater.map((theater: InfoRap, index) => ({
      key: String(index + 1),
      label: (
        <img
          src={theater.logo}
          alt={theater.maHeThongRap}
          style={{ width: 100, height: 100 }}
        />
      ),
    }));
  };

  return (
    <ListTheatersStyled>
      <div className="container mx-auto">
        <Title>Danh sách rạp phim</Title>
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          items={generateTabItems()}
        />
      </div>
    </ListTheatersStyled>
  );
};

const ListTheatersStyled = styled.div`
  padding: 20px;
  background: #1f1e24;
`;

const Title = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: 700;
  margin: 20px 0;
`;
