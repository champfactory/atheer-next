import { monoRegular } from '../constants/fonts';
import { ICON_PATHS } from '../constants/icons';
import { useThemeColors } from '../constants/theme';

export default function IconLink({ icon, label }) {
  const theme = useThemeColors();
  return (
    <div className="link-row" style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={theme.link} viewBox="0 0 256 256">
        <path d={ICON_PATHS[icon]} />
      </svg>
      <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: theme.link, textTransform: 'capitalize' }}>{label}</span>
    </div>
  );
}
