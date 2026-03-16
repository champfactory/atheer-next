import { mono } from '../constants/fonts';
import { avatarUrl, primaryTabs } from '../constants/data';

export default function PageHeader({ activeTab, onTabChange, onNameClick }) {
  const isHome = activeTab === 'Home';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '129px', paddingLeft: '80px', paddingRight: '80px', boxSizing: 'border-box', flexShrink: 0, backgroundColor: '#F8F7F7' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
        <div onClick={onNameClick} style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundImage: `url(${avatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0, cursor: 'pointer' }} />
        <div onClick={onNameClick} style={{ display: 'inline-block', paddingBottom: '8px', cursor: 'pointer' }}>
          <span style={{ fontFamily: mono, fontSize: '24px', fontWeight: 500, lineHeight: '30px', color: isHome ? '#49413F' : '#716E74' }}>M. Sanchez</span>
        </div>
        {primaryTabs.map((tab) => (
          <div key={tab} onClick={tab === 'Parts' ? undefined : () => onTabChange(tab)} style={{ display: 'inline-block', paddingBottom: '8px', cursor: tab === 'Parts' ? 'default' : 'pointer' }}>
            <span style={{ fontFamily: mono, fontSize: '24px', fontWeight: 500, lineHeight: '30px', color: tab === activeTab ? '#49413F' : '#716E74' }}>{tab}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
