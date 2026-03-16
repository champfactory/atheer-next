import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

/* ─── FONTS ─── */
const mono = '"Booton-TRIAL-Medium", "Booton-TRIAL", system-ui, sans-serif';
const monoRegular = '"Booton-TRIAL-Regular", "Booton-TRIAL", system-ui, sans-serif';

/* ─── ANIMATION ─── */
const stagger = (i) => ({ opacity: 0, animation: 'fadeIn 0.3s ease forwards', animationDelay: `${i * 80}ms` });

/* ─── THEME ─── */
const colorPalettes = [
  { name: 'Default', colors: ['#CDF2FF', '#CDF5EC', '#DBF5F4', '#48B2FF', '#176331'] },
  { name: 'Warm', colors: ['#FFE8D6', '#FFDDC1', '#FFF1E6', '#E8700A', '#9C4400'] },
  { name: 'Earth', colors: ['#E8DCC8', '#D4C5A9', '#F0EBE0', '#8B7355', '#4A3728'] },
  { name: 'Slate', colors: ['#E0E4EA', '#CDD3DC', '#EDF0F4', '#5A6B80', '#2E3A46'] },
  { name: 'Dusk', colors: ['#E8DEFF', '#D5CEFF', '#F0EBFF', '#7B61C2', '#3D2E6B'] },
];

const ThemeContext = createContext({ palette: 0, setPalette: () => {} });

function useThemeColors() {
  const { palette } = useContext(ThemeContext);
  const c = colorPalettes[palette].colors;
  return { navActiveBg: c[0] + 'A6', imageMat: c[1], highlight: c[2], accent: c[3], link: c[4] };
}

/* ─── CONSTANTS ─── */
const avatarUrl = 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/7G27NF7X15XTBJGT825EP5VSJF.jpg';
const primaryTabs = ['Equipment', 'Training', 'Parts', 'Finder', 'Workflows'];

const SPARKLE_PATH = 'M6.658 13.303C6.531 13.303 6.421 13.259 6.33 13.173C6.239 13.091 6.182 12.981 6.159 12.845C6.054 12.088 5.943 11.434 5.824 10.883C5.706 10.331 5.562 9.864 5.394 9.481C5.225 9.094 5.011 8.773 4.751 8.518C4.496 8.258 4.177 8.046 3.794 7.882C3.411 7.718 2.949 7.581 2.406 7.472C1.864 7.358 1.221 7.251 0.479 7.15C0.337 7.137 0.221 7.084 0.13 6.993C0.043 6.897 0 6.784 0 6.651C0 6.519 0.043 6.408 0.13 6.316C0.221 6.221 0.337 6.164 0.479 6.146C1.367 6.05 2.115 5.936 2.721 5.804C3.331 5.667 3.833 5.48 4.225 5.243C4.621 5.006 4.94 4.689 5.182 4.293C5.423 3.892 5.617 3.379 5.763 2.755C5.909 2.131 6.041 1.363 6.159 0.451C6.182 0.314 6.239 0.205 6.33 0.123C6.421 0.041 6.531 0 6.658 0C6.786 0 6.895 0.041 6.986 0.123C7.077 0.205 7.134 0.314 7.157 0.451C7.276 1.363 7.408 2.131 7.554 2.755C7.7 3.379 7.891 3.892 8.128 4.293C8.369 4.689 8.686 5.006 9.078 5.243C9.475 5.48 9.978 5.667 10.589 5.804C11.2 5.936 11.949 6.05 12.838 6.146C12.975 6.164 13.088 6.221 13.18 6.316C13.271 6.408 13.316 6.519 13.316 6.651C13.316 6.784 13.271 6.897 13.18 6.993C13.088 7.084 12.975 7.137 12.838 7.15C11.949 7.251 11.2 7.369 10.589 7.506C9.978 7.638 9.475 7.823 9.078 8.06C8.686 8.297 8.369 8.616 8.128 9.017C7.891 9.413 7.7 9.924 7.554 10.548C7.408 11.168 7.276 11.933 7.157 12.845C7.134 12.981 7.077 13.091 6.986 13.173C6.895 13.259 6.786 13.303 6.658 13.303Z';

