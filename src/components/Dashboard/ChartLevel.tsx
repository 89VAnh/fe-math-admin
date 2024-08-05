import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartLevel = ({ levels }: { levels: any }) => {
  const series = levels?.map((x: any) => x.total);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    // colors: ["#5750F1", "#5475E5", "#8099EC", "#ADBCF2"],
    labels: levels?.map((x: any) => x.name),
    legend: {
      show: false,
      position: "bottom",
    },

    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          background: "transparent",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Bài thi",
              fontSize: "16px",
              fontWeight: "400",
            },
            value: {
              show: true,
              fontSize: "28px",
              fontWeight: "bold",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 415,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div className='col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5'>
      <div className='mb-9 justify-between gap-4 sm:flex'>
        <div>
          <h4 className='text-body-2xlg font-bold text-dark dark:text-white'>
            Tỷ lệ cấp bậc bài thi
          </h4>
        </div>
        <div></div>
      </div>

      <div className='mb-8'>
        <div className='mx-auto flex justify-center'>
          <ReactApexChart options={options} series={series} type='donut' />
        </div>
      </div>
    </div>
  );
};

export default ChartLevel;
