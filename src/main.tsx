import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';

const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      {/* სხვა routes */}
    </Routes>
  </HashRouter>
);

export default Root;
