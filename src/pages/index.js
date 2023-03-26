import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { DateTime } from "luxon";
import { Card } from "antd";

const MapWithNoSSR = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function Home() {
  const [userIp, setUserIp] = useState([]);
  const [myTime, setMyTime] = useState();
  const [countryInfo, setCountryInfo] = useState([]);

  useEffect(() => {
    const now = DateTime.now().toString();
    setMyTime(now);

    axios
      .get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=064a790cfb2c4d30be1a9b1be5c256b4&excludes=continent_code,currency,time_zone`
      )
      .then((response) => {
        console.log(response);
        setUserIp(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="container mx-auto">
        <Card title="We know everything about you!" style={{ width: "100%" }}>
          <Card
            className="flex flex-col justify-center"
            type="inner"
            title="Personal information"
          >
            <div className="flex flex-col self-center">
              <p className="item font-extrabold">Your IP Adress:</p>
              <p className="item mb-4 bg-zinc-200 text-base font-light">
                {userIp.ip}
              </p>
              <p className="item font-extrabold ">Your IP information:</p>
              <p className="item">Time: {myTime}</p>
              <p className="item">ISP: {userIp.isp}</p>
              <p className="item">City: {userIp.country_capital}</p>
              <p className="item">ZIP: {userIp.zipcode}</p>
              <p className="item">Calling: {userIp.calling_code}</p>
              <p className="item">Language: {userIp.languages}</p>
              <div className="item flex flex-row">
                <p className="item mr-1">City: {userIp.country_name}</p>
                <img
                  className="item"
                  src={userIp.country_flag}
                  style={{ width: "15%", height: "auto" }}
                ></img>
              </div>
            </div>
          </Card>
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="Geographical location"
          >
            {typeof window !== "undefined" && <MapWithNoSSR />}
          </Card>
        </Card>
      </div>
    </div>
  );
}
