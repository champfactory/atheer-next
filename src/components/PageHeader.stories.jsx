import { useState } from 'react';
import PageHeader from './PageHeader';

export default {
  title: 'Components/PageHeader',
  component: PageHeader,
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#F8F7F7' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    activeTab: {
      control: 'select',
      options: ['Home', 'Equipment', 'Training', 'Parts', 'Finder', 'Workflows'],
      description: 'Currently active tab',
    },
  },
};

export const Equipment = { args: { activeTab: 'Equipment' } };
export const Home = { args: { activeTab: 'Home' } };
export const Training = { args: { activeTab: 'Training' } };

export const Interactive = {
  render: () => {
    const [tab, setTab] = useState('Equipment');
    return <PageHeader activeTab={tab} onTabChange={setTab} onNameClick={() => setTab('Home')} />;
  },
};
