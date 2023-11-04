import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useDndContext from "../hooks/useDndContext";
import DeleteDragableItem from "./DeleteDragableItem";
interface DragableItemProps {
    data: { id: string, image: string, ind?: number, isDraging: boolean, activeId: string | null },
}
export function DragableItem({ data: { id, ind, image, isDraging, activeId } }: DragableItemProps) {
    const { selectedItems } = useDndContext();

    const { attributes, listeners, setNodeRef, transform, transition } =
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
    const draggingItem = activeId === id;
    const isSelected = selectedItems.includes(id);

    return (
        <div className={`${isSelected ? "opacity-60" : ""} relative rounded-xl border-2 border-gray-300 w-full ${ind === 0 ? " xl:h-ful sm:col-span-2 sm:row-span-2" : ""}  group/dragableItem`}>

            <div
                ref={setNodeRef}
                style={{ ...style }}
                className={` ${draggingItem ? "rounded-xl border border-gray-300" : ""}`}
                {...attributes}
                {...listeners}
            >
                <img
                    className="rounded-xl w-full h-full"
                    src={image}
                />
                <div className={`${isSelected ? "hidden" : ""} transition-all invisible opacity-0 z-30  ${isDraging ? "" : "group-hover/dragableItem:opacity-100 group-hover/dragableItem:visible"} cursor-pointer absolute rounded-xl top-0 left-0 w-full h-full bg-black/40`} />
            </div>
            {
                isDraging ? null : <DeleteDragableItem id={id} />
            }
        </div>
    );
}
