import React, { PureComponent } from "react";

export default class CardImage extends PureComponent{
    render(){

        return (
            <div className={'card-image'}>
                <img src={this.props.image} alt={this.props.name}/>
            </div>
        )
    }
}
