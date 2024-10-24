// import React from "react";
// import ReactDOM from "react-dom";
import ReactDOM from '../core/react-dom';

import './index.css';

const jsx = (
  <div className="border">
    <h1>react</h1>
    <a href="https://www.baidu.com/">mini react</a>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(jsx);