import { mono, monoRegular } from '../constants/fonts';
import { ICON_PATHS, STATUS_SHAPES, ATHEER_LOGO_PATH } from '../constants/icons';
import { useThemeColors } from '../constants/theme';
import { sidebarItems } from '../constants/data';

export default function Sidebar({ active = 'Home', onNavigate }) {
  const theme = useThemeColors();
  return (
    <div style={{ width: '220px', display: 'flex', flexDirection: 'column', flexShrink: 0, paddingTop: '58px', paddingBottom: '24px', paddingLeft: '16px', paddingRight: '16px', borderRight: '0.5px dashed #35383D59', alignSelf: 'stretch', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '42px' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '4px', paddingLeft: '2px', paddingRight: '2px' }}>
          <svg width="19" height="18" viewBox="0 0 578 539" fill="none" style={{ flexShrink: 0 }}>
            <path fillRule="evenodd" clipRule="evenodd" d={ATHEER_LOGO_PATH} fill={theme.accent} />
          </svg>
          <span style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: '15px', fontWeight: 700, letterSpacing: '0.08em', lineHeight: '18px', color: '#49413F', whiteSpace: 'nowrap' }}> ATHEER</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {sidebarItems.map((item, i) => {
          const isActive = item.label === active && (i === 0 || item.label === 'Settings');
          return (
            <div key={i} className={`nav-item${isActive ? ' nav-active' : ''}`} onClick={() => onNavigate && onNavigate(item.label)} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '10px', paddingBottom: '10px', paddingLeft: item.label === 'Sessions' ? '20px' : '22px', paddingRight: item.label === 'Sessions' ? '20px' : '22px', cursor: 'pointer', ...(isActive ? { backgroundColor: theme.navActiveBg, borderRadius: '9999px' } : {}) }}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 0%', gap: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={isActive ? '#49413F' : '#716E74'} viewBox="0 0 256 256">
                    <path d={ICON_PATHS[item.icon]} />
                  </svg>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontFamily: mono, fontSize: '14px', fontWeight: 500, lineHeight: '18px', color: isActive ? '#49413F' : '#716E74' }}>{item.label}</span>
                    {item.shape && (
                      <svg width="16" height="16" viewBox="0 0 256 256" fill="#E53935" style={{ fill: 'rgb(229, 57, 53)', flexShrink: 0 }}>
                        <path d={STATUS_SHAPES[item.shape]} />
                      </svg>
                    )}
                  </div>
                </div>
                {item.subtitle && (
                  <div style={{ paddingLeft: '24px' }}>
                    <span style={{ fontFamily: monoRegular, fontSize: '10px', lineHeight: '12px', color: '#716E74' }}>{item.subtitle}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
