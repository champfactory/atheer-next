import { useState, useRef, useEffect } from 'react';
import { colorPalettes, ThemeContext } from './constants/theme';
import Sidebar from './components/Sidebar';
import PageHeader from './components/PageHeader';
import HomeView from './pages/HomeView';
import EquipmentView from './pages/EquipmentView';
import TrainingView from './pages/TrainingView';
import PlaceholderView from './pages/PlaceholderView';
import FinderView from './pages/FinderView';
import WorkflowsView from './pages/WorkflowsView';
import SettingsView from './pages/SettingsView';

const tabViews = { Home: HomeView, Equipment: EquipmentView, Training: TrainingView, Parts: PlaceholderView, Finder: FinderView, Workflows: WorkflowsView, Settings: SettingsView };

export default function App() {
  const [activeTab, setActiveTab] = useState('Equipment');
  const [palette, setPalette] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [activeTab]);

  // Update CSS variable for nav hover color based on palette
  useEffect(() => {
    const c = colorPalettes[palette].colors;
    const hoverColor = c[2] + 'A6';
    document.documentElement.style.setProperty('--nav-hover-bg', hoverColor);
  }, [palette]);

  const ActiveView = tabViews[activeTab] || EquipmentView;

  return (
    <ThemeContext.Provider value={{ palette, setPalette }}>
      <div style={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: '#F8F7F7' }}>
        <Sidebar active={activeTab === 'Home' ? 'Home' : activeTab === 'Settings' ? 'Settings' : null} onNavigate={(label) => { if (label === 'Settings') setActiveTab('Settings'); else if (label === 'Home') setActiveTab('Home'); }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 0%', overflow: 'hidden' }}>
          <PageHeader activeTab={activeTab} onTabChange={setActiveTab} onNameClick={() => setActiveTab('Home')} />
          <ActiveView scrollRef={scrollRef} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
