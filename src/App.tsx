import GalleryHeader from "./components/GalleryHeader";
import ImageGallery from "./components/ImageGallery";

function App() {

  return (
    <div className="lg:container  px-5 lg:px-10 py-1 mx-auto">
      <main className="bg-white rounded-xl shadow-md">
        <GalleryHeader />
        <ImageGallery />
      </main>
    </div>
  )
}

export default App;
