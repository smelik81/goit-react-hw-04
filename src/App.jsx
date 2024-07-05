import { useState, useEffect } from "react";
import "./App.css";
import { fetchArticles } from "./api/articles-api";
import SearchBar from "./SearchBar/SearchBar";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageGallery from "./ImageGallery/ImageGallery";

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!query) return;

    async function getArticles() {
      try {
        setIsLoading(true);
        setArticles([]);
        setError(false);
        const { results, total_pages } = await fetchArticles(query, page);

        if (!results.length) return;
        setArticles((prevArticles) => [...prevArticles, ...results]);
        setLoadMore(page < total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getArticles();
  }, [query, page]);

  const onHandleSearchSubmit = async (searchQuery) => {
    setQuery(searchQuery);
    console.log(searchQuery);
    setPage(1);
  };

  console.log(loadMore);

  return (
    <div>
      <SearchBar onSubmit={onHandleSearchSubmit} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ImageGallery articles={articles} />
    </div>
  );
}

export default App;
