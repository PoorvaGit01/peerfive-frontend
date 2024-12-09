import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import NewUserPage from './pages/NewUser';
import ViewUserPage from './pages/ ViewUser';
import P5HistoryPage from './pages/P5HistoryPage';
import RewardHistoryPage from './pages/RewardHistoryPage';
import NewRewardPage from './pages/NewReward';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewUserPage />} />
        <Route path="/:id" element={<ViewUserPage />} />
        <Route path="/:id/p5" element={<P5HistoryPage />} />
        <Route path="/:id/rewards" element={<RewardHistoryPage />} />
        <Route path="/:id/rewards/new" element={<NewRewardPage />} />
      </Routes>
    </Router>
  );
}

export default App;

