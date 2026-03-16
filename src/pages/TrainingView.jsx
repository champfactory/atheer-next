import { useState } from 'react';
import { trainingTabs, trainingFilters, trainingData } from '../constants/data';
import { stagger } from '../constants/animation';
import ViewLayout from '../components/ViewLayout';
import SubTabBar from '../components/SubTabBar';
import TrainingColumn from '../components/TrainingColumn';

export default function TrainingView({ scrollRef }) {
  const [activeSubTab, setActiveSubTab] = useState('Welcome');
  const [activeFilter, setActiveFilter] = useState('A-Z');
  const data = trainingData[activeSubTab];

  return (
    <ViewLayout scrollRef={scrollRef}>
      <SubTabBar tabs={trainingTabs} activeTab={activeSubTab} onTabChange={setActiveSubTab} filters={trainingFilters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <div key={activeSubTab} style={{ display: 'flex', alignItems: 'start', paddingTop: '16px', paddingBottom: '24px', paddingLeft: '80px', paddingRight: '80px', flex: '1 1 0%' }}>
        <TrainingColumn label="Digital Workflows" icon="list" items={data.workflows} staggerStyle={stagger(0)} />
        <TrainingColumn label="Resources" icon="book" items={data.resources} staggerStyle={stagger(1)} />
        <TrainingColumn label="People" icon="person" items={data.people} staggerStyle={stagger(2)} />
      </div>
    </ViewLayout>
  );
}
