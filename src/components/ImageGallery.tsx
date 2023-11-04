import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
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
//import "./App.css";
import useDndContext from "../hooks/useDndContext";
import { DragableItem } from "./DragableItem";


function ImageGallery() {
  const [activeId, setActiveId] = useState<string | null>("");
  const [isDraging, setIsDraging] = useState<boolean>(false);
  const { items, handleSetItems } = useDndContext();
  const sensors = useSensors(useSensor(MouseSensor));

  function handleDragStart(event: DragStartEvent) {
    setIsDraging(true);
    setActiveId((event?.active?.id) as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    //console.log("event:", event)
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);
      handleSetItems(arrayMove(items, oldIndex, newIndex))
    }
    setIsDraging(false)
  }

  //console.log("Image Gallery Rendered");
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
            <DragableItem data={{ isDraging, activeId, ind, ...item }} key={item.id} />
          ))}
        </div>
      </SortableContext>

    </DndContext>
  );
}

export default ImageGallery;
