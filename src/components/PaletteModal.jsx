import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { mono, monoRegular } from '../constants/fonts';
import { colorPalettes, ThemeContext } from '../constants/theme';

export default function PaletteModal({ onClose }) {
  const { palette, setPalette } = useContext(ThemeContext);
  return createPortal(
    <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', paddingTop: '32px', paddingBottom: '32px', paddingLeft: '40px', paddingRight: '40px', minWidth: '320px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
        <span style={{ fontFamily: mono, fontSize: '19px', fontWeight: 500, lineHeight: '24px', color: '#49413F', display: 'block', paddingBottom: '24px' }}>Color Palette</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {colorPalettes.map((p, pi) => (
            <div key={pi} onClick={() => { setPalette(pi); onClose(); }} style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', paddingTop: '10px', paddingBottom: '10px', paddingLeft: '12px', paddingRight: '12px', borderRadius: '8px', backgroundColor: palette === pi ? colorPalettes[palette].colors[2] : 'transparent', transition: 'background-color 0.15s' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {p.colors.map((color, ci) => (
                  <div key={ci} style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: color }} />
                ))}
              </div>
              <span style={{ fontFamily: monoRegular, fontSize: '14px', lineHeight: '18px', color: palette === pi ? '#49413F' : '#716E74' }}>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