/* ─── SVG ICON PATHS ─── */
const ICON_PATHS = {
  home: 'M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z',
  planning: 'M208,34H182V24a6,6,0,0,0-12,0V34H86V24a6,6,0,0,0-12,0V34H48A14,14,0,0,0,34,48V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V48A14,14,0,0,0,208,34ZM48,46H74V56a6,6,0,0,0,12,0V46h84V56a6,6,0,0,0,12,0V46h26a2,2,0,0,1,2,2V82H46V48A2,2,0,0,1,48,46ZM208,210H48a2,2,0,0,1-2-2V94H210V208A2,2,0,0,1,208,210Zm-70-78a10,10,0,1,1-10-10A10,10,0,0,1,138,132Zm44,0a10,10,0,1,1-10-10A10,10,0,0,1,182,132ZM94,172a10,10,0,1,1-10-10A10,10,0,0,1,94,172Zm44,0a10,10,0,1,1-10-10A10,10,0,0,1,138,172Zm44,0a10,10,0,1,1-10-10A10,10,0,0,1,182,172Z',
  forms: 'M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z',
  jobs: 'M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z',
  content: 'M120,64a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16h72A8,8,0,0,1,120,64Zm-8,32H40a8,8,0,0,0,0,16h72a8,8,0,0,0,0-16Zm0,40H40a8,8,0,0,0,0,16h72a8,8,0,0,0,0-16Zm0,40H40a8,8,0,0,0,0,16h72a8,8,0,0,0,0-16ZM144,72h72a8,8,0,0,0,0-16H144a8,8,0,0,0,0,16Zm72,24H144a8,8,0,0,0,0,16h72a8,8,0,0,0,0-16Zm0,40H144a8,8,0,0,0,0,16h72a8,8,0,0,0,0-16Zm0,40H144a8,8,0,0,0,0,16h72a8,8,0,0,0,0-16Z',
  sessions: 'M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z',
  assets1: 'M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z',
  assets2: 'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm71.87,53.27L136,114.14V40.37A88,88,0,0,1,199.87,77.27ZM120,40.37v83l-71.89,41.5A88,88,0,0,1,120,40.37ZM128,216a88,88,0,0,1-71.87-37.27L207.89,91.12A88,88,0,0,1,128,216Z',
  tickets: 'M232,104a8,8,0,0,0,8-8V64a16,16,0,0,0-16-16H32A16,16,0,0,0,16,64V96a8,8,0,0,0,8,8,24,24,0,0,1,0,48,8,8,0,0,0-8,8v32a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V160a8,8,0,0,0-8-8,24,24,0,0,1,0-48ZM32,167.2a40,40,0,0,0,0-78.4V64H88V192H32Zm192,0V192H104V64H224V88.8a40,40,0,0,0,0,78.4Z',
  settings: 'M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z',
  person: 'M208,34H48A14,14,0,0,0,34,48V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V48A14,14,0,0,0,208,34Zm-18,68h20v52H190Zm20-54V90H190V46h18A2,2,0,0,1,210,48ZM46,208V48a2,2,0,0,1,2-2H178V210H48A2,2,0,0,1,46,208Zm162,2H190V166h20v42A2,2,0,0,1,208,210Zm-58.19-43.49A38,38,0,0,0,131.23,143a30,30,0,1,0-38.45,0A38,38,0,0,0,74.19,166.5a6,6,0,0,0,11.62,3C88.67,158.38,99.93,150,112,150s23.34,8.38,26.19,19.49a6,6,0,0,0,11.62-3ZM94,120a18,18,0,1,1,18,18A18,18,0,0,1,94,120Z',
  book: 'M232,50H160a38,38,0,0,0-32,17.55A38,38,0,0,0,96,50H24a6,6,0,0,0-6,6V200a6,6,0,0,0,6,6H96a26,26,0,0,1,26,26,6,6,0,0,0,12,0,26,26,0,0,1,26-26h72a6,6,0,0,0,6-6V56A6,6,0,0,0,232,50ZM96,194H30V62H96a26,26,0,0,1,26,26V204.31A37.86,37.86,0,0,0,96,194Zm130,0H160a37.87,37.87,0,0,0-26,10.32V88a26,26,0,0,1,26-26h66ZM160,90h40a6,6,0,0,1,0,12H160a6,6,0,0,1,0-12Zm46,38a6,6,0,0,1-6,6H160a6,6,0,0,1,0-12h40A6,6,0,0,1,206,128Zm0,32a6,6,0,0,1-6,6H160a6,6,0,0,1,0-12h40A6,6,0,0,1,206,160Z',
  list: 'M222,128a6,6,0,0,1-6,6H104a6,6,0,0,1,0-12H216A6,6,0,0,1,222,128ZM104,70H216a6,6,0,0,0,0-12H104a6,6,0,0,0,0,12ZM216,186H104a6,6,0,0,0,0,12H216a6,6,0,0,0,0-12ZM42.68,53.37,50,49.71V104a6,6,0,0,0,12,0V40a6,6,0,0,0-8.68-5.37l-16,8a6,6,0,0,0,5.36,10.74ZM72,202H52l21.48-28.74A21.5,21.5,0,0,0,77.79,157,21.75,21.75,0,0,0,69,142.38a22.86,22.86,0,0,0-31.35,4.31,22.18,22.18,0,0,0-3.28,5.92,6,6,0,0,0,11.28,4.11,9.87,9.87,0,0,1,1.48-2.67,10.78,10.78,0,0,1,14.78-2,9.89,9.89,0,0,1,4,6.61,9.64,9.64,0,0,1-2,7.28l-.06.09L35.2,204.41A6,6,0,0,0,40,214H72a6,6,0,0,0,0-12Z',
  study: 'M250.82,90.71l-120-64a5.94,5.94,0,0,0-5.64,0l-120,64a6,6,0,0,0,0,10.58L34,116.67v49.62a14,14,0,0,0,3.55,9.32C50.42,189.94,79.29,214,128,214a127.21,127.21,0,0,0,50-9.73V240a6,6,0,0,0,12,0V198.35a113.18,113.18,0,0,0,28.45-22.75,13.91,13.91,0,0,0,3.55-9.31V116.67l28.82-15.38a6,6,0,0,0,0-10.58ZM128,202c-44,0-70-21.56-81.52-34.41a2,2,0,0,1-.48-1.3V123.07l79.18,42.22a6,6,0,0,0,5.64,0L178,140.13v51C165,197.35,148.45,202,128,202Zm82-35.71a2,2,0,0,1-.48,1.3A100.25,100.25,0,0,1,190,184.3V133.73l20-10.66Zm-22.15-45a6.27,6.27,0,0,0-1-.71l-56-29.86a6,6,0,0,0-5.64,10.58L175.25,128,128,153.2,20.75,96,128,38.8,235.25,96Z',
  hand: 'M188,50a25.8,25.8,0,0,0-14,4.11V44a26,26,0,0,0-51.41-5.51A26,26,0,0,0,82,60v71l-7.53-12.1a26,26,0,0,0-45.11,25.87C60.76,211,78.51,238,128,238a86.1,86.1,0,0,0,86-86V76A26,26,0,0,0,188,50Zm14,102a74.09,74.09,0,0,1-74,74c-21,0-34.51-5.05-46.75-17.45C67.81,195,55.54,172,40.1,139.43l-.23-.43a14,14,0,0,1,24.25-14l.1.17,18.68,30A6,6,0,0,0,94,152V60a14,14,0,0,1,28,0v60a6,6,0,0,0,12,0V44a14,14,0,0,1,28,0v76a6,6,0,0,0,12,0V76a14,14,0,0,1,28,0Z',
  certBadge: 'M126,136a6,6,0,0,1-6,6H72a6,6,0,0,1,0-12h48A6,6,0,0,1,126,136Zm-6-38H72a6,6,0,0,0,0,12h48a6,6,0,0,0,0-12Zm110,62.62V224a6,6,0,0,1-9,5.21l-25-14.3-25,14.3a6,6,0,0,1-9-5.21V198H40a14,14,0,0,1-14-14V56A14,14,0,0,1,40,42H216a14,14,0,0,1,14,14V87.38a49.91,49.91,0,0,1,0,73.24ZM196,86a38,38,0,1,0,38,38A38,38,0,0,0,196,86ZM162,186V160.62a50,50,0,0,1,56-81.51V56a2,2,0,0,0-2-2H40a2,2,0,0,0-2,2V184a2,2,0,0,0,2,2Zm56-17.11a49.91,49.91,0,0,1-44,0v44.77l19-10.87a6,6,0,0,1,6,0l19,10.87Z',
  warningFilled: 'M235.07,189.09,147.61,37.22h0a22.75,22.75,0,0,0-39.22,0L20.93,189.09a21.53,21.53,0,0,0,0,21.72A22.35,22.35,0,0,0,40.55,222h174.9a22.35,22.35,0,0,0,19.6-11.19A21.53,21.53,0,0,0,235.07,189.09ZM224.66,204.8a10.46,10.46,0,0,1-9.21,5.2H40.55a10.46,10.46,0,0,1-9.21-5.2,9.51,9.51,0,0,1,0-9.72L118.79,43.21a10.75,10.75,0,0,1,18.42,0l87.46,151.87A9.51,9.51,0,0,1,224.66,204.8ZM122,144V104a6,6,0,0,1,12,0v40a6,6,0,0,1-12,0Zm16,36a10,10,0,1,1-10-10A10,10,0,0,1,138,180Z',
  shieldCheck: 'M208,42H48A14,14,0,0,0,34,56v56c0,51.94,25.12,83.4,46.2,100.64,22.73,18.6,45.27,24.89,46.22,25.15a6,6,0,0,0,3.16,0c.95-.26,23.49-6.55,46.22-25.15C196.88,195.4,222,163.94,222,112V56A14,14,0,0,0,208,42Zm2,70c0,37.76-13.94,68.39-41.44,91.06A131.17,131.17,0,0,1,128,225.72a130.94,130.94,0,0,1-40.56-22.66C59.94,180.39,46,149.76,46,112V56a2,2,0,0,1,2-2H208a2,2,0,0,1,2,2ZM172.24,99.76a6,6,0,0,1,0,8.48l-56,56a6,6,0,0,1-8.48,0l-24-24a6,6,0,0,1,8.48-8.48L112,151.51l51.76-51.75A6,6,0,0,1,172.24,99.76Z',
  wind: 'M182,184a30,30,0,0,1-30,30c-12.9,0-25.36-8.38-29.63-19.92a6,6,0,0,1,11.26-4.16C136.13,196.69,144.2,202,152,202a18,18,0,0,0,0-36H40a6,6,0,0,1,0-12H152A30,30,0,0,1,182,184ZM150,72a30,30,0,0,0-30-30c-12.9,0-25.36,8.38-29.63,19.92a6,6,0,1,0,11.26,4.16C104.13,59.31,112.2,54,120,54a18,18,0,0,1,0,36H24a6,6,0,0,0,0,12h96A30,30,0,0,0,150,72Zm58,2c-12.9,0-25.36,8.38-29.63,19.92a6,6,0,1,0,11.26,4.16C192.13,91.31,200.2,86,208,86a18,18,0,0,1,0,36H32a6,6,0,0,0,0,12H208a30,30,0,0,0,0-60Z',
  clipboardLight: 'M166,152a6,6,0,0,1-6,6H96a6,6,0,0,1,0-12h64A6,6,0,0,1,166,152Zm-6-38H96a6,6,0,0,0,0,12h64a6,6,0,0,0,0-12Zm54-66V216a14,14,0,0,1-14,14H56a14,14,0,0,1-14-14V48A14,14,0,0,1,56,34H93.17a45.91,45.91,0,0,1,69.66,0H200A14,14,0,0,1,214,48ZM94,64v2h68V64a34,34,0,0,0-68,0ZM202,48a2,2,0,0,0-2-2H170.33A45.77,45.77,0,0,1,174,64v8a6,6,0,0,1-6,6H88a6,6,0,0,1-6-6V64a45.77,45.77,0,0,1,3.67-18H56a2,2,0,0,0-2,2V216a2,2,0,0,0,2,2H200a2,2,0,0,0,2-2Z',
  gearLight: 'M128,82a46,46,0,1,0,46,46A46.06,46.06,0,0,0,128,82Zm0,80a34,34,0,1,1,34-34A34,34,0,0,1,128,162Zm108-54.4a6,6,0,0,0-2.92-4L202.64,86.22l-.42-.71L202.1,51.2A6,6,0,0,0,200,46.64a110.12,110.12,0,0,0-36.07-20.31,6,6,0,0,0-4.84.45L128.46,43.86h-1L96.91,26.76a6,6,0,0,0-4.86-.44A109.92,109.92,0,0,0,56,46.68a6,6,0,0,0-2.12,4.55l-.16,34.34c-.14.23-.28.47-.41.71L22.91,103.57A6,6,0,0,0,20,107.62a104.81,104.81,0,0,0,0,40.78,6,6,0,0,0,2.92,4l30.42,17.33.42.71.12,34.31A6,6,0,0,0,56,209.36a110.12,110.12,0,0,0,36.07,20.31,6,6,0,0,0,4.84-.45l30.61-17.08h1l30.56,17.1A6.09,6.09,0,0,0,162,230a5.83,5.83,0,0,0,1.93-.32,109.92,109.92,0,0,0,36-20.36,6,6,0,0,0,2.12-4.55l.16-34.34c.14-.23.28-.47.41-.71l30.42-17.29a6,6,0,0,0,2.92-4.05A104.81,104.81,0,0,0,236,107.6Zm-11.25,35.79L195.32,160.1a6.07,6.07,0,0,0-2.28,2.3c-.59,1-1.21,2.11-1.86,3.14a6,6,0,0,0-.91,3.16l-.16,33.21a98.15,98.15,0,0,1-27.52,15.53L133,200.88a6,6,0,0,0-2.93-.77h-.14c-1.24,0-2.5,0-3.74,0a6,6,0,0,0-3.07.76L93.45,217.43a98,98,0,0,1-27.56-15.49l-.12-33.17a6,6,0,0,0-.91-3.16c-.64-1-1.27-2.08-1.86-3.14a6,6,0,0,0-2.27-2.3L31.3,143.4a93,93,0,0,1,0-30.79L60.68,95.9A6.07,6.07,0,0,0,63,93.6c.59-1,1.21-2.11,1.86-3.14a6,6,0,0,0,.91-3.16l.16-33.21A98.15,98.15,0,0,1,93.41,38.56L123,55.12a5.81,5.81,0,0,0,3.07.76c1.24,0,2.5,0,3.74,0a6,6,0,0,0,3.07-.76l29.65-16.56a98,98,0,0,1,27.56,15.49l.12,33.17a6,6,0,0,0,.91,3.16c.64,1,1.27,2.08,1.86,3.14a6,6,0,0,0,2.27,2.3L224.7,112.6A93,93,0,0,1,224.73,143.39Z',
  creditCard: 'M224,50H32A14,14,0,0,0,18,64V192a14,14,0,0,0,14,14H224a14,14,0,0,0,14-14V64A14,14,0,0,0,224,50Zm2,142a2,2,0,0,1-2,2H32a2,2,0,0,1-2-2V64a2,2,0,0,1,2-2H224a2,2,0,0,1,2,2ZM50,136a6,6,0,0,1,6-6H72a6,6,0,0,1,0,12H56A6,6,0,0,1,50,136Zm156,0a6,6,0,0,1-6,6H104a6,6,0,0,1,0-12h96A6,6,0,0,1,206,136Zm-48,32a6,6,0,0,1-6,6H56a6,6,0,0,1,0-12h96A6,6,0,0,1,158,168Zm48,0a6,6,0,0,1-6,6H184a6,6,0,0,1,0-12h16A6,6,0,0,1,206,168Z',
  compass: 'M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218ZM173.32,74.63l-64,32a6,6,0,0,0-2.69,2.69l-32,64A6,6,0,0,0,80,182a6.06,6.06,0,0,0,2.68-.63l64-32a6,6,0,0,0,2.69-2.69l32-64a6,6,0,0,0-8.05-8.05Zm-33.79,64.9L93.42,162.58l23-46.11,46.11-23Z',
};

