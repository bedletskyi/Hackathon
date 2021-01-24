import React, { PureComponent } from "react";
import { Card, Image, List } from 'semantic-ui-react'
import CardImage from "./CardImage";


export default class ProductCard extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            isHovered:false
        }
    }

    onHover=()=>{
        this.setState({isHovered:true})
    }

    onUnHover=()=>{
        this.setState({isHovered:false})
    }

    render(){
        
        return (
            <Card>
                <CardImage image={this.props.image} name={this.props.name}/>
                <Card.Content onMouseOver={this.onHover} onMouseLeave={this.onUnHover} >
                <Card.Header>{this.props.name}</Card.Header>
                <div>
                    <div className={'card-price-wrapper'}>
                        <span className={'card-price'}>{this.props.price}</span>
                        <span className={'card-price-currency'}>{' ₴ '}</span>
                    </div>
                <div className={'card-additional-info'}>
                    <List>
                        <List.Item>
                            <span>{this.props.weight + ' g'}</span>
                        </List.Item>
                        <List.Item>
                            <span>{this.props.brand}</span>
                        </List.Item>
                    </List>
                </div>
                </div>
                </Card.Content>
                <Card.Content extra>
                    <a href={this.props.site}>{this.props.site}</a>
                </Card.Content>
            </Card>
        )
    }
}
