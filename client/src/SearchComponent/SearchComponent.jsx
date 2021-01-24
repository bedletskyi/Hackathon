import React, { PureComponent } from 'react';
import { Button, Form, Item, Segment } from 'semantic-ui-react';
import { searchAction } from './searchActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './search.css';

class ExampleComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
        };
    }

    onSearchChange = (e, { value }) => {
        this.setState({
            searchValue: value,
        });
    };

    onSearchSubmitted = () => {
        this.props.searchAction(this.state.searchValue);
    };

    render() {
        return (
            <Segment className="search-box">
                <Form>
                    <Form.Group className="search-box">
                        <Form.Input
                            className="search-input"
                            value={this.state.searchValue}
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
        },
        dispatch
    );
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleComponent);
