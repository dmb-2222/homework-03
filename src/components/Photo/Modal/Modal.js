import React, { Component, createRef } from "react";
import styles from "../AppPhoto.module.css";
import PropTypes from "prop-types";

class Modal extends Component {
  constructor(props) {
    super();
    this.backdropRef = createRef();
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillMount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress = e => {
    if (e.code !== "Escape") return;
    this.props.onClose();
  };

  handleBackDropClick = e => {
    const { current } = this.backdropRef;
    if (current && e.target !== current) return;
    this.props.onClose();
  };

  render() {
    const { largeImageUrl } = this.props;

    return (
      <>
        <div
          className={styles.backdrop}
          onClick={this.handleBackDropClick}
          ref={this.backdropRef}
        >
          <div className={styles.modal}>
            <img src={largeImageUrl} alt="" />
          </div>
        </div>
      </>
    );
  }
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageUrl: PropTypes.string.isRequired
};
