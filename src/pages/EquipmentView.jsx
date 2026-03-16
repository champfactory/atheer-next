import { equipmentData } from '../constants/data';
import { stagger } from '../constants/animation';
import ViewLayout from '../components/ViewLayout';
import EquipmentCard from '../components/EquipmentCard';

export default function EquipmentView({ scrollRef }) {
  return (
    <ViewLayout scrollRef={scrollRef}>
      <div style={{ display: 'flex', flex: '1 1 0%', paddingLeft: '56px', paddingRight: '56px', paddingBottom: '40px' }}>
        {equipmentData.map((eq, i) => <EquipmentCard key={i} {...eq} isLast={i === equipmentData.length - 1} staggerStyle={stagger(i)} />)}
      </div>
    </ViewLayout>
  );
}
