
import Sidebar from './components/common/Sidebar';
import DataUsageCard from './components/Dashboard/DataUsage/DataUsageCard';
import OverviewCard from './components/Dashboard/OverView/OverviewCard';
import TopUsageCard from './components/Dashboard/TopUsage/TopUsageCard';
import MainPage from './Pages/MainPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/overview" element={<OverviewCard />} />
          <Route path="/datausage" element={<DataUsageCard />} />
          <Route path="/topusage" element={<TopUsageCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
