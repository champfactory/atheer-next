import ContextSparkle from './ContextSparkle';

export default {
  title: 'Components/ContextSparkle',
  component: ContextSparkle,
  argTypes: {
    color: { control: 'color', description: 'Sparkle icon color' },
  },
};

export const Default = { args: { color: '#FF0000' } };
export const Blue = { args: { color: '#48B2FF' } };
export const Green = { args: { color: '#176331' } };
