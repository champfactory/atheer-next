import PaletteModal from './PaletteModal';
import { withTheme } from './ThemeDecorator';

export default {
  title: 'Components/PaletteModal',
  component: PaletteModal,
  decorators: [withTheme()],
};

export const Default = {
  args: {
    onClose: () => {},
  },
};
