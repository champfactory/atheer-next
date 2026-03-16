import { workflowsData } from '../constants/data';
import { stagger } from '../constants/animation';
import ViewLayout from '../components/ViewLayout';
import TrainingColumn from '../components/TrainingColumn';

export default function WorkflowsView({ scrollRef }) {
  return (
    <ViewLayout scrollRef={scrollRef}>
      <div style={{ display: 'flex', alignItems: 'start', paddingTop: '24px', paddingBottom: '24px', paddingLeft: '80px', paddingRight: '80px', flex: '1 1 0%' }}>
        <TrainingColumn label="Digital Workflows" icon="list" items={workflowsData.workflows} staggerStyle={stagger(0)} />
        <TrainingColumn label="Resources" icon="book" items={workflowsData.resources} staggerStyle={stagger(1)} />
        <TrainingColumn label="People" icon="person" items={workflowsData.people} staggerStyle={stagger(2)} />
      </div>
    </ViewLayout>
  );
}
