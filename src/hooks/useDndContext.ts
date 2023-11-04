import { useContext } from 'react';
import { DndContext } from '../contexts/DndProvider';

const useDndContext = () => {
    return useContext(DndContext);
}

export default useDndContext