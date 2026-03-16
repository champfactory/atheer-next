import PartCard from './PartCard';
import { withTheme } from './ThemeDecorator';

export default {
  title: 'Components/PartCard',
  component: PartCard,
  decorators: [
    withTheme(),
    (Story) => (
      <div style={{ width: '320px', padding: '24px', backgroundColor: '#F8F7F7' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithResource = {
  args: {
    name: 'Planetary Gear',
    partNumber: '00-437692',
    price: '$312',
    image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSATFTVRR2J5E7AYTCP0BSX.webp',
    make: 'Hobart',
    model: '59-Tooth Ring',
    year: '2023',
    resource: 'HS Series Belt Guide',
    isLast: true,
  },
};

export const WithoutResource = {
  args: {
    name: 'Compressor Kit',
    partNumber: '991172',
    price: '$485',
    image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKSAQAY8DK5BTS9NZ3B2PA2V.jpg',
    make: 'True / Tecumseh',
    model: 'AE4440Y-AA1A',
    year: '2022',
    resource: null,
    isLast: true,
  },
};
