import React, { useState } from 'react';
import './App.css';

import Card from './components/Card';

function App() {
  const [strength, setStrength] = useState(1)
  
  return (
    <div className="App">
        <div className="items-center flex">
          <Card
            title={'pootie action'} 
            strength={1}
            defense={10}
          />
          <Card
            title={'invisible air'} 
            strength={strength}
            defense={1}
            ability={
              <div onClick={() => setStrength(strength + 1)}>
                <p className="cursor-pointer">Add +1/+0</p>
              </div>
            }
          />
        </div>
    </div>
  );
}

export default App;
