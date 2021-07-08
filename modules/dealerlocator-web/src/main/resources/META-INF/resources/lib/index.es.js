import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMap from 'google-map-react';
import PropTypes from 'prop-types';
import base64 from 'base-64';

import ClayLayout from '@clayui/layout';

import CaptureUserLocation from './components/CaptureUserLocation.es.js';
import Marker from './components/Marker.es.js';
import { readLocalisedValue } from './components/LiferayHelper.es.js';

class DealerLocator extends React.Component {    

      constructor(props) {
          super(props)
          this.state = { location: { lat: this.props.center.lat, lng: this.props.center.lng }, dealers: [], zoom: this.props.zoom, bounds: null };
          this._handleLocationChange = this._handleLocationChange.bind(this);
          this._handleChildClick = this._handleChildClick.bind(this);
          this._getLocation = this._getLocation.bind(this);
          this._reset = this._reset.bind(this);
      }

      _handleLocationChange(location) {
          this.setState({ location: location}, () => {
              this._getLocation();
          });        
      }
      
      _getLocation() {
          const reqeustUrl = 
              this.props.dealerLocatorApiUrl
                  .replace(this.props.latitudeUriPathPlaceholder, this.state.location.lat)
                  .replace(this.props.longitudeUriPathPlaceholder, this.state.location.lng);

          const dealerLocatorResponse = fetch(reqeustUrl, {
              method: "GET",
          })
          .then(response => response.json())
          .then(data => {
        	  data.items && data.items.forEach((item) => {
                  item.show = false; // eslint-disable-line no-param-reassign
                  item.dealer.name = readLocalisedValue(item.dealer.name, "Name", Liferay.ThemeDisplay.getLanguageId());
                  item.dealer.openingHours = readLocalisedValue(item.dealer.openingHours, "OpeningHours", Liferay.ThemeDisplay.getLanguageId());
                  item.dealer.address = 
                      readLocalisedValue(item.dealer.address.street, "Street", Liferay.ThemeDisplay.getLanguageId()) +
                      '<br/>' +
                      readLocalisedValue(item.dealer.address.locality, "Locality", Liferay.ThemeDisplay.getLanguageId()) +
                      '<br/>' +
                      readLocalisedValue(item.dealer.address.state, "State", Liferay.ThemeDisplay.getLanguageId()) +
                      '<br/>' +
                      item.dealer.address.postalCode;
                  item.dealer.imageSrc = this.props.infoWindowImageSrc;
                  item.dealer.imageStyle = { width: "50px" };
              });
              this.setState({ dealers: data.items });
          })
      }
      
      _reset() {
          this.setState({ dealers: null });
      }
      
      _handleChildClick(key) {
          const id = parseInt(key, 10);
          this.setState((state) => {
            const index = state.dealers.findIndex((e) => e.dealer.id === id);
            state.dealers[index].show = !state.dealers[index].show; // eslint-disable-line no-param-reassign
            return { dealers: state.dealers };
          });
        };
      
      render() {
          return (
            <ClayLayout.ContainerFluid>
                <ClayLayout.ContentRow>
                    <ClayLayout.ContentCol expand>
                        <CaptureUserLocation onLocationChange={this._handleLocationChange} onError={this._reset}/>
                    </ClayLayout.ContentCol>
                </ClayLayout.ContentRow>
                <ClayLayout.ContentRow>
                    <ClayLayout.ContentCol style={this.props.mapContainerStyle}>
                        <GoogleMap
                          bootstrapURLKeys={this.props.apiKey && {key: this.props.apiKey}} 
                          center={this.state.location}
                          zoom={this.state.zoom}
                          onChildClick={this._handleChildClick}
                        >
                        {this.state.dealers && this.state.dealers.map(d => {
                            return (
                            <Marker
                                text={d.dealer.name}
                                markerImageSrc={this.props.dealerMarkerImageSrc}
                                key={d.dealer.id}
                                place={d.dealer}
                                show={d.show}
                                lat={d.dealer.geolocation.latitude}
                                lng={d.dealer.geolocation.longitude} />
                        )
                        })}                        
                        </GoogleMap>
                    </ClayLayout.ContentCol>
                </ClayLayout.ContentRow>
            </ClayLayout.ContainerFluid>
        );
      }      
}

DealerLocator.propTypes = {
    apiKey: PropTypes.string.isRequired,
    dealerMarkerImageSrc: PropTypes.string,
    infoWindowImageSrc: PropTypes.string,
    mapContainerStyle: PropTypes.object,
    center: PropTypes.object,
    zoom: PropTypes.number,
    dealerLocatorApiUrl: PropTypes.string,
    latitudeUriPathPlaceholder: PropTypes.string,
    longitudeUriPathPlaceholder: PropTypes.string
};
//Original.svg
DealerLocator.defaultProps = {
    mapContainerStyle: { height: '400px', width: '100%'  },
    center: { lat: 51.5074, lng: 0.1278 },
    zoom: 9,
    dealerLocatorApiUrl: Liferay.ThemeDisplay.getPortalURL() + "/o/headless-dealers/v1.0/nearestDealers?latitude={{lat}}&longitude={{lng}}&limit=10",
    latitudeUriPathPlaceholder: "{{lat}}",
    longitudeUriPathPlaceholder: "{{lng}}"
};

export default function(elementId, apiKey, dealerMarkerImageSrc, infoWindowImageSrc, mapContainerStyle, center, zoom, dealerLocatorApiUrl, latitudeUriPathPlaceholder, longitudeUriPathPlaceholder) {
    ReactDOM.render(
            <DealerLocator
                apiKey={apiKey}
                dealerMarkerImageSrc={dealerMarkerImageSrc}
                infoWindowImageSrc={infoWindowImageSrc}
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={zoom}
                dealerLocatorApiUrl={dealerLocatorApiUrl}
                latitudeUriPathPlaceholder={latitudeUriPathPlaceholder}
                longitudeUriPathPlaceholder={longitudeUriPathPlaceholder}
            />, document.getElementById(elementId));
}