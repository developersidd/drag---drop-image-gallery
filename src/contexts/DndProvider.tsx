import React, { createContext, useState } from 'react';
import { Image, images } from '../assets/data/Images';
type DndProviderProps = {
    children: React.ReactNode
}

export type DndContextProps = {
    items: Image[];
    handleSetItems: (images: Image[]) => void
    selectedItems: string[],
    addSelectedItem: (id: string) => void
    removeSelectedItem: (id: string) => void
}

export const DndContext = createContext({} as DndContextProps);

const DndProvider = ({ children }: DndProviderProps) => {
    const [items, setItems] = useState(images);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSetItems = (items: Image[]) => {
        setItems(items)
    }

    const addSelectedItem = (id: string) => {
        setSelectedItems((ids) => ([...ids, id]))
    }

    const removeSelectedItem = (selectId: string) => {
        setSelectedItems((ids) => ids.filter(id => id !== selectId))
    }



    return (
        <DndContext.Provider value={{ handleSetItems, items, selectedItems, addSelectedItem, removeSelectedItem }}>
            {children}
        </DndContext.Provider>
    )
}

export default DndProvider