import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import he from 'he';

import ClayCard from '@clayui/card';

const Wrapper = styled.div`
    position: absolute;
    transform: translate(36px, calc(-100% - 36px));
    z-index: 100;
`;

class InfoWindow extends React.Component {

    constructor(props) {
        super(props)
    }
    
    render() {
        const place = this.props.place;
        if (place.imageSrc) {
            return (
            <Wrapper style={{minWidth: '350px'}}>
            <ClayCard className="card card-horizontal">
                <ClayCard.Row>
                    <div className="autofit-col" style={{padding: '5px', margin: 'auto'}}>
                        <img
                            alt={place.name}
                            className="card-item-first"
                            src={place.imageSrc}
                            style={place.imageStyle}
                        />
                    </div>
                    <div className="autofit-col" style={{padding: '5px'}}>
                        <section className="autofit-section">
                            <ClayCard.Description displayType="title">
                                {place.name}
                            </ClayCard.Description>
                            {place.address && <ClayCard.Description truncate={false} displayType="text" dangerouslySetInnerHTML={{ __html: place.address }} />}
                        </section>
                    </div>
                    <div className="autofit-col autofit-col-expand" style={{padding: '5px'}}>
                        <section className="autofit-section">
                                {place.emailAddress && <ClayCard.Description truncate={false} displayType="text">
                                {place.emailAddress}
                            </ClayCard.Description>}
                            {place.phoneNumber && <ClayCard.Description truncate={false} displayType="text">
                                {place.phoneNumber}
                            </ClayCard.Description>}
                            {place.openingHours && <ClayCard.Description truncate={false} displayType="text">
                                {place.openingHours}
                            </ClayCard.Description>}
                        </section>
                    </div>
                  </ClayCard.Row>
              </ClayCard>
              </Wrapper>
            );
        }
        return (
            <Wrapper style={{minWidth: '150px'}}>
            <ClayCard>
                <ClayCard.Body>
                    <ClayCard.Description displayType="title">
                        {place.name}
                    </ClayCard.Description>
                    {place.address && <ClayCard.Description truncate={false} displayType="text" dangerouslySetInnerHTML={{ __html: place.address }} />}
                    {place.emailAddress && <ClayCard.Description truncate={false} displayType="text">
                        {place.emailAddress}
                    </ClayCard.Description>}
                    {place.phoneNumber && <ClayCard.Description truncate={false} displayType="text">
                        {place.phoneNumber}
                    </ClayCard.Description>}
                    {place.openingHours && <ClayCard.Description truncate={false} displayType="text">
                        {place.openingHours}
                    </ClayCard.Description>}
                </ClayCard.Body>
            </ClayCard>
            </Wrapper>
        );
    }
}

InfoWindow.propTypes = {
    place: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
        formattedAddress: PropTypes.string,
        emailAddress: PropTypes.string,
        phoneNumber: PropTypes.string,
        openingHours: PropTypes.string
    })
};

InfoWindow.defaultProps = {
};

export default InfoWindow;