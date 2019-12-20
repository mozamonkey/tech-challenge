import React, { Component } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default class LightImageBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: this.props.images,
      photoIndex: this.props.selectedPhotoIndex,
      isOpen: this.props.openLightBox
    };
  }

  closeModal = () => {
    this.setState({ isOpen: false }, () => {
      this.props.onClose()
    })
  }

  render() {
    const { photoIndex, isOpen, images } = this.state;

    return (
      <div>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.closeModal()}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length
              })
            }
          />
        )}
      </div>
    );
  }
}
