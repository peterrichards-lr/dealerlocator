import React from 'react';
import PropTypes from 'prop-types';

import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import ClayIcon from '@clayui/icon';

class GeoLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { location: undefined };
        this._handleClick = this._handleClick.bind(this);
    }
    
    _handleClick() {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                  this.props.onGeoLocationChange(position);
              });
          } else { 
              if (this.props.onError) {
                  this.props.onError();
              } else {
            	  console.warn("Geolocation is not supported by this browser.");
              }
          }
    }
    
    render() {
        if (this.props.text) {
            return (            
                <ClayButton displayType="primary" onClick={this._handleClick}>
                <span className="inline-item inline-item-before">
                  <ClayIcon spritemap={this.props.spriteMap} symbol="geolocation" />
                </span>
                  {this.props.text}
              </ClayButton>
            );
        }
        return <ClayButtonWithIcon onClick={this._handleClick} spritemap={this.props.spriteMap} symbol="geolocation" />;
    }
}

GeoLocation.propTypes = {
    spriteMap: PropTypes.string,
    text: PropTypes.string,
    onError: PropTypes.func,
    onGeoLocationChange: PropTypes.func.isRequired
};

GeoLocation.defaultProps = {
    spriteMap: Liferay.ThemeDisplay.getPathThemeImages() + '/clay/icons.svg',
    onError: undefined
};

export default GeoLocation