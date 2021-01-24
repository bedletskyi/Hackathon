import React, { PureComponent } from 'react';
import { Segment, Card, Grid, Dropdown, Image, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './productCardsWrapper.css';
import ProductCard from '../ProductCard/ProductCard';

class ProductCardsWrapper extends PureComponent {
    constructor(props) {
        super(props);
        this.cardsRef = React.createRef();
        this.state = {
            cardsColumns: 5,
        };
    }

    onWindowResize = () => {
        const cardsListBlockWidth = this.cardsRef.current.offsetWidth;
        this.setState({
            cardsColumns: Math.floor(cardsListBlockWidth / 250),
        });
    };

    componentDidMount() {
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    getCard = (productData, index) => {
        return (
            <Grid.Column>
                <ProductCard key={index} {...productData} />
            </Grid.Column>
        );
    };

    render() {
        return (
            <Segment raised className="cards-wrapper">
                <div className="dropdown-wrapper">
                    <Dropdown
                        placeholder="Sort by"
                        fluid
                        selection
                        options={[
                            { key: 'fromLower', value: 'fromLower', text: 'Від найдешевшого' },
                            { key: 'fromExpensive', value: 'fromExpensive', text: 'Від найдорощого' },
                        ]}
                        defaultValue={'fromLower'}
                        className="order-dropdown"
                    />
                </div>
                <div ref={this.cardsRef}>
                    <Grid textAlign='left' doubling columns={this.state.cardsColumns}>
                        {this.props.products.map(this.getCard)}
                    </Grid>
                </div>
            </Segment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
    return {
        products: state.productsData.productsToShow || [],
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardsWrapper);
