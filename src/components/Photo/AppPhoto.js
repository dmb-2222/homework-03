import React from "react";

import SearchForm from "../Photo/SearchForm/SearchForm";
import Gallery from "../Photo/Gallery/Gallery";
import Modal from "./Modal/Modal";
import { restApi, restApiLoadMore } from "./services/restApi/restApi";
import Loader from "./services/Loader";
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
      isShowButtonloadMore: false,
      isLoading: false
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
    this.setState({ isLoading: true });
    this.nextPage = 1;
    restApi(this.state.searchValue)
      .then(({ data }) => {
        this.setState({ hits: data.hits, isShowButtonloadMore: true });
      })
      .catch("error")
      .finally(() => this.setState({ isLoading: false }));
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
      .then(() => {
        const scrollToEnd = document.getElementById("scroll");
        scrollToEnd.scrollIntoView({ behavior: "smooth" });
      })
      .catch("error");
  };
  render() {
    const {
      largeImageUrl,
      isModalOpen,
      hits,
      isShowButtonloadMore,
      isLoading
    } = this.state;
    return (
      <div className={styles.app}>
        <SearchForm
          onInputChange={this.inputSearch}
          onHandleSubmit={this.handleSubmite}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <Gallery
            items={hits}
            handleOnClickBigPic={this.openModal}
            onClickloadMore={this.loadMore}
            showButtonloadMore={isShowButtonloadMore}
          />
        )}
        {isModalOpen && (
          <Modal largeImageUrl={largeImageUrl} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default AppPhoto;
