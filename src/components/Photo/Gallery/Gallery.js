import React from "react";
import PhotoCard from "../PhotoCard/PhotoCard";
import styles from "../AppPhoto.module.css";
import PropTypes from "prop-types";

const Gallery = ({
  items = [],
  handleOnClickBigPic,
  showButtonloadMore,
  onClickloadMore
}) => {
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
      <div id="scroll" />
    </>
  );
};

export default Gallery;

Gallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOnClickBigPic: PropTypes.func.isRequired,
  showButtonloadMore: PropTypes.bool,
  onClickloadMore: PropTypes.func.isRequired
};
