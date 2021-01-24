import React, { PureComponent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RangeSliderComponent from '../Shared/Slider';
import { filterItems } from './filterActions';
import './filter.css';

class FilterComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            minPrice: 0,
            maxPrice: 2000,
            selectedPriceRange: [0, 2000],
            minWeight: 0,
            maxWeight: 2000,
            selectedWeightRange: [0, 2000],
        };
    }

    componentDidMount = () => {
        this.props.filterItems({
            priceRange: this.state.selectedPriceRange,
            weightRange: this.state.selectedWeightRange,
        });
    }

    handleRangeChange = (rangeName) => (values) => {
        this.setState({
            [rangeName]: values,
        });
    };

    handleInputChange = (inputName, index) => (e, { value }) => {
        const newValue = [...this.state[inputName]];
        newValue[index] = value;

        this.setState({
            [inputName]: newValue,
        });
    };

    handleBrandCheckboxChanged = (brandName) => (e, data) => {
        const selectedBrands = new Set([...this.state.selectedBrands]);

        if (data.checked) {
            selectedBrands.add(brandName);
        } else {
            selectedBrands.delete(brandName);
        }

        this.setState({
            selectedBrands,
        });
    };

    filter = () => {
        this.props.filterItems({
            priceRange: this.state.selectedPriceRange,
            weightRange: this.state.selectedWeightRange,
        });
    };

    setDefaultSetting = () => {};

    render() {
        return (
            <Segment className={'filter-segment'} raised>
                <Form>
                    <Form.Group unstackable widths={2}>
                        <Form.Input
                            label="Min price"
                            value={this.state.selectedPriceRange[0]}
                            onChange={this.handleInputChange('selectedPriceRange', 0)}
                        />
                        <Form.Input
                            label="Max price"
                            value={this.state.selectedPriceRange[1]}
                            onChange={this.handleInputChange('selectedPriceRange', 1)}
                        />
                    </Form.Group>
                    <Form.Field>
                        <RangeSliderComponent
                            minValue={this.state.minPrice}
                            maxValue={this.state.maxPrice}
                            values={this.state.selectedPriceRange}
                            onChange={this.handleRangeChange('selectedPriceRange')}
                        />
                    </Form.Field>
                    <Form.Group unstackable widths={2}>
                        <Form.Input
                            label="Min weight"
                            value={this.state.selectedWeightRange[0]}
                            onChange={this.handleInputChange('selectedWeightRange', 0)}
                        />
                        <Form.Input
                            label="Max weight"
                            value={this.state.selectedWeightRange[1]}
                            onChange={this.handleInputChange('selectedWeightRange', 1)}
                        />
                    </Form.Group>
                    <Form.Field>
                        <RangeSliderComponent
                            minValue={this.state.minWeight}
                            maxValue={this.state.maxWeight}
                            values={this.state.selectedWeightRange}
                            onChange={this.handleRangeChange('selectedWeightRange')}
                        />
                    </Form.Field>
                    <Button onClick={this.filter} primary>
                        Filter
                    </Button>
                    <Button onClick={this.setDefaultSetting} basic>
                        Cancel
                    </Button>
                </Form>
            </Segment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ filterItems }, dispatch);
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
