import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Legend, Tooltip, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import './yearchart.scss'

import React from 'react';

ChartJS.register(Tooltip, Legend, LineElement, PointElement, LinearScale, Title, CategoryScale);


const YearChart = ({ data }) => {
  console.log({ data })
  let propData =
    [
      {
        "targetYear": 1990,
        "firstHalfNum": 10,
        "secondHalfNum": 8,
        "totalNum": 9
      },
      {
        "targetYear": 1991,
        "firstHalfNum": 2,
        "secondHalfNum": 9,
        "totalNum": 2
      },
      {
        "targetYear": 1992,
        "firstHalfNum": 3,
        "secondHalfNum": 10,
        "totalNum": 4
      },
      {
        "targetYear": 1993,
        "firstHalfNum": 4,
        "secondHalfNum": 11,
        "totalNum": 6
      },
      {
        "targetYear": 1994,
        "firstHalfNum": 5,
        "secondHalfNum": 3,
        "totalNum": 8
      },
      {
        "targetYear": 1995,
        "firstHalfNum": 6,
        "secondHalfNum": 4,
        "totalNum": 1
      },
      {
        "targetYear": 1996,
        "firstHalfNum": 7,
        "secondHalfNum": 5,
        "totalNum": 3
      },
      {
        "targetYear": 1997,
        "firstHalfNum": 8,
        "secondHalfNum": 6,
        "totalNum": 5
      },
      {
        "targetYear": 1998,
        "firstHalfNum": 9,
        "secondHalfNum": 7,
        "totalNum": 7
      },
      {
        "targetYear": 1999,
        "firstHalfNum": 10,
        "secondHalfNum": 8,
        "totalNum": 9
      },
      {
        "targetYear": 2000,
        "firstHalfNum": 11,
        "secondHalfNum": 9,
        "totalNum": 2
      },
      {
        "targetYear": 2001,
        "firstHalfNum": 3,
        "secondHalfNum": 10,
        "totalNum": 4
      },
      {
        "targetYear": 2002,
        "firstHalfNum": 4,
        "secondHalfNum": 11,
        "totalNum": 6
      },
      {
        "targetYear": 2003,
        "firstHalfNum": 5,
        "secondHalfNum": 12,
        "totalNum": 8
      },
      {
        "targetYear": 2004,
        "firstHalfNum": 6,
        "secondHalfNum": 4,
        "totalNum": 1
      },
      {
        "targetYear": 2005,
        "firstHalfNum": 7,
        "secondHalfNum": 5,
        "totalNum": 3
      },
      {
        "targetYear": 2006,
        "firstHalfNum": 8,
        "secondHalfNum": 6,
        "totalNum": 5
      },
      {
        "targetYear": 2007,
        "firstHalfNum": 9,
        "secondHalfNum": 7,
        "totalNum": 7
      },
      {
        "targetYear": 2008,
        "firstHalfNum": 10,
        "secondHalfNum": 8,
        "totalNum": 9
      },
      {
        "targetYear": 2009,
        "firstHalfNum": 11,
        "secondHalfNum": 9,
        "totalNum": 2
      },
      {
        "targetYear": 2010,
        "firstHalfNum": 12,
        "secondHalfNum": 10,
        "totalNum": 4
      },
      {
        "targetYear": 2011,
        "firstHalfNum": 4,
        "secondHalfNum": 11,
        "totalNum": 6
      },
      {
        "targetYear": 2012,
        "firstHalfNum": 5,
        "secondHalfNum": 12,
        "totalNum": 8
      },
      {
        "targetYear": 2013,
        "firstHalfNum": 6,
        "secondHalfNum": 13,
        "totalNum": 1
      },
      {
        "targetYear": 2014,
        "firstHalfNum": 7,
        "secondHalfNum": 5,
        "totalNum": 3
      },
      {
        "targetYear": 2015,
        "firstHalfNum": 8,
        "secondHalfNum": 6,
        "totalNum": 5
      },
      {
        "targetYear": 2016,
        "firstHalfNum": 9,
        "secondHalfNum": 7,
        "totalNum": 7
      },
      {
        "targetYear": 2017,
        "firstHalfNum": 10,
        "secondHalfNum": 8,
        "totalNum": 9
      },
      {
        "targetYear": 2018,
        "firstHalfNum": 11,
        "secondHalfNum": 9,
        "totalNum": 2
      },
      {
        "targetYear": 2019,
        "firstHalfNum": 12,
        "secondHalfNum": 10,
        "totalNum": 4
      },
      {
        "targetYear": 2020,
        "firstHalfNum": 13,
        "secondHalfNum": 11,
        "totalNum": 6
      }
    ]

  if (data) {
    propData = data
  }

  const options = {
    elements: {
      point: {
        radius: 0.5, // 점 제거
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        grid: {
          display: false,
        },
      },
    },
    legend: {
      display: true,
      labels: {
        // legend options reference https://www.chartjs.org/docs/latest/configuration/legend.html#legend-label-configuration
        boxWidth: 10,
        boxHeight: 50000000, // fontSize에 비례함
        fontSize: 11,
        fontColor: '#263238',
        generateLabels: function (chart) {
          // Legend Item Interface - https://www.chartjs.org/docs/latest/configuration/legend.html#legend-item-interface
          const labels = Chart.defaults.global.legend.labels.generateLabels(chart);
          return labels.map(property => {
            return { ...property, fillStyle: property.strokeStyle };
          });
        },
      },
      position: 'bottom', // label를 넣어주지 않으면 position이 먹히지 않음
      // align: 'start',
    },
    plugins: {
      title: {
        display: true,
        align: 'start',
        text: '연도운 추이'
      }
    }
  }

  const pligins = [
    {
      beforeInit: function (chart) {
        chart.legend.afterFit = function () {
          chart.legend.options.labels.padding = 10;
          // chart.height += 30;
        };
      },
    },
  ];

  const graphData = {
    labels: propData.map(item => item.targetYear),
    datasets: [
      {
        label: "상반기수",
        data: propData.map(item => item.firstHalfNum),
        borderColor: "#DCD3CB",
        backgroundColor: "#DCD3CB",
        borderWidth: 1.5,

      },
      {
        label: "하반기수",
        data: propData.map(item => item.secondHalfNum),
        borderColor: "#D2DBE1",
        backgroundColor: "#D2DBE1",
        borderWidth: 1.5,

      },
      {
        label: "총운수",
        data: propData.map(item => item.totalNum),
        fill: false,
        borderColor: "#FF99A3",
        backgroundColor: "#FF99A3",
        borderWidth: 1.5,



      }
    ]
  };

  return (
    <div className='mainWrapper'>
      <Line data={graphData} options={options} plugins={pligins} />

    </div>
  );
};

export default YearChart;
