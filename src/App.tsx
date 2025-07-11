import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Projects from '@/pages/Projects';
import Inbox from '@/pages/Inbox';
import Calendar from '@/pages/Calendar';
import Reports from '@/pages/Reports';
import HelpCenter from '@/pages/HelpCenter';
import Settings from '@/pages/Settings';
import Teams from '@/pages/Teams';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route index element={<Projects />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="reports" element={<Reports />} />
          <Route path="help" element={<HelpCenter />} />
          <Route path="settings" element={<Settings />} />
          <Route path="teams" element={<Teams />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
