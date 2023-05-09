import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart, { ChartConfiguration } from "chart.js/auto";
import "leaflet/dist/leaflet.css";
import {Box, Heading} from "@chakra-ui/react";


const fetchChartData = async () => {
  return await axios.get<{ cases: Record<string, number> }>(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
};

const Charts = () => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  }>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const [chartRes] = await Promise.all([
        fetchChartData(),
      ]);
      setChartData({
        labels: Object.keys(chartRes.data.cases),
        datasets: [
          {
            label: "COVID-19 Cases",
            data: Object.values(chartRes.data.cases),
            backgroundColor: "red",
          },
        ],
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const chartConfig: ChartConfiguration<"line", number[], string> = {
      type: "line",
      data: {
        ...chartData,
      },
    };
    const myChart = new Chart(
      document.getElementById("myChart") as HTMLCanvasElement,
      chartConfig
    );
    return () => myChart.destroy();
  }, [chartData]);

  return (
    <div className="content-start justify-center	">
      <Heading color={"black"} p={"10px 20px"} bg={"#f7f7f7"}>
        Charts
      </Heading>
      <div id="charts_page_div">
          <Box>
            <Heading>COVID-19 Dashboard</Heading>
            {window.innerWidth > 900 ? (
              <canvas id="myChart" className="w-full h-96"></canvas>
            ) : (
              <canvas id="myChart" className="w-full h-64"></canvas>
            )}
          </Box>
      </div>
    </div>
  );
};

export default Charts;
