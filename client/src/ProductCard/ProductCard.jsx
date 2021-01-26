import React, { PureComponent } from 'react';
import { Card, Image, List } from 'semantic-ui-react';
import './ProductCard.css';

export default class ProductCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
        };
    }

    onHover = () => {
        this.setState({ isHovered: true });
    };

    onUnHover = () => {
        this.setState({ isHovered: false });
    };

    render() {
        return (
            <Card className={'card-box'}>
                <div className={'card-image'}>
                    <Image src={this.props.image} wrapped ui={false} />
                </div>
                <Card.Content onMouseOver={this.onHover} onMouseLeave={this.onUnHover}>
                    <Card.Header className={'card-header'}><a className="card-link" href={this.props.url}  target="_blank">{this.props.name}</a></Card.Header>
                    <div>
                        <div className={'card-price-wrapper'}>
                            <span className={'card-price'}>{this.props.price}</span>
                            <span className={'card-price-currency'}>{' ₴ '}</span>
                        </div>
                        <div className={'card-additional-info'}>
                            <List>
                                <List.Item>
                                    <span>{this.props.weight + ' кг'}</span>
                                </List.Item>
                            </List>
                        </div>
                    </div>
                </Card.Content>
                <Card.Content extra>
                    <span>{this.props.site}</span>
                </Card.Content>
            </Card>
        );
    }
}
