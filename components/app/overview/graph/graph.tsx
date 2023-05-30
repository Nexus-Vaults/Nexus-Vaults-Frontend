import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';

type Props = {};

const Graph = (props: Props) => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const handleWindowResize = () => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  const data = [
    { date: 'Jan', amount: 100 },
    { date: 'Feb', amount: 200 },
    { date: 'Mar', amount: 150 },
    { date: 'Apr', amount: 300 },
    { date: 'May', amount: 250 },
  ];

  // Prepare x-axis data (dates)
  const dates = data.map((item) => item.date);

  // Prepare y-axis data (amounts)
  const amounts = data.map((item) => item.amount);

  // Create the chart options
  const options = {
    xAxis: {
      type: 'category',
      data: dates,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'line',
        data: amounts,
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <ReactECharts ref={chartRef} option={options} className="w-full h-full" />
    </div>
  );
};

export default Graph;
