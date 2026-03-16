import JobCard from './JobCard';
import { withTheme } from './ThemeDecorator';

export default {
  title: 'Components/JobCard',
  component: JobCard,
  decorators: [
    withTheme(),
    (Story) => (
      <div style={{ width: '320px', padding: '24px', backgroundColor: '#F8F7F7' }}>
        <Story />
      </div>
    ),
  ],
};

export const InProgress = {
  args: {
    id: '#4042',
    status: 'triangle',
    company: 'Harborview Hotel',
    time: '8am · Main Kitchen',
    image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/4897K3FN3NG91X0MCE3YE3VJNB.jpg',
    equipment: ['Quarterly Coolant Check', 'Arctos 48', 'UC-248F'],
    progress: ['Step 3 of 8', '2hr Estimate', '1.5hr Elapsed'],
    links: [
      { icon: 'study', label: 'Study' },
      { icon: 'list', label: 'Continue Workflow' },
      { icon: 'hand', label: 'Request Help' },
    ],
    isLast: true,
  },
};

export const Upcoming = {
  args: {
    id: '#4049',
    status: 'circle',
    company: 'Lennox Catering',
    time: '10am · Prep Kitchen',
    image: 'https://workers.paper.design/file-assets/01KKF4VD14KRS8C5YRS92J3W5E/75PGDGM8902XB6T7536BMYHQXY.jpg',
    equipment: ['Replace Agitator Seals', 'Vortaire MX', 'MX-5200'],
    progress: ['Step 1 Awaits', '4hr Estimate'],
    links: [
      { icon: 'study', label: 'Study' },
      { icon: 'list', label: 'Start Workflow' },
    ],
    isLast: true,
  },
};
