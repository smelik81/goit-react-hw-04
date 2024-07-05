export default function ImageGallery({ articles }) {
  return (
    <div>
      <ul>
        {articles.map((article) => {
          console.log(article);
          return (
            <li key={article.id}>
              <div>
                <img src="" alt="" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
