import css from "./ImageCard.module.css";

export default function ImageCard({ src, alt, onClick }) {
  return (
    <div>
      <img src={src} alt={alt} className={css.cardImg} onClick={onClick} />
    </div>
  );
}
