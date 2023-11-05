import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo } from 'react';
import useDndContext from "../hooks/useDndContext";
import DraggableImageCheckbox from "./DraggableImageCheckbox";
interface DraggableImageProps {
    data: { id: string, image: string, ind: number, isDragging: boolean };
}
const DraggableImage = memo((props: DraggableImageProps) => {
    //console.log("DraggableItem rendered");
    const { data: { id, ind, image, isDragging, } } = props
    const { selectedImages } = useDndContext();

    const { attributes, listeners, setNodeRef, transform, transition, active, } =
        useSortable({
            id: id, transition: {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            }
        });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    // checking is user selected this image or not 
    const isSelected = selectedImages.includes(id);

    return (
        <div
            className={`${isSelected ? "opacity-60" : ""} relative rounded-xl border-2 border-gray-300  w-full ${ind === 0 ? "sm:col-span-2 sm:row-span-2" : ""}  group/draggableImage`}>

            <div
                style={{ touchAction: "none", ...style }}
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                className={` ${active ? "rounded-xl border border-gray-300" : ""} h-full`}
            >
                <img
                    className="rounded-xl w-full h-full object-cover"
                    src={image}
                />
                <div className={`${isSelected ? "hidden" : ""} transition-all invisible opacity-0 z-30  ${isDragging ? "" : "group-hover/draggableImage:opacity-100 group-hover/draggableImage:visible"} cursor-pointer absolute rounded-xl top-0 left-0 w-full h-full bg-black/40`} />
            </div>
            {
                isDragging ? null : <DraggableImageCheckbox id={id} />
            }
        </div>
    );
});
export default DraggableImage;