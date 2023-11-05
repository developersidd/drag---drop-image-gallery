import React, { createContext, useState } from 'react';
import { Image, images as InitialImages } from '../assets/data/Images';
type DndProviderProps = {
    children: React.ReactNode
}

export type DndContextProps = {
    images: Image[];
    handleSetImages: (images: Image[]) => void
    selectedImages: string[]
    addSelectedImage: (id: string) => void
    removeSelectedImage: (id: string) => void;
    deleteImages: () => void,
    handleImageUnSelection: () => void,
}

export const DndContext = createContext({} as DndContextProps);

const DndProvider = ({ children }: DndProviderProps) => {
    const [images, setImages] = useState(InitialImages);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    // update sortable images
    const handleSetImages = (images: Image[]) => {
        setImages(images)
    }
    //  unselect user selected image
    const handleImageUnSelection = () => {
        setSelectedImages([])
    }
    // store user selected image
    const addSelectedImage = (id: string) => {
        setSelectedImages((ids) => ([...ids, id]))
    }
    // remove from selected images
    const removeSelectedImage = (selectId: string) => {
        setSelectedImages((ids) => ids.filter(id => id !== selectId))
    }
    // delete selected images
    const deleteImages = () => {
        if ((selectedImages.length > (images.length) - 3) || (images.length === 3)) {
            return alert(`Sorry, you have to keep al least 3 images`)
        }
        setImages((images) => images.filter(img => selectedImages.indexOf(img.id) === -1));
        setSelectedImages([]);
    }

    return (
        <DndContext.Provider value={{ deleteImages, handleSetImages, images, selectedImages, addSelectedImage, removeSelectedImage, handleImageUnSelection }}>
            {children}
        </DndContext.Provider>
    )
}

export default DndProvider