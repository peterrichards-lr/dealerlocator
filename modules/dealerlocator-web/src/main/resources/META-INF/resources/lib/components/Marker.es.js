import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {ClayTooltipProvider} from '@clayui/tooltip';
import ClayIcon from '@clayui/icon';
import ClaySticker from '@clayui/sticker';

import InfoWindow from './InfoWindow.es.js';

const DefaultMarker = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    background-color: #000;
    border: 2px solid #fff;
    border-radius: 100%;
    user-select: none;
    transform: translate(-50%, -50%);
`;

const MarkerWrapper = styled.div`
    z-index: 10;
    cursor: default;
`;

class Marker extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.markerImageSrc) {
            return (
                <MarkerWrapper>
                <ClayTooltipProvider>
                    <ClaySticker
                      onClick={this.props.onClick}
                      title={this.props.text}>
                        <ClaySticker.Image
                          alt={this.props.markerImageAlt}
                          src={this.props.markerImageSrc}
                        />
                    </ClaySticker>
                </ClayTooltipProvider>
                {this.props.show && <InfoWindow place={this.props.place} />}
                </MarkerWrapper>
            );
        }
        return (
            <MarkerWrapper>
            <ClayTooltipProvider>
            <DefaultMarker
              title={this.props.text}
              onClick={this.props.onClick}
            />
            </ClayTooltipProvider>
            {this.props.show && <InfoWindow place={this.props.place} />}" +
            </MarkerWrapper>
        );
    }
}

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  markerImageSrc: PropTypes.string,
  markerImageAlt: PropTypes.string,
  show: PropTypes.bool,
  place: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string,
      address: PropTypes.string,
      emailAddress: PropTypes.string,
      phoneNumber: PropTypes.string,
      openingHours: PropTypes.string
  })
};

Marker.defaultProps = {
  onClick: null,
  markerImageSrc: null,
  markerImageAlt: null
};

export default Marker;