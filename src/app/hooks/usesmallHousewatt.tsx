import axios from "axios";
import { InfluxDB } from "@influxdata/influxdb-client";
import { useEffect, useState } from "react";


interface smallHouseWatt {
    smallhouseData: string | number | null;
}

interface HouseData {
    _value: number;
}

export default function SmallHouse() {


    const [smallhouseData, setsmallhouseData] = useState<string | number | null>(null)


    useEffect(() => {
        const influxDB = new InfluxDB({
            url: process.env.NEXT_PUBLIC_INFLUXDB_URL as string,
            token: process.env.NEXT_PUBLIC_INFLUXDB_TOKEN as string,
        });

        const queryApi = influxDB.getQueryApi("TTTA");


        const fetchsmallhouseData = async () => {
            const fluxQuery = `
          from(bucket: "TTTA ENERGY")
          |> range(start: -1m)
          |> filter(fn: (r) => r["_measurement"] == "newsmallhouse")
          |> filter(fn: (r) => r["_field"] == "Watts")
          |> last()
          `;

            try {
                const responsesmallhouseData: HouseData[] = await queryApi.collectRows(fluxQuery);
                console.log(responsesmallhouseData)
                setsmallhouseData(responsesmallhouseData[0]._value);
            } catch (error) {
                console.error("Error querying InfluxDB:", error);
            } finally {

            }
        };

        fetchsmallhouseData();
    }, []);


    return {
        smallhouseData
    }
}