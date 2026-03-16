import { useState } from 'react';
import { monoRegular } from '../constants/fonts';
import { ICON_PATHS } from '../constants/icons';
import { useThemeColors } from '../constants/theme';
import { stagger } from '../constants/animation';
import { settingsProfile, settingsWork, settingsNotifications } from '../constants/data';
import ViewLayout from '../components/ViewLayout';
import TrainingColumn from '../components/TrainingColumn';
import PaletteModal from '../components/PaletteModal';

export default function SettingsView({ scrollRef }) {
  const [showPaletteModal, setShowPaletteModal] = useState(false);
  const theme = useThemeColors();

  return (
    <ViewLayout scrollRef={scrollRef}>
      <div style={{ display: 'flex', alignItems: 'start', paddingTop: '24px', paddingBottom: '24px', paddingLeft: '80px', paddingRight: '80px', flex: '1 1 0%' }}>
        {/* Profile Column */}
        <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, paddingRight: '40px', width: '366px', boxSizing: 'border-box', ...stagger(0) }}>
          <div style={{ paddingTop: '8px', paddingBottom: '8px' }}>
            <span style={{ fontFamily: monoRegular, fontSize: '10px', lineHeight: '12px', letterSpacing: '0.04em', color: '#716E74', textTransform: 'uppercase' }}>Profile</span>
          </div>
          {settingsProfile.map((item, i) => (
            <div key={i} style={{ borderTop: '0.5px solid #35383D59', paddingTop: '24px', paddingBottom: '24px', width: '100%' }}>
              <div className="link-row" style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={theme.link} viewBox="0 0 256 256" style={{ flexShrink: 0 }}>
                  <path d={ICON_PATHS.person} />
                </svg>
                <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: theme.link, textTransform: 'capitalize' }}>{item}</span>
              </div>
            </div>
          ))}
          {/* Color Palette — opens modal */}
          <div style={{ borderTop: '0.5px solid #35383D59', paddingTop: '24px', paddingBottom: '24px', width: '100%' }}>
            <div className="link-row" onClick={() => setShowPaletteModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={theme.link} viewBox="0 0 256 256" style={{ flexShrink: 0 }}>
                <path d={ICON_PATHS.person} />
              </svg>
              <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: theme.link, textTransform: 'capitalize' }}>Color Palette</span>
            </div>
          </div>
          {showPaletteModal && <PaletteModal onClose={() => setShowPaletteModal(false)} />}
        </div>

        {/* Work Column */}
        <TrainingColumn label="Work" icon="jobs" items={settingsWork} staggerStyle={stagger(1)} />

        {/* Notifications Column */}
        <TrainingColumn label="Notifications" icon="planning" items={settingsNotifications} staggerStyle={stagger(2)} />
      </div>
    </ViewLayout>
  );
}
