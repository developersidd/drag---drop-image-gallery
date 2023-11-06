//import { useDndContext } from "@dnd-kit/core"

import { memo, useEffect, useState } from 'react';
import useDndContext from "../hooks/useDndContext";

const DraggableImageCheckbox = memo(({ id }: { id: string }) => {
    const { addSelectedImage, removeSelectedImage, selectedImages } = useDndContext();
    const [checked, setChecked] = useState(selectedImages.includes(id));
    const isSelected = selectedImages.includes(id);
    // if user want to unselect selected images then unchecked image checkbox
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
        <input checked={checked} onChange={handleCheckBox} type="checkbox" className={`${isSelected ? "opacity-100" : ""} accent-cyan-600 transition-opacity group-hover/draggableImage:opacity-100 opacity-0 z-50 cursor-pointer w-7 h-5 md:w-10 md:h-7 absolute top-5 left-5`} name="" id="" />
    )
});

export default DraggableImageCheckbox;