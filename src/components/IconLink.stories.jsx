import IconLink from './IconLink';
import { withTheme } from './ThemeDecorator';

export default {
  title: 'Components/IconLink',
  component: IconLink,
  decorators: [withTheme()],
  argTypes: {
    icon: {
      control: 'select',
      options: ['person', 'book', 'list', 'study', 'hand', 'certBadge'],
      description: 'Icon key from ICON_PATHS',
    },
    label: { control: 'text', description: 'Link label text' },
  },
};

export const Person = { args: { icon: 'person', label: 'Elena Vasquez' } };
export const Book = { args: { icon: 'book', label: "UC-248F Owner's Manual" } };
export const Workflow = { args: { icon: 'list', label: 'Quarterly Coolant Check' } };
export const Study = { args: { icon: 'study', label: 'Study' } };