const STATUS_SHAPES = {
  triangle: 'M240.26,186.1,152.81,34.23h0a28.74,28.74,0,0,0-49.62,0L15.74,186.1a27.45,27.45,0,0,0,0,27.71A28.31,28.31,0,0,0,40.55,228h174.9a28.31,28.31,0,0,0,24.79-14.19A27.45,27.45,0,0,0,240.26,186.1Zm-20.8,15.7a4.46,4.46,0,0,1-4,2.2H40.55a4.46,4.46,0,0,1-4-2.2,3.56,3.56,0,0,1,0-3.73L124,46.2a4.75,4.75,0,0,1,8,0l87.45,151.87A3.56,3.56,0,0,1,219.46,201.8Z',
  square: 'M208,28H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28Zm-4,176H52V52H204Z',
  circle: 'M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Z',
};

const ATHEER_LOGO_PATH = 'M226.284 14.128C265.73 -4.709 311.578 -4.709 351.024 14.128C391.469 33.443 422.926 87.795 485.838 196.501C548.947 305.547 580.502 360.071 577.054 404.829C573.691 448.481 550.75 488.265 514.654 513.04C477.642 538.444 414.646 538.444 288.655 538.444C162.663 538.444 99.667 538.444 62.656 513.04C26.559 488.265 3.618 448.481 0.255 404.829C-3.193 360.071 28.362 305.547 91.471 196.501C154.383 87.796 185.84 33.443 226.284 14.128ZM289.062 168.202C210.611 168.202 146.672 231.799 146.672 310.249C146.672 388.7 210.611 452.297 289.062 452.297C367.512 452.297 431.45 388.7 431.45 310.249C431.45 231.799 367.512 168.202 289.062 168.202Z';

