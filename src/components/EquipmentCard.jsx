import { mono, monoRegular } from '../constants/fonts';
import { useThemeColors } from '../constants/theme';
import IconLinkSection from './IconLinkSection';
import ContextSparkle from './ContextSparkle';

export default function EquipmentCard({ name, make, model, year, image, people, resources, workflows, isLast, staggerStyle }) {
  const theme = useThemeColors();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '25%', paddingLeft: '24px', paddingRight: '24px', borderRight: isLast ? 'none' : '0.5px dashed #35383D59', boxSizing: 'border-box', ...staggerStyle }}>
      <span style={{ fontFamily: mono, fontSize: '19px', fontWeight: 500, letterSpacing: '0.02em', lineHeight: '22px', color: '#49413F', textTransform: 'capitalize' }}>{name}</span>
      <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '28px' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', backgroundColor: theme.imageMat, borderRadius: '16px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {image && <img src={image.url} alt="" style={{ width: '80%', height: '85%', objectFit: 'contain' }} />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '16px', width: '100%' }}>
          <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: '#49413F' }}>{make}</span>
          <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: '#49413F' }}>{model}</span>
          <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: '#49413F' }}>{year}</span>
        </div>
      </div>
      <IconLinkSection icon="person" items={people} />
      <IconLinkSection icon="book" items={resources} />
      <IconLinkSection icon="list" items={workflows} />
      <ContextSparkle />
    </div>
  );
}
