import React from "react";
import styles from '../AppPhoto.module.css'

const SearchForm = ({ onInputChange, onHandleSubmit}) => {
  return (
    <>
      <form className={styles.searchForm} onSubmit={onHandleSubmit}>
        <input
          type='text'
          autoComplete="off"
          placeholder="Search images..."
          onChange={onInputChange}
        />
      </form>
    </>
  );
};
export default SearchForm;
