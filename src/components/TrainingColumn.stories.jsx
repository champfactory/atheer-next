import TrainingColumn from './TrainingColumn';
import { withTheme } from './ThemeDecorator';

export default {
  title: 'Components/TrainingColumn',
  component: TrainingColumn,
  decorators: [
    withTheme(),
    (Story) => (
      <div style={{ padding: '24px', backgroundColor: '#F8F7F7' }}>
        <Story />
      </div>
    ),
  ],
};

export const Workflows = {
  args: {
    label: 'Workflows',
    icon: 'list',
    items: ['Burner Calibration Walkthrough', 'Commercial Kitchen Equipment 101', 'EPA 608 Prep Course'],
  },
};

export const Resources = {
  args: {
    label: 'Resources',
    icon: 'book',
    items: ['Arctos UC Series Field Guide', 'Employee Handbook', 'Field Service Standards v3.1'],
  },
};

export const People = {
  args: {
    label: 'People',
    icon: 'person',
    items: ['Marcus Chen'],
  },
};

export const Empty = {
  args: {
    label: 'Job Aids',
    icon: 'list',
    items: [],
  },
};
