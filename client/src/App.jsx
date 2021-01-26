import React from 'react';
import { Provider } from 'react-redux';
import SearchComponent from './SearchComponent/SearchComponent';
import FilterComponent from './Filter/Filter';
import ProductCardsWrapper from './ProductCardsWrapper/ProductCardsWrapper';
import store from './root/store';
import { Grid } from 'semantic-ui-react';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { windowWidth: window.innerWidth };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth });
    };

    getMainContent = (windowWidth) => {
        if (windowWidth < 992) {
            return (
                <Grid centered textAlign="left">
                    <Grid.Row>
                        <SearchComponent />
                    </Grid.Row>
                    <Grid.Row>
                        <FilterComponent />
                    </Grid.Row>
                    <Grid.Row>
                        <ProductCardsWrapper />
                    </Grid.Row>
                </Grid>
            );
        }
        return (
            <Grid centered>
                <Grid.Row>
                    <Grid.Column width={windowWidth > 1440 ? 14 : 16}>
                        <SearchComponent />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Column width={windowWidth > 1440 ? 3 : 5}>
                    <FilterComponent />
                </Grid.Column>
                <Grid.Column width={11}>
                    <ProductCardsWrapper />
                </Grid.Column>
            </Grid>
        );
    };

    render() {
        return <Provider store={store}>{this.getMainContent(this.state.windowWidth)}</Provider>;
    }
}
