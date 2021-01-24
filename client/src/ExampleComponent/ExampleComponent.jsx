import React, { PureComponent } from "react";
import { Button, Form, Item, Segment } from 'semantic-ui-react'
import { searchAction } from "./exampleActions";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

class ExampleComponent extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            searchValue:''
        }
    }

    onSearchChange=(e, {value})=>{
        this.setState({
            searchValue:value
        })
    }

    render(){
        return (
            <Segment>
            <Form>
                <Form.Input value={this.state.searchValue} onChange={this.onSearchChange} label='search' />
                <Button onClick={()=>this.props.searchAction(this.state.searchValue)} type='submit'>Submit</Button>
            </Form>
            <Item>
                <Item.Content>
                    <Item.Header>{this.props.foundData}</Item.Header>
                </Item.Content>
            </Item>
            </Segment>
        )
    }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			searchAction
		},
		dispatch,
	);
}

function mapStateToProps(state) {
	return {
		foundData: state.exampleReducer.foundData
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleComponent);