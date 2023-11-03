import React from 'react';
import './App.css';
import { TableData } from './Components/TableData';
import { GammaTable } from './Components/GammaTable';

function App() {
  return (
    //Here is our Root component that are showing all components here
    <div className="App">
      <h1 style={{color: "red"}}>Assignment of Manufac Analytics (Data Visualization Task)</h1>
<TableData />
<GammaTable />
    </div>
  );
}

export default App;
