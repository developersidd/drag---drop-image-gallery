import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface DragableItemProps {
    data: { id: string, image: string, ind?: number, activeId: string | null }
}
export function DragableItem({ data: { id, ind, image, activeId } }: DragableItemProps) {
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

    return (
        <div className={` rounded-xl border-2 border-gray-300 w-full ${ind === 0 ? " xl:h-ful sm:col-span-2 sm:row-span-2" : ""} `}>
            <div
                ref={setNodeRef}
                style={{ touchAction: "none", ...style }}
                className={` ${activeId === id ? "rounded-xl border-2 border-gray-300" : ""}`}
                {...attributes}
                {...listeners}
            >
                <img
                    className="rounded-xl w-full h-full"
                    src={image}
                />
            </div>
        </div >
    );
}
