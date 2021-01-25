import React, { PureComponent } from 'react';
import { Card, Image, List } from 'semantic-ui-react';
import './ProductCard.css';

export default class EmptyProductCard extends PureComponent {
    render() {
        return (
            <Card className={'card-box'}>
                <div className={'card-image'}>
                    <Image wrapped ui={false} />
                </div>
                <Card.Content onMouseOver={this.onHover} onMouseLeave={this.onUnHover}>
                    <Card.Header>{this.props.name}</Card.Header>
                    <div>
                        <div className={'card-price-wrapper'}>
                            <span className={'card-price'}></span>
                            <span className={'card-price-currency'}></span>
                        </div>
                        <div className={'card-additional-info'}>
                            <List>
                                <List.Item>
                                    <span></span>
                                </List.Item>
                            </List>
                        </div>
                    </div>
                </Card.Content>
                <Card.Content extra>
                    <a></a>
                </Card.Content>
            </Card>
        );
    }
}
