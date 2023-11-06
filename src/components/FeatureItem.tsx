import { useDroppable } from "@dnd-kit/core";
import { memo } from 'react';
import useDndContext from "../hooks/useDndContext";
import DraggableImageCheckbox from "./DraggableImageCheckbox";
interface DraggableImageProps {
    data: { id: string, image: string, isDragging: boolean };
}
const FeatureImage = memo((props: DraggableImageProps) => {
    const { data: { id, image, isDragging, } } = props || {};
    const { selectedImages } = useDndContext();

    const { setNodeRef } = useDroppable({
        id,
    });

    // checking is user selected this image or not 
    const isSelected = selectedImages.includes(id);

    return (
        <div
            className={` relative rounded-xl border-2 border-gray-300  w-full sm:col-span-2 sm:row-span-2  group/draggableImage`}
        >
            <div
                ref={setNodeRef}
                className={`  h-full`}
            >
                <img
                    className="rounded-xl w-full h-full object-cover"
                    src={image}
                />
                <div className={`${isSelected && !isDragging ? "opacity-60 bg-white" : "invisible opacity-0 bg-black/40"} transition-all  z-30  ${(isDragging || isSelected) ? "" : "group-hover/draggableImage:opacity-100 group-hover/draggableImage:visible"} cursor-grab absolute rounded-xl top-0 left-0 w-full h-full `} />
            </div>
            {
                isDragging ? null : <DraggableImageCheckbox id={id} />
            }
        </div>
    );
});
export default FeatureImage;