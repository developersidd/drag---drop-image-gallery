//import { useDndContext } from "@dnd-kit/core"

import { useEffect, useState } from 'react';
import useDndContext from "../hooks/useDndContext";

const DragableImageCheckbox = ({ id }: { id: string }) => {
    const { addSelectedImage, removeSelectedImage, selectedImages } = useDndContext();
    const [checked, setChecked] = useState(selectedImages.includes(id));
    const isSelected = selectedImages.includes(id);
    // if user want to unselect selected images then unselect image
    useEffect(() => {
        setChecked(isSelected)
    }, [selectedImages]);

    // handle image select and unselect
    const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        if (isSelected) {
            removeSelectedImage(id)
        } else {
            addSelectedImage(id)
        }
    }
    return (
        <input checked={checked} onChange={handleCheckBox} type="checkbox" className={`${isSelected ? "opacity-100" : ""}  transition-opacity group-hover/dragableImage:opacity-100 opacity-0 z-50 cursor-pointer w-10 h-5 absolute top-5 left-5`} name="" id="" />
    )
}

export default DragableImageCheckbox