import css from "./ImageCard.module.css";

export default function ImageCard({ src, alt }) {
  return (
    <div>
      <img src={src} alt={alt} className={css.cardImg} />
    </div>
  );
}
