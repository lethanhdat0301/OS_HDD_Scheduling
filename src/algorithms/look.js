import React, { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useLocation } from 'react-router-dom';


Chart.register(LineElement, PointElement, CategoryScale, LinearScale, ChartDataLabels);

const LOOK = () => {
  const location = useLocation();
  const{start, requests, diskSize} = location.state || {};
  
  const parsedStart = parseInt(start, 10);
  const parsedRequests = requests?.split(',').map(Number);
  const parsedDiskSize = parseInt(diskSize, 10);

  const [moveDirection, setMoveDirection] = useState('down');

  const { sequence, totalMovement } = useMemo(() => {
    const left = parsedRequests.filter(r => r < parsedStart).sort((a, b) => a - b);
    const right = parsedRequests.filter(r => r > parsedStart).sort((a, b) => a - b);

    let sequence = [parsedStart];
    let totalMovement = 0;
    let current = parsedStart;

    if (moveDirection === 'up') {
      for (let i = 0; i < right.length; i++) {
        totalMovement += Math.abs(current - right[i]);
        current = right[i];
        sequence.push(current);
      }

      for (let j = left.length - 1; j >= 0; j--) {
        totalMovement += Math.abs(current - left[j]);
        current = left[j];
        sequence.push(current);
      }
    } else {
      for (let i = left.length - 1; i >= 0; i--) {
        totalMovement += Math.abs(current - left[i]);
        current = left[i];
        sequence.push(current);
      }

      for (let j = 0; j < right.length; j++) {
        totalMovement += Math.abs(current - right[j]);
        current = right[j];
        sequence.push(current);
      }
    }
    return { sequence, totalMovement };
  }, [parsedStart, parsedRequests, moveDirection]);

  const data = {
    labels: sequence.map((_, index) => index),
    datasets: [
      {
        label: 'Track Movement (LOOK)',
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
      <h2>Thuật toán LOOK</h2>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="directionSelect" style={{ marginRight: '10px' }}>
          Chọn hướng di chuyển:
        </label>
        <select
          id="directionSelect"
          value={moveDirection}
          onChange={(e) => setMoveDirection(e.target.value)}
          style={{ padding: '5px' }}
        >
          <option value="up">Up</option>
          <option value="down">Down</option>
        </select>
      </div>

      <p>Các yêu cầu: {parsedRequests.join(', ')}</p>
      <p>Đầu đọc bắt đầu tại trục rãnh: {parsedStart}</p>
      {/* <p>Chiều quét chọn: <strong>{direction.toUpperCase()}</strong></p> */}
      <p><strong>Trình tự truy cập:</strong> {sequence.join(' → ')}</p>
      <p><strong>Tổng số trục rãnh đã di chuyển: {totalMovement}</strong></p>
      <Line data={data} options={options} plugins={[ChartDataLabels]}/>
    </div>
  );
};

export default LOOK;
