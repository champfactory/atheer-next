import { mono, monoRegular } from '../constants/fonts';
import { ICON_PATHS, STATUS_SHAPES } from '../constants/icons';
import { useThemeColors } from '../constants/theme';
import ContextSparkle from './ContextSparkle';

export default function JobCard({ id, status, company, time, image, equipment, progress, links, isLast, staggerStyle }) {
  const theme = useThemeColors();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingLeft: '24px', paddingRight: '24px', width: '100%', borderRight: isLast ? 'none' : '0.5px dashed #35383D59', boxSizing: 'border-box', ...staggerStyle }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%' }}>
            <span style={{ fontFamily: mono, fontSize: '19px', fontWeight: 500, lineHeight: '24px', color: '#49413F', textTransform: 'capitalize' }}>{id}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="#E53935" style={{ flexShrink: 0 }}>
              <path d={STATUS_SHAPES[status]} />
            </svg>
          </div>
          <span style={{ fontFamily: mono, fontSize: '17px', fontWeight: 500, lineHeight: '22px', color: '#49413F', textTransform: 'capitalize' }}>{company}</span>
          <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: '#49413F', textTransform: 'capitalize' }}>{time}</span>
        </div>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', backgroundColor: theme.imageMat, borderRadius: '16px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {image && <img src={image} alt="" style={{ width: '80%', height: '85%', objectFit: 'contain' }} />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {equipment.map((line, i) => (
            <span key={i} style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: '#49413F' }}>{line}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {progress.map((line, i) => (
          <span key={i} style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: '#49413F', textTransform: 'capitalize' }}>{line}</span>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {links.map((link, i) => (
          <div key={i} className="link-row" style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={theme.link} viewBox="0 0 256 256" style={{ flexShrink: 0 }}>
              <path d={ICON_PATHS[link.icon]} />
            </svg>
            <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: theme.link, textTransform: 'capitalize' }}>{link.label}</span>
          </div>
        ))}
      </div>
      <ContextSparkle />
    </div>
  );
}
