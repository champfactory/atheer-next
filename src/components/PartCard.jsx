import { mono, monoRegular } from '../constants/fonts';
import { ICON_PATHS } from '../constants/icons';
import { useThemeColors } from '../constants/theme';
import ContextSparkle from './ContextSparkle';

export default function PartCard({ name, partNumber, price, image, make, model, year, resource, isLast, staggerStyle }) {
  const theme = useThemeColors();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '25%', paddingLeft: '24px', paddingRight: '24px', borderRight: isLast ? 'none' : '0.5px dashed #35383D59', boxSizing: 'border-box', ...staggerStyle }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: mono, fontSize: '19px', fontWeight: 500, lineHeight: '24px', color: '#49413F', textTransform: 'capitalize' }}>{name}</span>
            <span style={{ fontFamily: mono, fontSize: '17px', fontWeight: 500, lineHeight: '22px', color: '#49413F', paddingTop: '6px' }}>{partNumber}</span>
            <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: '#49413F', paddingTop: '6px' }}>{price}</span>
          </div>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', backgroundColor: theme.imageMat, borderRadius: '16px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src={image} alt="" style={{ width: '80%', height: '85%', objectFit: 'contain' }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '16px' }}>
          <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: '#49413F' }}>Make: {make}</span>
          <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: '#49413F', paddingTop: '6px' }}>Model: {model}</span>
          <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: '#49413F', paddingTop: '6px' }}>Year: {year}</span>
        </div>
      </div>
      {resource && (
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '28px' }}>
          <div className="link-row" style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingTop: '12px', width: '100%' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={theme.link} viewBox="0 0 256 256" style={{ flexShrink: 0 }}>
              <path d={ICON_PATHS.book} />
            </svg>
            <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: theme.link, textTransform: 'capitalize', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1 }}>{resource}</span>
          </div>
        </div>
      )}
      <ContextSparkle />
    </div>
  );
}
