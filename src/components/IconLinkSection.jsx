import IconLink from './IconLink';

export default function IconLinkSection({ icon, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '28px', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item, i) => <IconLink key={i} icon={icon} label={item} />)}
      </div>
    </div>
  );
}
