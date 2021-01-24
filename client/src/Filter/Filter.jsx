import React, { PureComponent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RangeSliderComponent from '../Shared/Slider';
import { filterItems, setDefaultFilterOptions } from './filterActions';
import './filter.css';

class FilterComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            minPrice: 0,
            maxPrice: props.maxPrice,
            selectedPriceRange: [0, props.maxPrice],
            minWeight: 0,
            maxWeight: props.maxWeight,
            selectedWeightRange: [0, props.maxWeight],
        };
    }

    componentDidUpdate = () => {
        if (this.state.maxPrice !== this.props.maxPrice || this.state.maxWeight !== this.props.maxWeight) {
            this.setState({
                maxPrice: this.props.maxPrice,
                maxWeight: this.props.maxWeight,
                selectedPriceRange: [0, this.props.maxPrice],
                selectedWeightRange: [0, this.props.maxWeight],
            });
        }
    };

    componentDidMount = () => {
        this.props.setDefaultFilterOptions();
        this.props.filterItems({
            priceRange: this.state.selectedPriceRange,
            weightRange: this.state.selectedWeightRange,
        });
    };

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

    setDefaultSetting = () => {
        this.props.setDefaultFilterOptions();
    };

    render() {
        return (
            <Segment className={'filter-segment'} raised>
                <Form>
                    <Form.Group unstackable widths={2}>
                        <Form.Input
                            label="Мінімальна ціна"
                            value={this.state.selectedPriceRange[0]}
                            onChange={this.handleInputChange('selectedPriceRange', 0)}
                        />
                        <Form.Input
                            label="Максимальна ціна"
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
                            label="Мінімальна вага"
                            value={this.state.selectedWeightRange[0]}
                            onChange={this.handleInputChange('selectedWeightRange', 0)}
                        />
                        <Form.Input
                            label="Максимальна вага"
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
    return bindActionCreators({ filterItems, setDefaultFilterOptions }, dispatch);
}

function mapStateToProps(state) {
    return {
        maxPrice: state.filterData.filterOptions.maxPrice,
        maxWeight: state.filterData.filterOptions.maxWeight,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
