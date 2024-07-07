import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!searchQuery.trim()) {
      toast.error("Incorrect request, field can`t be empty", {
        style: {
          fontSize: "28px",
        },
      });
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <header className={css.wrapper}>
      <form onSubmit={handleSubmit} className={css.container}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit" className={css.buttonSubmit}>
          <FaMagnifyingGlass size="24px" />
        </button>
      </form>
      <Toaster />
    </header>
  );
}
