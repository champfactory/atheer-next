import { useState } from 'react';
import { monoRegular } from '../constants/fonts';
import { ICON_PATHS } from '../constants/icons';
import { useThemeColors } from '../constants/theme';
import { stagger } from '../constants/animation';
import { homeStats, homeSubTabs, jobCards, certRows, quickActions } from '../constants/data';
import ViewLayout from '../components/ViewLayout';
import SubTabBar from '../components/SubTabBar';
import JobCard from '../components/JobCard';

export default function HomeView({ scrollRef }) {
  const [activeSubTab, setActiveSubTab] = useState('Current Job');
  const [activeFilter, setActiveFilter] = useState('A-Z');
  const theme = useThemeColors();

  return (
    <ViewLayout scrollRef={scrollRef}>
      {/* Stats Banner */}
      <div style={{ display: 'flex', paddingLeft: '40px', paddingRight: '40px', paddingBottom: '40px', backgroundColor: '#F8F7F7' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px', backgroundColor: '#FFFFFF', borderRadius: '9999px', paddingTop: '24px', paddingBottom: '24px', paddingLeft: '40px', paddingRight: '40px', width: '100%' }}>
          {homeStats.map((stat, i) => (
            <span key={i} style={{ fontFamily: monoRegular, fontSize: '16px', lineHeight: '28px', color: '#716E74', whiteSpace: 'nowrap' }}>{stat}</span>
          ))}
        </div>
      </div>

      {/* SubTabBar */}
      <SubTabBar
        tabs={homeSubTabs}
        activeTab={activeSubTab}
        onTabChange={setActiveSubTab}
        filters={['A-Z', 'Recently', 'Unread']}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Tab Content */}
      {activeSubTab === 'Current Job' && (
        <div style={{ display: 'flex', paddingTop: '16px', paddingBottom: '40px', paddingLeft: '56px', paddingRight: '56px', flex: '1 1 0%' }}>
          {jobCards.map((card, i) => (
            <JobCard key={i} {...card} isLast={i === jobCards.length - 1} staggerStyle={stagger(i)} />
          ))}
        </div>
      )}

      {activeSubTab === 'Certifications' && (
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '16px', paddingBottom: '40px', paddingLeft: '80px', paddingRight: '80px' }}>
          {certRows.map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', borderTop: '0.25px dashed #00000059', paddingTop: '24px', paddingBottom: '24px', ...stagger(i) }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#584F4D" viewBox="0 0 256 256" style={{ flexShrink: 0 }}>
                <path d={ICON_PATHS[row.icon]} />
              </svg>
              <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: '#584F4D' }}>{row.text}</span>
              {row.link && (
                <div className="link-row" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: theme.link }}>→ {row.link}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeSubTab === 'Quick Actions' && (
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '16px', paddingBottom: '40px', paddingLeft: '80px', paddingRight: '80px' }}>
          {quickActions.map((action, i) => (
            <div key={i} className="link-row" style={{ display: 'flex', alignItems: 'center', gap: '4px', borderTop: '0.25px dashed #00000059', paddingTop: '24px', paddingBottom: '24px', ...stagger(i) }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={theme.link} viewBox="0 0 256 256" style={{ flexShrink: 0 }}>
                <path d={ICON_PATHS[action.icon]} />
              </svg>
              <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: theme.link, textTransform: 'capitalize' }}>{action.label}</span>
            </div>
          ))}
        </div>
      )}
    </ViewLayout>
  );
}
