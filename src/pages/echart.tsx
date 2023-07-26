import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const Echart = () => {
  const domRef = useRef<any>();
  useEffect(() => {
    const current = domRef?.current;
    const chartInit = () => {
      const myChart = echarts.init(current);
      myChart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      });
    };
    chartInit();
  }, []);

  return <div style={{ width: "100%", height: "400px" }} ref={domRef}></div>;
};

export default Echart;
