import React from 'react';
import PropTypes from 'prop-types';

import ClayLayout from '@clayui/layout';
import ClayAlert from '@clayui/alert';

import LiftingInput from './LiftingInput.es.js';
import GeoLocation from './GeoLocation.es.js';

class CaptureUserLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: null};
        this._handlePostcodeChange = this._handlePostcodeChange.bind(this);
        this._handleGeoLocationChange = this._handleGeoLocationChange.bind(this);
        this._handleGeoLocationError = this._handleGeoLocationError.bind(this);
        this._triggerErrorEvent = this._triggerErrorEvent.bind(this);
    }
    
    _handlePostcodeChange(postcode) {
        this.setState({ error: null});
        
        if (postcode == null || postcode === '') {
            return;
        }

        if (postcode.trim() === '') {
            this.setState({ error: Liferay.Language.get('component.captureUserLocation.invalidPostcode')});
            return;
        }
        
        const normalisedPostcode = postcode.replace(/\s/g, '');
        const reqeustUrl = 
            this.props.postcodeApiUrl.replace(
                this.props.postcodeUriPathPlaceholder, normalisedPostcode);
        
        const postcodeApiResponse = fetch(reqeustUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                this._sendLocation(data.result.latitude, data.result.longitude);
            } else if (data.status === 404) {
                this.setState({ error: Liferay.Language.get('component.captureUserLocation.invalidPostcode')}, () => this._triggerErrorEvent());
            } else {
                this.setState({ error: Liferay.Language.get('component.captureUserLocation.unhandledHttpStatusError')}, () => this._triggerErrorEvent());
                console.warn(err);
            }
        })
        .catch(err => {
            this.setState({ error: Liferay.Language.get('component.captureUserLocation.unexpectedError')}, () => this._triggerErrorEvent());
            console.warn(err);
        });
    }
    
    _triggerErrorEvent() {
        if (this.props.onError) {
            this.props.onError(this.state.error);
        }
    }
    
    _handleGeoLocationError() {
        this.setState({ error: Liferay.Language.get('component.captureUserLocation.geoLocationError')}, () => this._triggerErrorEvent());
    }
    
    _handleGeoLocationChange(position) {
        this.setState({ error: null});
        this._sendLocation(position.coords.latitude, position.coords.longitude);
    }
    
    _sendLocation(lat, lng) {
        const location = { lat: lat, lng: lng };
        this.props.onLocationChange(location);
    }
    
    render() {
        const colStyles = {
            paddingBottom: ".75rem",
            paddingTop: ".75rem"
        };
        return (
            <ClayLayout.ContainerFluid>
                <ClayLayout.Row justify="start">
                    <ClayLayout.Col size={5} style={colStyles}>
                        <LiftingInput placeholder={this.props.postcodeInputPlaceholder} onValueChange={this._handlePostcodeChange} />
                    </ClayLayout.Col>
                    <ClayLayout.Col  size={5} style={colStyles}>
                        <GeoLocation text={this.props.useGeoLocationButtonText} onError={this._handleGeoLocationError} onGeoLocationChange={this._handleGeoLocationChange} />
                    </ClayLayout.Col>
                </ClayLayout.Row>
                <ClayLayout.Row justify="start">
                    <ClayLayout.Col size={12} style={colStyles}>
                        {this.state.error &&  <ClayAlert displayType="danger" spritemap={this.props.spriteMap} title={this.state.error} variant="feedback" />}
                    </ClayLayout.Col>
                </ClayLayout.Row>
            </ClayLayout.ContainerFluid>
        );
    }
}

CaptureUserLocation.propTypes = {
    spriteMap: PropTypes.string,
    postcodeApiUrl: PropTypes.string,
    postcodeUriPathPlaceholder: PropTypes.string,
    postcodeInputPlaceholder: PropTypes.string,
    useGeoLocationButtonText: PropTypes.string,
    onError: PropTypes.func,
    onLocationChange: PropTypes.func.isRequired
};

CaptureUserLocation.defaultProps = {
    spriteMap: Liferay.ThemeDisplay.getPathThemeImages() + '/clay/icons.svg',
    postcodeApiUrl: "https://api.postcodes.io/postcodes/{{postcode}}",
    postcodeUriPathPlaceholder: "{{postcode}}",
    postcodeInputPlaceholder: Liferay.Language.get('component.captureUserLocation.postcodeInputPlaceholder'),
    useGeoLocationButtonText: Liferay.Language.get('component.captureUserLocation.useGeoLocationButtonText'),
    onError: undefined
};

export default CaptureUserLocation;