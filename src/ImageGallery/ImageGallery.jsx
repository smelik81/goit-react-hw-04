import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ images, openModal }) {
  return (
    <div className={css.container}>
      <ul className={css.list}>
        {images.map(({ id, urls: { small, regular }, alt_description }) => {
          return (
            <li key={id} className={css.item}>
              <ImageCard
                src={small}
                alt={alt_description}
                onClick={() => openModal({ regular, alt_description })}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