/* ─── SIDEBAR NAV DATA ─── */
const sidebarItems = [
  { label: 'Home', icon: 'home', shape: null, subtitle: null },
  { label: 'Planning', icon: 'planning', shape: 'triangle', subtitle: 'Lindgren cert expires tomorrow' },
  { label: 'Forms', icon: 'forms', shape: 'square', subtitle: 'Safety step skipped · #4042' },
  { label: 'Jobs', icon: 'jobs', shape: 'triangle', subtitle: 'Rework flagged · #4021' },
  { label: 'Content', icon: 'content', shape: null, subtitle: null },
  { label: 'Sessions', icon: 'sessions', shape: 'square', subtitle: 'Lindgren + Reeves need guidance' },
  { label: 'Assets', icon: 'assets1', shape: 'square', subtitle: '1 asset down at Meridian' },
  { label: 'Assets', icon: 'assets2', shape: null, subtitle: 'Rework rate up 40% this week' },
  { label: 'Tickets', icon: 'tickets', shape: null, subtitle: null },
  { label: 'Settings', icon: 'settings', shape: null, subtitle: null },
];

/* ─── EQUIPMENT DATA ─── */
const equipmentData = [
  {
    name: 'Arctos 48', make: 'Arctos', model: 'UC-248F', year: '2022',
    image: { url: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKS5VDF9FVBQ4VWB1EE1G0PS.jpg', width: 129, height: 129, left: 49, top: 21 },
    people: ['Elena Vasquez', 'Raj Patel'],
    resources: ["UC-248F Owner's Manual", 'R-404A Refrigerant SDS'],
    workflows: ['Quarterly Coolant Check'],
  },
  {
    name: 'Vortaire MX', make: 'Vortaire', model: 'MX-5200', year: '2021',
    image: { url: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKS5ZEA8AENM05KGP1QA692E.jpg', width: 73, height: 129, left: 77, top: 21 },
    people: ['James Whitfield', 'Dana Kowalski'],
    resources: ['MX-5200 Service Manual'],
    workflows: ['Replace Agitator Seals', 'Align Impeller Assembly', 'CIP Vessel Flush'],
  },
  {
    name: 'Polaris 72', make: 'Polaris', model: 'PR-72T3SS', year: '2019',
    image: { url: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKS625QZ7R2E96V6V5CDJTNJ.jpg', width: 129, height: 129, left: 49, top: 21 },
    people: ['Marcus Chen'],
    resources: ['PR-72T3SS Spec Sheet', 'Compressor Parts Catalog'],
    workflows: ['Defrost Heater Replacement'],
  },
  {
    name: 'Brimstone Pro', make: 'Brimstone', model: 'HP-636N', year: '2020',
    image: { url: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKS64CP6WVCWG544BE5M5V9V.jpg', width: 129, height: 129, left: 49, top: 21 },
    people: ['Sofia Reyes'],
    resources: [],
    workflows: ['Inspect Gas Supply Lines', 'Replace Thermocouple', 'Calibrate Burner Valves', 'Re-seat Pilot Assembly', 'Clean Burner Ports', 'Test Flame Safeguard', 'Annual Gas Leak Check', 'Season Cast Iron Grates', 'Vent Hood Flow Verification'],
  },
];

/* ─── SHARED COMPONENTS ─── */

function ContextSparkle({ color = '#FF0000' }) {
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

function IconLink({ icon, label }) {
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

function IconLinkSection({ icon, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '28px', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item, i) => <IconLink key={i} icon={icon} label={item} />)}
      </div>
    </div>
  );
}

/* ─── SIDEBAR ─── */

function Sidebar({ active = 'Home', onNavigate }) {
  const theme = useThemeColors();
  return (
    <div style={{ width: '220px', display: 'flex', flexDirection: 'column', flexShrink: 0, paddingTop: '58px', paddingBottom: '24px', paddingLeft: '16px', paddingRight: '16px', borderRight: '0.5px dashed #35383D59', alignSelf: 'stretch', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '42px' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '4px', paddingLeft: '2px', paddingRight: '2px' }}>
          <svg width="19" height="18" viewBox="0 0 578 539" fill="none" style={{ flexShrink: 0 }}>
            <path fillRule="evenodd" clipRule="evenodd" d={ATHEER_LOGO_PATH} fill={theme.accent} />
          </svg>
          <span style={{ fontFamily: '"Inter", system-ui, sans-serif', fontSize: '15px', fontWeight: 700, letterSpacing: '0.08em', lineHeight: '18px', color: '#49413F', whiteSpace: 'nowrap' }}> ATHEER</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {sidebarItems.map((item, i) => {
          const isActive = item.label === active && (i === 0 || item.label === 'Settings');
          return (
            <div key={i} className={`nav-item${isActive ? ' nav-active' : ''}`} onClick={() => onNavigate && onNavigate(item.label)} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '10px', paddingBottom: '10px', paddingLeft: item.label === 'Sessions' ? '20px' : '22px', paddingRight: item.label === 'Sessions' ? '20px' : '22px', cursor: 'pointer', ...(isActive ? { backgroundColor: theme.navActiveBg, borderRadius: '9999px' } : {}) }}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 0%', gap: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={isActive ? '#49413F' : '#716E74'} viewBox="0 0 256 256">
                    <path d={ICON_PATHS[item.icon]} />
                  </svg>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontFamily: mono, fontSize: '14px', fontWeight: 500, lineHeight: '18px', color: isActive ? '#49413F' : '#716E74' }}>{item.label}</span>
                    {item.shape && (
                      <svg width="16" height="16" viewBox="0 0 256 256" fill="#E53935" style={{ fill: 'rgb(229, 57, 53)', flexShrink: 0 }}>
                        <path d={STATUS_SHAPES[item.shape]} />
                      </svg>
                    )}
                  </div>
                </div>
                {item.subtitle && (
                  <div style={{ paddingLeft: '24px' }}>
                    <span style={{ fontFamily: monoRegular, fontSize: '10px', lineHeight: '12px', color: '#716E74' }}>{item.subtitle}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── PAGE HEADER ─── */

function PageHeader({ activeTab, onTabChange, onNameClick }) {
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

/* ─── VIEW LAYOUT ─── */

function ViewLayout({ children, scrollRef }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 0%', overflow: 'hidden' }}>
      <div ref={scrollRef} style={{ display: 'flex', flexDirection: 'column', flex: '1 1 0%', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
}

/* ─── EQUIPMENT CARD ─── */

function EquipmentCard({ name, make, model, year, image, people, resources, workflows, isLast, staggerStyle }) {
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

/* ─── EQUIPMENT VIEW ─── */

function EquipmentView({ scrollRef }) {
  return (
    <ViewLayout scrollRef={scrollRef}>
      <div style={{ display: 'flex', flex: '1 1 0%', paddingLeft: '56px', paddingRight: '56px', paddingBottom: '40px' }}>
        {equipmentData.map((eq, i) => <EquipmentCard key={i} {...eq} isLast={i === equipmentData.length - 1} staggerStyle={stagger(i)} />)}
      </div>
    </ViewLayout>
  );
}

/* ─── SUB TAB BAR ─── */

function SubTabBar({ tabs, activeTab, onTabChange, filters, activeFilter, onFilterChange }) {
  const theme = useThemeColors();
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', backgroundColor: '#F8F7F7', paddingBottom: '8px', paddingLeft: '56px', paddingRight: '56px', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <div key={tab} onClick={() => onTabChange(tab)} style={{ display: 'inline-block', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '24px', paddingRight: '24px', cursor: 'pointer', ...(isActive ? { backgroundColor: theme.highlight, borderRadius: '9999px' } : {}) }}>
              <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: isActive ? '#49413F' : '#716E74', textTransform: 'capitalize' }}>{tab}</span>
            </div>
          );
        })}
      </div>
      {filters && (
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          {filters.map((f) => {
            const isActive = f === activeFilter;
            return (
              <div key={f} onClick={() => onFilterChange(f)} style={{ display: 'inline-block', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '24px', paddingRight: '24px', cursor: 'pointer', ...(isActive ? { backgroundColor: theme.highlight, borderRadius: '9999px' } : {}) }}>
                <span style={{ fontFamily: monoRegular, fontSize: '13px', lineHeight: '18px', color: isActive ? '#49413F' : '#716E74', textTransform: 'capitalize' }}>{f}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── TRAINING DATA ─── */

const trainingTabs = ['Welcome', 'Job Aids', 'SOP', 'Onboarding'];
const trainingFilters = ['A-Z', 'Recently', 'Unread'];

const trainingData = {
  Welcome: {
    workflows: ['Burner Calibration Walkthrough', 'Commercial Kitchen Equipment 101', 'EPA 608 Prep Course', 'Gas Appliance Safety Basics', 'Refrigeration Systems Overview'],
    resources: ['Arctos UC Series Field Guide', 'Employee Handbook', 'Field Service Standards v3.1', 'Lockout/Tagout for Kitchen Equipment'],
    people: ['Marcus Chen'],
  },
  'Job Aids': {
    workflows: [],
    resources: [],
    people: ['Raj Patel'],
  },
  SOP: {
    workflows: ['Arctos UC-248F Compressor LOTO', 'Brimstone HP-636N Gas Isolation', 'Vortaire MX-5200 Seal Replacement SOP'],
    resources: ['Field Service Standards v3.1', 'Incident & Near Miss Reporting', 'R-404A Refrigerant Handling Guide'],
    people: ['Elena Vasquez', 'James Whitfield'],
  },
  Onboarding: {
    workflows: ['Company Introduction Training', 'First Service Call Observation', 'New Technician Onboarding Checklist', 'Tool & Equipment Orientation'],
    resources: ['Company Vision & Mission', 'Employee Handbook'],
    people: ['Dana Kowalski', 'Sofia Reyes'],
  },
};

/* ─── TRAINING COLUMN ─── */

function TrainingColumn({ label, icon, items, staggerStyle }) {
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

/* ─── TRAINING VIEW ─── */

function TrainingView({ scrollRef }) {
  const [activeSubTab, setActiveSubTab] = useState('Welcome');
  const [activeFilter, setActiveFilter] = useState('A-Z');
  const data = trainingData[activeSubTab];

  return (
    <ViewLayout scrollRef={scrollRef}>
      <SubTabBar tabs={trainingTabs} activeTab={activeSubTab} onTabChange={setActiveSubTab} filters={trainingFilters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <div key={activeSubTab} style={{ display: 'flex', alignItems: 'start', paddingTop: '16px', paddingBottom: '24px', paddingLeft: '80px', paddingRight: '80px', flex: '1 1 0%' }}>
        <TrainingColumn label="Digital Workflows" icon="list" items={data.workflows} staggerStyle={stagger(0)} />
        <TrainingColumn label="Resources" icon="book" items={data.resources} staggerStyle={stagger(1)} />
        <TrainingColumn label="People" icon="person" items={data.people} staggerStyle={stagger(2)} />
      </div>
    </ViewLayout>
  );
}

/* ─── WORKFLOWS DATA ─── */

const workflowsData = {
  workflows: [
    'Align Impeller Assembly', 'Annual Gas Leak Check', 'Arctos UC-248F Compressor LOTO',
    'Brimstone HP-636N Gas Isolation', 'Burner Calibration Walkthrough', 'Calibrate Burner Valves',
    'CIP Vessel Flush', 'Clean Burner Ports', 'Commercial Kitchen Equipment 101',
    'Company Introduction Training', 'Defrost Heater Replacement', 'EPA 608 Prep Course',
    'First Service Call Observation', 'Gas Appliance Safety Basics', 'Inspect Gas Supply Lines',
    'New Technician Onboarding Checklist', 'Quarterly Coolant Check', 'Refrigeration Systems Overview',
    'Replace Agitator Seals', 'Replace Thermocouple', 'Re-seat Pilot Assembly',
    'Season Cast Iron Grates', 'Test Flame Safeguard', 'Tool & Equipment Orientation',
    'Vent Hood Flow Verification', 'Vortaire MX-5200 Seal Replacement SOP',
  ],
  resources: [
    'Arctos UC Series Field Guide', 'Company Vision & Mission', 'Compressor Parts Catalog',
    'Employee Handbook', 'Field Service Standards v3.1', 'Incident & Near Miss Reporting',
    'Lockout/Tagout for Kitchen Equipment', 'MX-5200 Service Manual', 'PR-72T3SS Spec Sheet',
    'R-404A Refrigerant Handling Guide', 'R-404A Refrigerant SDS', "UC-248F Owner's Manual",
  ],
  people: ['Dana Kowalski', 'Elena Vasquez', 'James Whitfield', 'Marcus Chen', 'Raj Patel', 'Sofia Reyes'],
};

/* ─── WORKFLOWS VIEW ─── */

function WorkflowsView({ scrollRef }) {
  return (
    <ViewLayout scrollRef={scrollRef}>
      <div style={{ display: 'flex', alignItems: 'start', paddingTop: '24px', paddingBottom: '24px', paddingLeft: '80px', paddingRight: '80px', flex: '1 1 0%' }}>
        <TrainingColumn label="Digital Workflows" icon="list" items={workflowsData.workflows} staggerStyle={stagger(0)} />
        <TrainingColumn label="Resources" icon="book" items={workflowsData.resources} staggerStyle={stagger(1)} />
        <TrainingColumn label="People" icon="person" items={workflowsData.people} staggerStyle={stagger(2)} />
      </div>
    </ViewLayout>
  );
}

/* ─── FINDER DATA ─── */

const finderRow1 = [
  { name: 'Compressor Kit', partNumber: '991172', price: '$485', image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSAQAY8DK5BTS9NZ3B2PA2V.jpg', make: 'True / Tecumseh', model: 'AE4440Y-AA1A', year: '2022', resource: null },
  { name: 'Evaporator Fan Motor', partNumber: '800401', price: '$89', image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSARPT5QCVKHKFK0VFY2KN4.webp', make: 'True', model: '9W Shaded-Pole', year: '2021', resource: null },
  { name: 'Planetary Gear', partNumber: '00-437692', price: '$312', image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSATFTVRR2J5E7AYTCP0BSX.webp', make: 'Hobart', model: '59-Tooth Ring', year: '2023', resource: 'HS Series Belt Guide' },
  { name: 'Planetary Oil Seal', partNumber: '00-024651', price: '$24', image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSATV2T9V8ZE6JF1V4GB9P4.webp', make: 'Hobart', model: 'H600/M802', year: '2023', resource: 'HS Seres Gear Box' },
];

const finderRow2 = [
  { name: 'Door Hinge Kit', partNumber: '870837', price: '$67', image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSB4TNBMB1XB2SJPDT4B52Z.webp', make: 'True', model: 'Spring Cartridge', year: '2022', resource: 'Polaris 72 Hinge Guide' },
  { name: 'Shelf Clips', partNumber: '920158', price: '$18', image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSB5KRR9YJ0Q8F2MRV7G7AF.webp', make: 'True', model: 'SS Dovetail', year: '2022', resource: 'Polaris 72 Shelf Guide' },
  { name: 'Burner Valve', partNumber: '00-710121', price: '$142', image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSB8SC55A0AXWW547K1GKXA.webp', make: 'Vulcan', model: '1/4" MPT Inlet', year: '2023', resource: 'Brimstone Valve Guide' },
  { name: 'Burner Ignitor', partNumber: '00-423754', price: '$93', image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSB9A6A8E5DTZBJRAPF4V0K.jpg', make: 'Vulcan / Fenwal', model: '3-Probe Assembly', year: '2023', resource: null },
];

/* ─── PART CARD ─── */

function PartCard({ name, partNumber, price, image, make, model, year, resource, isLast, staggerStyle }) {
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

/* ─── FINDER VIEW ─── */

function FinderView({ scrollRef }) {
  return (
    <ViewLayout scrollRef={scrollRef}>
      <div style={{ display: 'flex', paddingLeft: '56px', paddingRight: '56px' }}>
        {finderRow1.map((p, i) => <PartCard key={i} {...p} isLast={i === 3} staggerStyle={stagger(i)} />)}
      </div>
      <div style={{ display: 'flex', paddingLeft: '56px', paddingRight: '56px', paddingTop: '80px', paddingBottom: '40px' }}>
        {finderRow2.map((p, i) => <PartCard key={i} {...p} isLast={i === 3} staggerStyle={stagger(i + finderRow1.length)} />)}
      </div>
    </ViewLayout>
  );
}

/* ─── HOME DATA ─── */

const homeStats = [
  'Fri Mar 3 2026',
  '3 Jobs Scheduled',
  '1 of 3 In Progress',
  '5.5 Hrs Remain',
  '1 Certification Gap',
];

const homeSubTabs = ['Current Job', 'Certifications', 'Quick Actions'];

const jobCards = [
  {
    id: '#4042', status: 'triangle', company: 'Harborview Hotel', time: '8am · Main Kitchen',
    image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/4897K3FN3NG91X0MCE3YE3VJNB.jpg',
    equipment: ['Quarterly Coolant Check', 'Arctos 48', 'UC-248F'],
    progress: ['Step 3 of 8', '2hr Estimate', '1.5hr Elapsed'],
    links: [{ icon: 'study', label: 'Study' }, { icon: 'list', label: 'Continue Workflow' }, { icon: 'hand', label: 'Request Help' }],
  },
  {
    id: '#4049', status: 'circle', company: 'Lennox Catering', time: '10am · Prep Kitchen',
    image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/75PGDGM8902XB6T7536BMYHQXY.jpg',
    equipment: ['Replace Agitator Seals', 'Vortaire MX', 'MX-5200'],
    progress: ['Step 1 Awaits', '4hr Estimate'],
    links: [{ icon: 'study', label: 'Study' }, { icon: 'list', label: 'Start Workflow' }],
  },
  {
    id: '#4056', status: 'circle', company: 'Pinnacle Dining', time: '2pm · Banquet Hall',
    image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/3PMC01AEP72G4ZWJZ8BQHEZQ6H.jpg',
    equipment: ['Calibrate Burner Valves', 'Brimstone Pro', 'HP-636N'],
    progress: ['Step 1 Awaits', '2hr Estimate'],
    links: [{ icon: 'study', label: 'Study' }, { icon: 'certBadge', label: 'Certification' }, { icon: 'list', label: 'Start Workflow' }],
  },
];

const certRows = [
  { icon: 'warningFilled', text: 'EPA 608 Certification Expires Tomorrow', link: 'Renew' },
  { icon: 'shieldCheck', text: 'Gas Appliance Type 1', link: null },
  { icon: 'shieldCheck', text: 'OSHA Electrical Safety', link: null },
  { icon: 'shieldCheck', text: 'ServSafe Equipment Hygiene', link: null },
];

const quickActions = [
  { icon: 'wind', label: 'Order Replacement Parts' },
  { icon: 'clipboardLight', label: 'Report Equipment Issue' },
  { icon: 'gearLight', label: 'Start Remote Assist' },
  { icon: 'creditCard', label: 'Submit Inspection Report' },
  { icon: 'compass', label: 'View Service Procedures' },
];

/* ─── JOB CARD ─── */

function JobCard({ id, status, company, time, image, equipment, progress, links, isLast, staggerStyle }) {
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

/* ─── HOME VIEW ─── */

function HomeView({ scrollRef }) {
  const [activeSubTab, setActiveSubTab] = useState('Current Job');
  const [activeFilter, setActiveFilter] = useState('A-Z');
  const theme = useThemeColors();

  return (
    <ViewLayout scrollRef={scrollRef}>
      {/* Stats Banner */}
      <div style={{ display: 'flex', paddingLeft: '40px', paddingRight: '40px', paddingBottom: '40px', backgroundColor: '#F8F7F7' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px', backgroundColor: '#FFFFFF', borderRadius: '9999px', paddingTop: '24px', paddingBottom: '24px', paddingLeft: '40px', paddingRight: '40px', width: '100%' }}>
          {homeStats.map((stat, i) => (
            <span key={i} style={{ fontFamily: monoRegular, fontSize: '16px', lineHeight: '28px', color: '#716E74', whiteSpace: 'nowrap' }}>{stat}</span>
          ))}
        </div>
      </div>

      {/* SubTabBar */}
      <SubTabBar
        tabs={homeSubTabs}
        activeTab={activeSubTab}
        onTabChange={setActiveSubTab}
        filters={['A-Z', 'Recently', 'Unread']}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Tab Content */}
      {activeSubTab === 'Current Job' && (
        <div style={{ display: 'flex', paddingTop: '16px', paddingBottom: '40px', paddingLeft: '56px', paddingRight: '56px', flex: '1 1 0%' }}>
          {jobCards.map((card, i) => (
            <JobCard key={i} {...card} isLast={i === jobCards.length - 1} staggerStyle={stagger(i)} />
          ))}
        </div>
      )}

      {activeSubTab === 'Certifications' && (
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '16px', paddingBottom: '40px', paddingLeft: '80px', paddingRight: '80px' }}>
          {certRows.map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', borderTop: '0.25px dashed #00000059', paddingTop: '24px', paddingBottom: '24px', ...stagger(i) }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#584F4D" viewBox="0 0 256 256" style={{ flexShrink: 0 }}>
                <path d={ICON_PATHS[row.icon]} />
              </svg>
              <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: '#584F4D' }}>{row.text}</span>
              {row.link && (
                <div className="link-row" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: theme.link }}>→ {row.link}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeSubTab === 'Quick Actions' && (
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '16px', paddingBottom: '40px', paddingLeft: '80px', paddingRight: '80px' }}>
          {quickActions.map((action, i) => (
            <div key={i} className="link-row" style={{ display: 'flex', alignItems: 'center', gap: '4px', borderTop: '0.25px dashed #00000059', paddingTop: '24px', paddingBottom: '24px', ...stagger(i) }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={theme.link} viewBox="0 0 256 256" style={{ flexShrink: 0 }}>
                <path d={ICON_PATHS[action.icon]} />
              </svg>
              <span style={{ fontFamily: monoRegular, fontSize: '15px', lineHeight: '18px', color: theme.link, textTransform: 'capitalize' }}>{action.label}</span>
            </div>
          ))}
        </div>
      )}
    </ViewLayout>
  );
}

/* ─── PLACEHOLDER VIEWS ─── */

function PlaceholderView({ scrollRef }) {
  return <ViewLayout scrollRef={scrollRef}><div /></ViewLayout>;
}

/* ─── SETTINGS DATA ─── */

const settingsProfile = [
  'Display Name',
  'Email Address',
  'Phone Number',
  'Profile Photo',
  'Preferred Language',
];

const settingsWork = [
  'Home Region',
  'Shift Schedule',
  'Dispatch Preference',
  'Parts Authorization Limit',
  'Vehicle Assignment',
  'Service Specialties',
  'Tool Inventory',
];

const settingsNotifications = [
  'Job Assignments',
  'Schedule Changes',
  'Certification Alerts',
  'Safety Bulletins',
  'Team Messages',
  'Customer Feedback',
];

/* ─── PALETTE MODAL ─── */

function PaletteModal({ onClose }) {
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

/* ─── SETTINGS VIEW ─── */

function SettingsView({ scrollRef }) {
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

const tabViews = { Home: HomeView, Equipment: EquipmentView, Training: TrainingView, Parts: PlaceholderView, Finder: FinderView, Workflows: WorkflowsView, Settings: SettingsView };

/* ─── APP ─── */

export default function App() {
  const [activeTab, setActiveTab] = useState('Equipment');
  const [palette, setPalette] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [activeTab]);

  // Update CSS variable for nav hover color based on palette
  useEffect(() => {
    const c = colorPalettes[palette].colors;
    // Derive hover color: slightly transparent version of palette's light accent
    const hoverColor = c[2] + 'A6';
    document.documentElement.style.setProperty('--nav-hover-bg', hoverColor);
  }, [palette]);

  const ActiveView = tabViews[activeTab] || EquipmentView;

  return (
    <ThemeContext.Provider value={{ palette, setPalette }}>
      <div style={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: '#F8F7F7' }}>
        <Sidebar active={activeTab === 'Home' ? 'Home' : activeTab === 'Settings' ? 'Settings' : null} onNavigate={(label) => { if (label === 'Settings') setActiveTab('Settings'); else if (label === 'Home') setActiveTab('Home'); }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 0%', overflow: 'hidden' }}>
          <PageHeader activeTab={activeTab} onTabChange={setActiveTab} onNameClick={() => setActiveTab('Home')} />
          <ActiveView scrollRef={scrollRef} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
