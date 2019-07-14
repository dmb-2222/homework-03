import React from "react";

import SearchForm from "../Photo/SearchForm/SearchForm";
import Gallery from "../Photo/Gallery/Gallery";
import Modal from "./Modal/Modal";
import { restApi, restApiLoadMore } from "./services/restApi/restApi";
import styles from "./AppPhoto.module.css";

class AppPhoto extends React.Component {
  constructor() {
    super();
    this.nextPage = 1;
    this.state = {
      searchValue: "",
      hits: [],
      isModalOpen: false,
      largeImageUrl: "",
      isShowButtonloadMore: false
    };
  }
  inputSearch = e => {
    e.preventDefault();
    this.setState({
      searchValue: e.target.value
    });
  };
  handleSubmite = e => {
    e.preventDefault();
    this.nextPage = 1;
    restApi(this.state.searchValue)
      .then(({ data }) => {
        this.setState({ hits: data.hits, isShowButtonloadMore: true });
      })
      .catch("error");
  };
  openModal = largeUrl => {
    this.setState({ isModalOpen: true, largeImageUrl: largeUrl });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  loadMore = e => {
    e.preventDefault();
    this.nextPage++;
    restApiLoadMore(this.nextPage, this.state.searchValue)
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            hits: [...prevState.hits, ...data.hits]
          };
        });
      })
      .catch("error");
  };
  render() {
    const {
      largeImageUrl,
      isModalOpen,
      hits,
      isShowButtonloadMore
    } = this.state;
    return (
      <div className={styles.app}>
        <SearchForm
          onInputChange={this.inputSearch}
          onHandleSubmit={this.handleSubmite}
        />
        <Gallery
          items={hits}
          handleOnClickBigPic={this.openModal}
          onClickloadMore={this.loadMore}
          showButtonloadMore={isShowButtonloadMore}
        />
        {isModalOpen && (
          <Modal largeImageUrl={largeImageUrl} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default AppPhoto;
