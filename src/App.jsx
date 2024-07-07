/* eslint-disable no-unused-vars */

import { useState, useEffect, useRef } from "react";
import "./App.css";
import { fetchArticles } from "./api/articles-api";
import SearchBar from "./SearchBar/SearchBar";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageGallery from "./ImageGallery/ImageGallery";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import toast, { Toaster } from "react-hot-toast";
import ImageModal from "./ImageModal/ImageModal";

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalAlt, setModalAlt] = useState("");
  const loadRef = useRef();
  useEffect(() => {
    if (!query) return;

    const getArticles = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const { results, total_pages } = await fetchArticles(query, page);
        if (!results.length) {
          toast.error("No results found. Please try a different search query.");
          return;
        } // мені так подобається більше - що Ви скажите як краще прописувати умову?
        /*  if (results.length === 0) {
          setLoadMore(false);
           toast.error("No results found. Please try a different search query.");
          return;
        } */
        setArticles((prevArticles) => [...prevArticles, ...results]);
        setLoadMore(page < total_pages);
        /*  if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        } */
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, [query, page]);

  const onHandleSearchSubmit = async (searchQuery) => {
    setQuery(searchQuery);
    setArticles([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    /*  const dims = loadRef.current.getBoundingClientRect();
    window.scrollTo({
      top: Math.round(dims.document.documentElement.scrollHeight) * 2,
      behavior: "smooth",
    }); */
  };

  const openModal = ({ regular, alt_description }) => {
    setModalImage(regular);
    setModalAlt(alt_description);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImage("");
    setModalAlt("");
  };
  /* console.log(window.document.documentElement.scrollHeight);
  console.log(window.document.documentElement.getBoundingClientRect()); */
  return (
    <div>
      <SearchBar onSubmit={onHandleSearchSubmit} />
      {error && <ErrorMessage />}
      {articles.length > 0 && (
        <ImageGallery images={articles} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {loadMore && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
      {modalImage && (
        <ImageModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          closeModal={closeModal}
          imageUrl={modalImage.regular}
          alt_description={modalAlt.alt_description}
        />
      )}
    </div>
  );
}

export default App;
