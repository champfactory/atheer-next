import { monoRegular } from '../constants/fonts';
import { useThemeColors } from '../constants/theme';

export default function SubTabBar({ tabs, activeTab, onTabChange, filters, activeFilter, onFilterChange }) {
  const theme = useThemeColors();
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', backgroundColor: '#F8F7F7', paddingBottom: '8px', paddingLeft: '56px', paddingRight: '56px', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <div key={tab} onClick={() => onTabChange(tab)} style={{ display: 'inline-block', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '24px', paddingRight: '24px', cursor: 'pointer', ...(isActive ? { backgroundColor: theme.highlight, borderRadius: '9999px' } : {}) }}>
              <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: isActive ? '#49413F' : '#716E74', textTransform: 'capitalize' }}>{tab}</span>
            </div>
          );
        })}
      </div>
      {filters && (
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          {filters.map((f) => {
            const isActive = f === activeFilter;
            return (
              <div key={f} onClick={() => onFilterChange(f)} style={{ display: 'inline-block', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '24px', paddingRight: '24px', cursor: 'pointer', ...(isActive ? { backgroundColor: theme.highlight, borderRadius: '9999px' } : {}) }}>
                <span style={{ fontFamily: monoRegular, fontSize: '13px', lineHeight: '18px', color: isActive ? '#49413F' : '#716E74', textTransform: 'capitalize' }}>{f}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
