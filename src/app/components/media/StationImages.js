import React, { Component } from 'react';
import { Row, Col, Modal, ModalBody } from 'reactstrap';
import { array, string, bool, func } from 'prop-types';
import { connect } from 'react-redux';

export default class StationImages extends Component {
  static displayName = 'StationImages'

  static propTypes = {
    images: array.isRequired
  }

  state = {
    modal: false
  }

  _toggle = (imgUrl) => () => {
    this.setState({
      modal: !this.state.modal,
      currentImgUrl: imgUrl
    });
  }

  render() {
    const { images } = this.props;

    const {
      currentImgUrl,
      modal
    } = this.state;

    return (
      <div className="StationImages">
        <Row>
          {
            images.map((image, index) => {
              const {
                imageUrl = '',
                avatarUrl = '',
                authorName = ''
              } = image;

              return (
                <Col key={index} xs="6" md="4" lg="3">
                  <div className="StationImages-item">
                    <div className="StationImages-thumbnail" onClick={this._toggle(imageUrl)}>
                      <img src={imageUrl} />
                    </div>
                    <ImageControl />
                    <Author avatarUrl={avatarUrl} authorName={authorName} />
                  </div>
                </Col>
              );
            })
          }
        </Row>
        <ImageModal imageUrl={currentImgUrl} modal={modal} toggle={this._toggle(null)} />
      </div>
    );
  }
}

class ImageModal extends Component {
  static displayName = 'ImageModal'

  static propTypes = {
    imageUrl: string,
    modal: bool,
    toggle: func
  }

  render() {
    const {
      imageUrl,
      modal,
      toggle
    } = this.props;

    return (
      <Modal className="ImageModal" modalClassName="ImageModal-dialog" isOpen={modal} toggle={toggle}>
        <ModalBody>
          <img src={imageUrl} className="ImageModal-img" />
        </ModalBody>
      </Modal>
    );
  }
}

class ImageControl extends Component {
  static displayName = 'ImageControl'

  render() {
    return (
      <div className="ImageControl clearfix">
        <div className="ImageControl-link"><i className="fa fa-link" aria-hidden="true"></i></div>
        <div className="ImageControl-react">
          <ul className="clearfix">
            <li><i className="fa fa-eye" aria-hidden="true"></i><span>0</span></li>
            <li><i className="fa fa-comment" aria-hidden="true"></i><span>0</span></li>
            <li><i className="fa fa-heart" aria-hidden="true"></i><span>0</span></li>
          </ul>
        </div>
      </div>
    );
  }
}

class Author extends Component {
  static displayName = 'Author'
  
  static propTypes = {
    avatarUrl: string,
    authorName: string
  }

  render() {
    const { avatarUrl, authorName } = this.props;

    return (
      <div className="Author">
        {
          avatarUrl && <div className="Author-avatar">
          <img src={avatarUrl} />
        </div>
        }
        <div className="Author-name">
          {authorName}
        </div>
      </div>
    );
  }
}