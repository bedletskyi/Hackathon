import React, { PureComponent } from 'react';
import { Segment, Card, Grid, Dropdown, Image, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './productCardsWrapper.css';
import ProductCard from '../ProductCard/ProductCard';
import StatisticsModal from '../StatisticsModal/statisticsModal';
import { toggleStatisticsModal } from '../StatisticsModal/statisticsModalActions';
import { FROM_EXPENSIVE_SORT_STRATEGY, FROM_LOWER_SORT_STRATEGY } from './sortStrategies';
import { setSortSettings, makeInitialSearch } from './productCardActions';
import EmptyProductCard from '../ProductCard/EmptyCard';

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
        this.props.makeInitialSearch();
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

    getEmptyCard = () => {
        return (
            <Grid.Column>
                {' '}
                <EmptyProductCard />
            </Grid.Column>
        );
    };

    showStatistics = () => {
        this.props.toggleStatisticsModal();
    };

    onSortChange = (e, { value }) => {
        this.props.setSortSettings(value);
    };

    getProductCards = () => {
        if (this.props.loading) {
            return new Array(this.state.cardsColumns).fill({}).map(this.getEmptyCard);
        }

        return this.props.products.map(this.getCard);
    };

    render() {
        const productCards = this.getProductCards();

        return (
            <Segment loading={this.props.loading} raised className="cards-wrapper">
                <div className="card-list-header">
                    <div className="dropdown-wrapper">
                        <Dropdown
                            placeholder="Sort by"
                            fluid
                            selection
                            options={[
                                {
                                    key: FROM_LOWER_SORT_STRATEGY,
                                    value: FROM_LOWER_SORT_STRATEGY,
                                    text: 'Від найдешевшого',
                                },
                                {
                                    key: FROM_EXPENSIVE_SORT_STRATEGY,
                                    value: FROM_EXPENSIVE_SORT_STRATEGY,
                                    text: 'Від найдорожчого',
                                },
                            ]}
                            defaultValue={this.props.sortStrategy}
                            className="order-dropdown"
                            onChange={this.onSortChange}
                        />
                    </div>
                    <div className="statistics-wrapper" onClick={this.showStatistics}>
                        <Icon name="chart line" color="blue" size="large" />
                        <p>Переглянути графік зміни цін</p>
                    </div>
                </div>

                <div ref={this.cardsRef}>
                    <Grid textAlign="left" doubling columns={this.state.cardsColumns}>
                        {productCards}
                    </Grid>
                </div>
                <StatisticsModal></StatisticsModal>
            </Segment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleStatisticsModal, setSortSettings, makeInitialSearch }, dispatch);
}

function mapStateToProps(state) {
    return {
        products: state.productsData.productsToShow || [],
        sortStrategy: state.productsData.sortStrategy,
        loading: state.productsData.loading,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardsWrapper);
