import { monoRegular } from '../constants/fonts';
import { ICON_PATHS } from '../constants/icons';
import { useThemeColors } from '../constants/theme';

export default function TrainingColumn({ label, icon, items, staggerStyle }) {
  const theme = useThemeColors();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, paddingRight: '40px', width: '366px', boxSizing: 'border-box', ...staggerStyle }}>
      <div style={{ paddingTop: '8px', paddingBottom: '8px' }}>
        <span style={{ fontFamily: monoRegular, fontSize: '10px', lineHeight: '12px', letterSpacing: '0.04em', color: '#716E74', textTransform: 'uppercase' }}>{label}</span>
      </div>
      {items.length === 0 ? (
        <div style={{ borderTop: '0.5px solid #35383D59', paddingTop: '24px', paddingBottom: '24px', width: '100%' }} />
      ) : (
        items.map((item, i) => (
          <div key={i} style={{ borderTop: '0.5px solid #35383D59', paddingTop: '24px', paddingBottom: '24px', width: '100%' }}>
            <div className="link-row" style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={theme.link} viewBox="0 0 256 256" style={{ flexShrink: 0 }}>
                <path d={ICON_PATHS[icon]} />
              </svg>
              <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: theme.link, textTransform: 'capitalize', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1 }}>{item}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
