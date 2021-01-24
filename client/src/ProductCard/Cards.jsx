import React, { PureComponent } from "react";
import { Card, Segment } from 'semantic-ui-react'
import ProductCard from "./ProductCard";
import './ProductCard.css';


export default class Cards extends PureComponent{
    render(){

        return (
            <Segment>
                <Card.Group>
                {this.props.cardsData.map((cardData, index)=>{
                    return (<ProductCard key={index} {...cardData}/>)
                })}
                </Card.Group>
            </Segment>
        )
    }
}
