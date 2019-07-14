import React, { Component} from "react";
import styles from "../AppPhoto.module.css";
import PropTypes from 'prop-types';

class Modal extends Component {
  constructor(props) {
    super();
  }

  handleDropClick = e => {
    this.props.onClose();
  };
  render() {
    const { largeImageUrl } = this.props;

    return (
      <>
        <div
          className={styles.backdrop}
          onClick={this.handleDropClick}
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
  largeImageUrl: PropTypes.string.isRequired,
};