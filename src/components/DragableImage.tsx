import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useDndContext from "../hooks/useDndContext";
import DragableImageCheckbox from "./DragableImageCheckbox";
interface DragableImageProps {
    data: { id: string, image: string, ind?: number, isDragging: boolean },
}
export function DragableImage({ data: { id, ind, image, isDragging, } }: DragableImageProps) {
    const { selectedImages } = useDndContext();

    const { attributes, listeners, setNodeRef, transform, transition, active } =
        useSortable({
            id: id, transition: {
                duration: 1000, // milliseconds
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            }
        });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    // dragging image id
    // checking is user selected this image or not 
    const isSelected = selectedImages.includes(id);

    return (
        <div className={`${isSelected ? "opacity-60" : ""} relative rounded-xl border-2 border-gray-300  w-full ${ind === 0 ? "sm:col-span-2 sm:row-span-2" : ""}  group/dragableImage`}>

            <div
                ref={setNodeRef}
                style={{ ...style }}
                className={` ${active ? "rounded-xl border border-gray-300" : ""} h-full`}
                {...attributes}
                {...listeners}
            >
                <img
                    className="rounded-xl w-full h-full object-cover"
                    src={image}
                />
                <div className={`${isSelected ? "hidden" : ""} transition-all invisible opacity-0 z-30  ${isDragging ? "" : "group-hover/dragableImage:opacity-100 group-hover/dragableImage:visible"} cursor-pointer absolute rounded-xl top-0 left-0 w-full h-full bg-black/40`} />
            </div>
            {
                isDragging ? null : <DragableImageCheckbox id={id} />
            }
        </div>
    );
}
