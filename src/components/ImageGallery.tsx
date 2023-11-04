import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy
} from "@dnd-kit/sortable";
import { useState } from "react";
import { images } from "../assets/data/Images";
//import "./App.css";
import { DragableItem } from "./DragableItem";

const initialItems = images;

function App() {
  const [items, setItems] = useState(initialItems);
  const [activeId, setActiveId] = useState<string | null>("");
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function handleDragStart(event: DragStartEvent) {
    setActiveId((event?.active?.id) as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    //console.log("event:", event)
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >

      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:grid-rows-3  gap-5  p-5">
          {items.map((item, ind) => (
            <DragableItem data={{ activeId, ind, ...item }} key={item.id} />
          ))}
        </div>
      </SortableContext>

    </DndContext>
  );
}

export default App;
