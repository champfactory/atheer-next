import { useState } from 'react';
import SubTabBar from './SubTabBar';
import { withTheme } from './ThemeDecorator';

export default {
  title: 'Components/SubTabBar',
  component: SubTabBar,
  decorators: [withTheme()],
};

export const TabsOnly = {
  args: {
    tabs: ['Welcome', 'Job Aids', 'SOP', 'Onboarding'],
    activeTab: 'Welcome',
  },
};

export const WithFilters = {
  args: {
    tabs: ['Welcome', 'Job Aids', 'SOP', 'Onboarding'],
    activeTab: 'SOP',
    filters: ['A-Z', 'Recently', 'Unread'],
    activeFilter: 'A-Z',
  },
};

export const Interactive = {
  render: () => {
    const [tab, setTab] = useState('Welcome');
    const [filter, setFilter] = useState('A-Z');
    return (
      <SubTabBar
        tabs={['Welcome', 'Job Aids', 'SOP', 'Onboarding']}
        activeTab={tab}
        onTabChange={setTab}
        filters={['A-Z', 'Recently', 'Unread']}
        activeFilter={filter}
        onFilterChange={setFilter}
      />
    );
  },
};
