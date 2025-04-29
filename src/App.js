import './App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [algo, setAlgo] = useState('');
  const [start, setStart] = useState('');
  const [requests, setRequests] = useState('');
  const [diskSize, setDiskSize] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedAlgo = localStorage.getItem('algo');
    const saveStart = localStorage.getItem('start');
    const savedRequests = localStorage.getItem('requests');
    const savedDiskSize = localStorage.getItem('diskSize');

    if(savedAlgo) setAlgo(savedAlgo);
    if(saveStart) setStart(saveStart);
    if(savedRequests) setRequests(savedRequests);
    if(savedDiskSize) setDiskSize(savedDiskSize);
    
  }, []);

  const handleClick = () => {
    if(algo && start && requests && diskSize){
      // navigate(`/${algo}?start=${start}&requests=${requests}&diskSize=${diskSize}`);
      localStorage.setItem('algo', algo);
      localStorage.setItem('start', start);
      localStorage.setItem('requests', requests);
      localStorage.setItem('diskSize', diskSize);

      navigate(`/${algo}`, {
        state: { start, requests, diskSize }
      });
    } else{
      alert('Vui lòng điền đầy đủ thông tin.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>HDD Scheduling</p>
        
        <select value={algo} onChange={(e) => setAlgo(e.target.value)}>
          <option value="">-- Choose Algorithm --</option>
          <option value="fcfs">FCFS</option>
          <option value="sstf">SSTF</option>
          <option value="scan">SCAN</option>
          <option value="look">LOOK</option>
          <option value="c_scan">C-SCAN</option>
          <option value="c_look">C-LOOK</option>
          
        </select>
        <input type='number' placeholder='Start Position' value={start} onChange={(e)=> setStart(e.target.value)}/>
        <input type="text" placeholder="Request Queue (eg: 98,183,37)" value={requests} onChange={(e) => setRequests(e.target.value)}/>
        <input type="number" placeholder="Disk Size" value={diskSize} onChange={(e) => setDiskSize(e.target.value)} />
        <button onClick={handleClick}>Go</button>

      </header>
    </div>
  );
}

export default App;
