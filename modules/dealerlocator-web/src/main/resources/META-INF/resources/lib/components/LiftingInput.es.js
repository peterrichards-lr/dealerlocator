import React from 'react';
import PropTypes from 'prop-types';

import ClayForm, {ClayInput} from '@clayui/form';

class LiftingInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this._handleChange = this._handleChange.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._handleBlur = this._handleBlur.bind(this);
    }
    
    _handleChange(e) {
        this.setState({value: e.target.value});
    }
    
    _handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    }
    
    _handleBlur(e) {
        if (this.state.postcode !== e.target.value)
            this.props.onValueChange(this.state.value);
    }
    
    render() {
        return (
            <ClayInput type="text" placeholder={this.props.placeholder} value={this.state.value} onChange={this._handleChange} onKeyDown={this._handleKeyDown} onBlur={this._handleBlur} />
        );
    }
}

LiftingInput.propTypes = {
    onValueChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

LiftingInput.defaultProps = {
    placeholder: '',
};

export default LiftingInput