import {
  DndContext,
  DragEndEvent,
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
import useDndContext from "../hooks/useDndContext";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import DraggableImage from "./DraggableImage";

function ImageGallery() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { images, handleSetImages } = useDndContext();
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  // User starts picking images
  function handleDragStart() {
    // observer for image drag and drop events 
    setIsDragging(true);
  }

  // user dropping picking images
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    // if picked image and that image where the the picked one will be drop is not same then swap image
    if (active.id !== over?.id) {
      const oldIndex = images.findIndex((item) => item.id === active.id);
      const newIndex = images.findIndex((item) => item.id === over?.id);
      handleSetImages(arrayMove(images, oldIndex, newIndex))
    }
    setIsDragging(false)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >

      <SortableContext items={images} strategy={rectSortingStrategy}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:grid-rows-3 gap-5 p-6 md:p-12">
          {images.map((item, ind) => (
            <DraggableImage data={{ isDragging, ind, ...item }} key={item.id} />
          ))}
          {/*  image placeholder */}
          <ImagePlaceholder />
        </div>
      </SortableContext>

    </DndContext>
  );
}

export default ImageGallery;
