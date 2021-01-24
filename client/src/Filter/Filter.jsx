import React, { PureComponent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RangeSliderComponent from '../Shared/Slider';
import { filterItems } from './filterActions';

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
            brands: new Set(['aaa', 'bbb']),
            selectedBrands: new Set(['aaa', 'bbb']),
        };
    }

    handleChange = (rangeName) => (values) => {
        this.setState({
            [rangeName]: values,
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

    getBrandCheckbox = (brandName) => {
        return (
            <Form.Checkbox
                checked={Array.from(this.state.selectedBrands).includes(brandName)}
                onChange={this.handleBrandCheckboxChanged(brandName)}
                label={`${brandName}`}
            />
        );
    };

    filter = () => {
        this.props.filterItems({
            priceRange: this.state.selectedPriceRange,
            weightRange: this.state.selectedWeightRange,
            brands: this.state.selectedBrands,
        });
    };

    setDefaultSetting = () => {};

    render() {
        return (
            <Segment raised>
                <Form>
                    <Form.Group unstackable widths={2}>
                        <Form.Input label="Min price" value={this.state.selectedPriceRange[0]} />
                        <Form.Input label="Max price" value={this.state.selectedPriceRange[1]} />
                    </Form.Group>
                    <Form.Field>
                        <RangeSliderComponent
                            minValue={this.state.minPrice}
                            maxValue={this.state.maxPrice}
                            values={this.state.selectedPriceRange}
                            onChange={this.handleChange('selectedPriceRange')}
                        />
                    </Form.Field>
                    <Form.Group unstackable widths={2}>
                        <Form.Input label="Min weight" value={this.state.selectedWeightRange[0]} />
                        <Form.Input label="Max weight" value={this.state.selectedWeightRange[1]} />
                    </Form.Group>
                    <Form.Field>
                        <RangeSliderComponent
                            minValue={this.state.minWeight}
                            maxValue={this.state.maxWeight}
                            values={this.state.selectedWeightRange}
                            onChange={this.handleChange('selectedWeightRange')}
                        />
                    </Form.Field>
                    <Form.Group grouped>
                        <label>Brands:</label>
                        {Array.from(this.state.brands).map(this.getBrandCheckbox)}
                    </Form.Group>
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
