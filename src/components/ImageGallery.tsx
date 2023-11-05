import {
  DndContext,
  DragEndEvent,
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
import imagePlaceholder from "../assets/images/image-placeholder.png";
import useDndContext from "../hooks/useDndContext";
import { DragableImage } from "./DragableImage";

function ImageGallery() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { images, handleSetImages } = useDndContext();
  const sensors = useSensors(useSensor(MouseSensor));

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
            <DragableImage data={{ isDragging, ind, ...item }} key={item.id} />
          ))}
          {/*  image placeholder */}
          <div className="rounded-xl w-full h-[310px] sm:h-[250px] border-dashed border-2 mx-auto text-center">
            <div className="flex items-center justify-center h-full flex-col">
              <img className="w-14 md:w-20" src={imagePlaceholder} alt="image-placeholder" />
              <p className="text-lg md:text-xl font-bold text-gray-600">Add Images</p>
            </div>
          </div>
        </div>
      </SortableContext>

    </DndContext>
  );
}

export default ImageGallery;
