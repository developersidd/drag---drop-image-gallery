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
        <nav className='py-5 px-5 md:px-14 border-b-2  border-gray-300'>
            {
                selectedImages?.length > 0 ?
                    (
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <input title='Unselect Image' type="checkbox" onChange={handleChange} className='accent-emerald-600 cursor-pointer w-5 h-5 md:mt-1 md:w-6 md:h-7' checked={checked} />
                                <h4 className='text-xl md:text-2xl xl:text-3xl font-medium'> {selectedImages?.length}  {showPlural ? "Files" : "File"} Selected </h4>
                            </div>
                            <button onClick={deleteImages} className='flex items-center gap-1 font-medium px-3  py-2 rounded bg-red-600 hover:bg-red-700 text-white'>
                                <svg fill='#fff' className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                                    <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"></path>
                                </svg>
                                <p>
                                    Delete {showPlural ? "files" : "file"}
                                </p>
                            </button>
                        </div>
                    ) :
                    <h3 className='text-xl md:text-2xl xl:text-3xl font-medium'> <span className='text-teal-500'> DND </span> Gallery</h3>
            }
        </nav>
    )
}

export default GalleryHeader