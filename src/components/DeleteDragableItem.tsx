//import { useDndContext } from "@dnd-kit/core"

import { useState } from 'react';
import useDndContext from "../hooks/useDndContext";

const DeleteDragableItem = ({ id }: { id: string }) => {
    const { addSelectedItem, removeSelectedItem, selectedItems } = useDndContext();
    const [check, setCheck] = useState(false);
    const isSelected = selectedItems.includes(id);
    const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheck(e.target.checked);
        if (selectedItems.includes(id)) {
            removeSelectedItem(id)
        } else {
            addSelectedItem(id)
        }
    }
    return (
        <input checked={check} onChange={handleCheckBox} type="checkbox" className={`${isSelected ? "opacity-100" : ""}  transition-opacity dragable-item-checkbox group-hover/dragableItem:opacity-100 opacity-0 z-50 cursor-pointer w-10 h-5 absolute top-5 left-5`} name="" id="" />
    )
}

export default DeleteDragableItem