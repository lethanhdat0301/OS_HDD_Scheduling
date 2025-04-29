import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { useLocation } from 'react-router-dom';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale);

const FCFS = () => {
  const location = useLocation();
  const {start, requests, diskSize} = location.state || {};

  const parsedStart = parseInt(start, 10);
  const parsedRequests = requests?.split(',').map(Number);
  const parsedDiskSize = parseInt(diskSize, 10);

  const sequence = [parsedStart, ...parsedRequests];

  const data = {
    labels: sequence.map((_, index) => index),
    datasets: [
      {
        label: 'Track Movement (FCFS)',
        data: sequence,
        fill: false,
        borderColor: 'blue',
        backgroundColor: 'blue',
        tension: 0,
        pointRadius: 5,
        pointHoverRadius: 7,
      }
    ]
  };

  const totalMovement = sequence.reduce((acc, cur, i, arr) => {
    if (i === 0) return 0;
    return acc + Math.abs(cur - arr[i - 1]);
  }, 0);

  const options = {
    plugins: {
      datalabels: {
        align: 'top',
        anchor: 'end',
        color: 'black',
        font: {
          weight: 'bold',
          size: 12
        },
        formatter: function(value) {
          return value;
        },
        clamp: true,
        clip: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Thứ tự yêu cầu'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Số hiệu trục rãnh'
        },
        min: 0,
        max: parsedDiskSize
      }
    }
  };

  return (
    <div style={{ width: '80%', margin: 'auto', paddingTop: '40px' }}>
      <h2>Thuật toán FCFS (First-Come, First-Served)</h2>
      <p>Các yêu cầu: {parsedRequests.join(', ')}</p>
      <p>Đầu đọc bắt đầu tại trục rãnh: {parsedStart}</p>
      <p><strong>Tổng số trục rãnh đã di chuyển: {totalMovement}</strong></p>
      <Line data={data} options={options} />
    </div>
  );
};

export default FCFS;
