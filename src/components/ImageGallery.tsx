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
  arrayMove
} from "@dnd-kit/sortable";
import { useState } from "react";
import { images } from "../assets/data/Images";
//import "./App.css";

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

    </DndContext>
  );
}

export default App;
