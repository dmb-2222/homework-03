import React, { Component} from "react";
import styles from "../AppPhoto.module.css";

class Modal extends Component {
  constructor(props) {
    super();
    // this.backDropRef = createRef();
  }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeyPress);
//   }
  handleKeyPress = e => {
    this.props.onClose();
  };
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
