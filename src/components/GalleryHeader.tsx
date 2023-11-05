import { useState } from 'react';
import useDndContext from '../hooks/useDndContext';

const GalleryHeader = () => {
    const { selectedImages, deleteImages, handleImageUnSelection } = useDndContext();
    const [checked, setChecked] = useState(true);
    // handle unselect images
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        handleImageUnSelection();
        setChecked(true);
    }
    const showPlural = selectedImages?.length > 1;
    return (
        <nav className='py-5 px-5 md:px-12 border-b-2  border-gray-300'>
            {
                selectedImages?.length > 0 ?
                    (
                        <div className='flex items-center justify-between'>
                            <div className='flex items-end gap-3'>
                                <input title='Unselect Image' type="checkbox" onChange={handleChange} className='w-6 h-7' checked={checked} />
                                <h4 className='text-xl md:text-2xl xl:text-3xl font-medium'> {selectedImages?.length}  {showPlural ? "Files" : "File"} Selected </h4>
                            </div>
                            <button onClick={deleteImages} className='font-medium px-3 md:px-4 py-2 rounded bg-red-600 text-white'> Delete {showPlural ? "files" : "file"} </button>
                        </div>
                    ) :
                    <h3 className='text-xl md:text-2xl xl:text-3xl font-medium'> <span className='text-teal-500'> DND </span> Gallery</h3>
            }
        </nav>
    )
}

export default GalleryHeader