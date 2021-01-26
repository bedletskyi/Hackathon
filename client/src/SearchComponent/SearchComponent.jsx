import React, { PureComponent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { searchAction, setSearchQuery } from './searchActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './search.css';

class SearchComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            search: "Гречана крупа",
        };
    }

    onSearchChange = (e, { value }) => {
        this.setState({search:value});
    };

    onSearchSubmitted = () => {
        this.props.setSearchQuery(this.state.search)
        this.props.searchAction(this.state.search);
    };

    render() {
        return (
            <Segment className="search-box">
                <Form>
                    <Form.Group className="search-box">
                        <Form.Input
                            className="search-input"
                            value={this.state.search}
                            onChange={this.onSearchChange}
                            placeholder="Гречка, рис, телефон..."
                        />
                        <Button className="submit-search" onClick={this.onSearchSubmitted} type="submit">
                            Знайти
                        </Button>
                    </Form.Group>
                </Form>
            </Segment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            searchAction,
            setSearchQuery,
        },
        dispatch
    );
}

function mapStateToProps(state) {
    return {
        query: state.searchData.query,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
