import './App.css';

import React, { useState } from 'react'
import Navbar from './compnents/Navbar';
import News from './compnents/News';
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App =()=> {
  const [progress, setProgress] = useState(0);

    return (
      <div>
        <Router>
        <LoadingBar
        color="#f11946"
        height={3}
        progress={progress}
      />
          <Navbar/>
          <Routes>
            <Route path="/" element={<News setProgress={setProgress} key="general" pageSize={12} category="general" />} />
            <Route path="/business" element={<News setProgress={setProgress} key="business" pageSize={12} category="business" />} />
            <Route path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={12} category="entertainment" />} />
            <Route path="/health" element={<News setProgress={setProgress} key="health" pageSize={12} category="health" />} />
            <Route path="/science" element={<News setProgress={setProgress} key="science" pageSize={12} category="science" />} />
            <Route path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={12} category="sports" />} />
            <Route path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={12} category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
export default App;
