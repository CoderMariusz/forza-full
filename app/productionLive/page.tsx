'use client';
import React, { useEffect, useState } from 'react';
import ProductionBar from './ProductionBar';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useUserStore } from '@/store/UserStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const options: any = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart'
    }
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

let dataChart = {
  labels,
  datasets: [
    {
      label: 'line 1',
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
    {
      label: 'line 2',
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    },
    {
      label: 'line 3',
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: 'rgba(112, 227, 18, 0.5)'
    }
  ]
};

let dataChart2 = {
  labels: ['Line 1', 'Line 2', 'Line 3'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(198, 142, 21, 0.613)',
        'rgba(61, 173, 51, 0.727)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }
  ]
};

// Mock data format
type LineData = {
  line: number;
  count: number;
  maxCount: number;
};
type ProductionData = {
  totalProduction: number;
  time: string;
};

// TODO: Replace this with actual fetch function
const fetchData = (): Promise<LineData[]> => {
  return fetch('https://first-program.onrender.com/get_counter', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'no-cors'
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    })
    .then((data) => {
      // Assuming the data format is correct and matches LineData[]
      return data as LineData[];
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      return []; // Return empty array in case of error
    });
};

const fetchDataHour = (): Promise<any> => {
  return fetch('https://first-program.onrender.com/get_hour_production')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
};

const ProductionLive: React.FC = () => {
  const [data, setData] = useState<LineData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dayProductionArray, setDayProductionArray] =
    useState<ProductionData>();
  const lineCounts: Record<number, number> = {};
  const user = useUserStore((state) => state.name);

  const fetchDataAndUpdate = async () => {
    const fetchedData = await fetchData();
    const fetchedDataHourProduction = await fetchDataHour();
    // Update running count for each line
    fetchedData.forEach((line) => {
      lineCounts[line.line] = (lineCounts[line.line] || 0) + line.count;
    });

    // Reset counts for the next hour
    Object.keys(lineCounts).forEach((key) => {
      lineCounts[parseInt(key)] = 0;
    });

    setData(fetchedData);

    setDayProductionArray(fetchedDataHourProduction);
  };

  useEffect(() => {
    fetchDataAndUpdate();
    const dataFetchInterval = setInterval(fetchDataAndUpdate, 60000);
    setLoading(!loading);
    return () => {
      clearInterval(dataFetchInterval); // Clear data fetch interval
    };
  }, []);

  useEffect(() => {
    console.log('Data updated:', data);
    if (data.length !== 0) {
      dataChart2.datasets[0].data[0] = data[0].count || 0;
      dataChart2.datasets[0].data[1] = data[1].count || 0;
      dataChart2.datasets[0].data[2] = data[2].count || 0;

      dataChart.datasets[0].data = [
        Math.floor(100 * data[0].count),
        Math.floor(100 * data[0].count),
        Math.floor(100 * data[0].count),
        Math.floor(100 * data[0].count),
        Math.floor(100 * data[0].count),
        Math.floor(100 * data[0].count)
      ];
      dataChart.datasets[1].data = [
        Math.floor(100 * data[1].count),
        Math.floor(100 * data[1].count),
        Math.floor(100 * data[1].count),
        Math.floor(100 * data[1].count),
        Math.floor(100 * data[1].count),
        Math.floor(100 * data[1].count)
      ];
      dataChart.datasets[2].data = [
        Math.floor(100 * data[2].count),
        Math.floor(100 * data[2].count),
        Math.floor(100 * data[2].count),
        Math.floor(100 * data[2].count),
        Math.floor(100 * data[2].count),
        Math.floor(100 * data[2].count)
      ];
    }

    console.log('Data updated:', dataChart2.datasets[0].data);
  }, [data]);

  if (user === '' || user === undefined) {
    return <div>Not authorized</div>;
  }

  return (
    <div className='container mx-auto p-4 bg-slate-800'>
      <h1 className='text-3xl font-bold text-center text-gray-200 mb-6'>
        Production Live View
      </h1>
      <hr className='mb-4' />
      <div className='mb-4'>
        {/* TODO: Display production per hour, total efficiency, etc. */}
        {/* Example placeholders */}
        <p className='text-lg text-gray-400'>
          Production per Hour:{' '}
          <span className='font-semibold'>
            {dayProductionArray !== undefined
              ? dayProductionArray.totalProduction * 8
              : 'N/A'}
          </span>
        </p>
        <p className='text-lg text-gray-500'>
          Total Efficiency:{' '}
          <span className='font-semibold'>
            {' '}
            {dayProductionArray !== undefined
              ? Math.floor(
                  (dayProductionArray.totalProduction * 80000) / 17280
                ) / 100
              : 'N/A'}
          </span>
        </p>
      </div>
      <hr className='mb-6' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data.map((line) => (
          <div
            key={line.line}
            className='bg-white shadow-md rounded-lg p-4'>
            <h2 className='text-xl font-semibold text-gray-700 mb-3'>
              Line Number: {line.line}
            </h2>
            <ProductionBar
              count={line.count}
              maxCount={line.maxCount}
            />
            <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
              <div
                className='bg-blue-600 h-2.5 rounded-full'
                style={{
                  width: `${(line.count / line.maxCount) * 100}%`
                }}></div>
            </div>
          </div>
        ))}
      </div>
      <div className='max-h-[340px]'>
        <Bar
          options={options}
          data={dataChart}
          key={JSON.stringify(dataChart)}
        />
      </div>
      <div className='w-56 h-56'>
        <Pie
          data={dataChart2}
          datasetIdKey={dataChart2.datasets[0].label}
          key={JSON.stringify(dataChart2)}
        />
      </div>
    </div>
  );
};

export default ProductionLive;
