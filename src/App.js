import {useState} from "react";
import "./App.scss";

function App() {
  const [sidebarShowing, setSideBarShowing] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesSelected, setImagesSelected] = useState([]);

  const getImages = async () => {
    if (images.length) {
      return false;
    }

    const res = await fetch("https://picsum.photos/v2/list");

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const result = await res.json();
    setImages(result);
  };

  const imageSelected = (id) => {
    const copiedImages = [...imagesSelected]

    if (!imagesSelected.includes(id)) {
      copiedImages.push(id);
    } else {
      const index = copiedImages.indexOf(id);
      copiedImages.splice(index, 1)
    }

    setImagesSelected(copiedImages);
  }

  return (
    <div className="App">
      <header>
        <h1>App Header</h1>
      </header>
      <section>
        {sidebarShowing && (
          <aside>
            <button onClick={getImages}>Load images</button>
          </aside>
        )}
        <div className="body">
          <button onClick={() => setSideBarShowing(!sidebarShowing)}>
            Show sidebar
          </button>
          <h2>Images</h2>
          <div className="image-wrap">
            {images.map((item, index) => {
              return (
                <figure key={index} onClick={() => imageSelected(item.id)} className={imagesSelected.includes(item.id) ? 'active' : null}>
                  <img src={item.download_url} crossOrigin="anonymous" alt={`${item.author}`} />
                  <p>{item.author}</p>
                </figure>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
