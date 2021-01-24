import React, { PureComponent } from 'react';
import { Range, getTrackBackground } from 'react-range';

export default class RangeSliderComponent extends PureComponent {
    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    margin: '2em',
                }}
            >
                <Range
                    values={this.props.values}
                    step={this.props.step || 1}
                    min={this.props.minValue}
                    max={this.props.maxValue}
                    onChange={this.props.onChange}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: '36px',
                                display: 'flex',
                                width: '100%',
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: '5px',
                                    width: '100%',
                                    borderRadius: '4px',
                                    background: getTrackBackground({
                                        values: this.props.values,
                                        colors: ['#ccc', '#548BF4', '#ccc'],
                                        min: this.props.minValue,
                                        max: this.props.maxValue,
                                    }),
                                    alignSelf: 'center',
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '22px',
                                width: '22px',
                                borderRadius: '4px',
                                backgroundColor: '#FFF',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 2px 6px #AAA',
                            }}
                        >
                            <div
                                style={{
                                    height: '16px',
                                    width: '5px',
                                    backgroundColor: isDragged ? '#548BF4' : '#CCC',
                                }}
                            />
                        </div>
                    )}
                />
            </div>
        );
    }
}
