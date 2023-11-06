import imagePlaceholder from "../assets/images/image-placeholder.png";

const ImagePlaceholder = () => {
    return (
        <div className="rounded-xl w-full h-[310px] sm:h-[250px] border-dashed border-2 mx-auto text-center">
            <div className="flex items-center justify-center h-full flex-col">
                <img className="w-14 md:w-20" src={imagePlaceholder} alt="image-placeholder" />
                <p className="text-lg md:text-xl font-bold text-gray-600">Add Images</p>
            </div>
        </div>
    )
}

export default ImagePlaceholder