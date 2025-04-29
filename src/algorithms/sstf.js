import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useLocation } from 'react-router-dom';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, ChartDataLabels);

const SSTF = () => {
  const location = useLocation();
  const {start, requests, diskSize} = location.state || {};
  
  const parsedStart = parseInt(start, 10);
  const parsedRequests = requests?.split(',').map(Number);
  const parsedDiskSize = parseInt(diskSize, 10);

  const sequence = [parsedStart];

  const visited = Array(parsedRequests.length).fill(false);
  let totalMovement = 0;

    let current = parsedStart;
    for(let i = 0; i< parsedRequests.length; i++ ){
        let minDist = Infinity;
        let nextIndex = -1;

        for(let j =0; j< parsedRequests.length; j++){
            if(!visited[j]){
                const dist =Math.abs(current - parsedRequests[j])
                if(dist < minDist){
                    minDist = dist;
                    nextIndex = j;
                }
            }
        }

        visited[nextIndex] = true;
        totalMovement += minDist;
        current = parsedRequests[nextIndex];
        sequence.push(current);
    }

    const data = {
        labels: sequence.map((_, index) => index),
        datasets: [
          {
            label: 'Track Movement (SSTF)',
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
      <h2>Thuật toán SSTF ( Shortest Seek Time First)</h2>
      <p>Các yêu cầu: {parsedRequests.join(', ')}</p>
      <p>Đầu đọc bắt đầu tại trục rãnh: {parsedStart}</p>
      <p>Trình tự truy cập:{sequence.join(' → ')}</p>
      <p><strong>Tổng số trục rãnh đã di chuyển: {totalMovement}</strong></p>
      <Line data={data} options={options} plugins={[ChartDataLabels]}/>
    </div>
  );
};

export default SSTF;
