import EquipmentCard from './EquipmentCard';
import { withTheme } from './ThemeDecorator';

export default {
  title: 'Components/EquipmentCard',
  component: EquipmentCard,
  decorators: [
    withTheme(),
    (Story) => (
      <div style={{ width: '320px', padding: '24px', backgroundColor: '#F8F7F7' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    name: 'Arctos 48',
    make: 'Arctos',
    model: 'UC-248F',
    year: '2022',
    image: { url: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKS5VDF9FVBQ4VWB1EE1G0PS.jpg' },
    people: ['Elena Vasquez', 'Raj Patel'],
    resources: ["UC-248F Owner's Manual", 'R-404A Refrigerant SDS'],
    workflows: ['Quarterly Coolant Check'],
    isLast: true,
  },
};

export const ManyWorkflows = {
  args: {
    name: 'Brimstone Pro',
    make: 'Brimstone',
    model: 'HP-636N',
    year: '2020',
    image: { url: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKS64CP6WVCWG544BE5M5V9V.jpg' },
    people: ['Sofia Reyes'],
    resources: [],
    workflows: ['Inspect Gas Supply Lines', 'Replace Thermocouple', 'Calibrate Burner Valves', 'Re-seat Pilot Assembly'],
    isLast: true,
  },
};

export const WithBorder = {
  args: {
    name: 'Polaris 72',
    make: 'Polaris',
    model: 'PR-72T3SS',
    year: '2019',
    image: { url: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/01KKS625QZ7R2E96V6V5CDJTNJ.jpg' },
    people: ['Marcus Chen'],
    resources: ['PR-72T3SS Spec Sheet', 'Compressor Parts Catalog'],
    workflows: ['Defrost Heater Replacement'],
    isLast: false,
  },
};
