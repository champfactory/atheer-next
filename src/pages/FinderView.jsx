import { finderRow1, finderRow2 } from '../constants/data';
import { stagger } from '../constants/animation';
import ViewLayout from '../components/ViewLayout';
import PartCard from '../components/PartCard';

export default function FinderView({ scrollRef }) {
  return (
    <ViewLayout scrollRef={scrollRef}>
      <div style={{ display: 'flex', paddingLeft: '56px', paddingRight: '56px' }}>
        {finderRow1.map((p, i) => <PartCard key={i} {...p} isLast={i === 3} staggerStyle={stagger(i)} />)}
      </div>
      <div style={{ display: 'flex', paddingLeft: '56px', paddingRight: '56px', paddingTop: '80px', paddingBottom: '40px' }}>
        {finderRow2.map((p, i) => <PartCard key={i} {...p} isLast={i === 3} staggerStyle={stagger(i + finderRow1.length)} />)}
      </div>
    </ViewLayout>
  );
}
