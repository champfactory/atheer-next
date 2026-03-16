import Sidebar from './Sidebar';
import { withTheme } from './ThemeDecorator';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  decorators: [
    withTheme(),
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    active: {
      control: 'select',
      options: ['Home', 'Settings', null],
      description: 'Active nav item',
    },
  },
};

export const HomeActive = { args: { active: 'Home' } };
export const SettingsActive = { args: { active: 'Settings' } };
export const NoneActive = { args: { active: null } };

export const WarmTheme = {
  args: { active: 'Home' },
  decorators: [withTheme(1)],
};

export const DuskTheme = {
  args: { active: 'Home' },
  decorators: [withTheme(4)],
};
