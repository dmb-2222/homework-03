import React from "react";
import PhotoCard from "../PhotoCard/PhotoCard";
import styles from "../AppPhoto.module.css";

const Gallery = ({ items = [], handleOnClickBigPic,showButtonloadMore, onClickloadMore }) => {
  // console.log(handleOnClickBigPic);
  // const { id, webformatURL, largeImageURL, views, comments, downloads } = items;
  // const arr = [...items, ...onClickloadMore]
  // console.log(arr)

  return (
    <>
      <ul className={styles.gallery}>
        {items.map(item => (
          <li key={item.id} className={styles.galleryItem}>
            <PhotoCard
              webformatURL={item.webformatURL}
              views={item.views}
              comments={item.comments}
              downloads={item.downloads}
              likes={item.likes}
              clickToOpenModal={() => handleOnClickBigPic(item.largeImageURL)}
            />
          </li>
        ))}
      </ul>
      {showButtonloadMore && (
        <button
          className={styles.button}
          type="button"
          onClick={onClickloadMore}
        >
          Load more
        </button>
      )}
    </>
  );
};
export default Gallery;
