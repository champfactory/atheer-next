import { monoRegular } from '../constants/fonts';
import { SPARKLE_PATH } from '../constants/icons';

export default function ContextSparkle({ color = '#FF0000' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingTop: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: '19px' }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d={SPARKLE_PATH} fill={color} />
          </svg>
        </div>
        <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: '#49413F', textTransform: 'capitalize' }}>Context</span>
      </div>
    </div>
  );
}
