import React, { PureComponent } from 'react';
import { Modal, Dimmer, Loader, Checkbox,Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './statisticsModal.css';
import { toggleStatisticsModal, loadStatistics } from './statisticsModalActions';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

class StatisticsModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            auchanLineIsVisible : true,
            epicentrLineIsVisible : true,
            fozzyLineIsVisible : true
        }
        this.props.loadStatistics()
    }
    
    changeTargetChartVisibility = (data) =>{
        this.setState({...this.state,[data.value]:data.checked})
    }

    getModalContent = () =>{
        if(this.props.statisticsIsLoading){
            return (
                <Dimmer inverted active>
                    <Loader />
                </Dimmer>
            )
        }
        return (
            <div className="chart-wrapper">
                <LineChart width={600} height={400} data={this.props.statistics}>
                <XAxis dataKey="dayOfCapture" />
                <YAxis/>
                <Tooltip />
                    {this.state.auchanLineIsVisible && <Line type="monotone" dataKey="auchnPrice" stroke="#bd372b" />}
                    {this.state.epicentrLineIsVisible &&  <Line type="monotone" dataKey="epicentrPrice" stroke="#5187cd" />}
                    {this.state.fozzyLineIsVisible &&  <Line type="monotone" dataKey="fozzyPrice" stroke="#903ec5" />}
                </LineChart> 
            </div>

        )
    }

    render() {
        return (
            <Modal
                dimmer={"blurring"}
                onClose={() => this.props.toggleStatisticsModal()}
                open={this.props.showStatisticsModal}>
                <Modal.Header>Графік зміни цін на товар "гречана крупа"</Modal.Header>
                <Modal.Content>
                    {this.getModalContent()}
                </Modal.Content>
                <Modal.Actions>
                    <div className="actions-wrapper">
                        <Checkbox checked={this.state.auchanLineIsVisible} value="auchanLineIsVisible" onChange={(event, data) =>this.changeTargetChartVisibility(data)} />
                        <Label color={"red"} tag>
                            Ашан
                        </Label>
                        <Checkbox checked={this.state.epicentrLineIsVisible} value="epicentrLineIsVisible" onChange={(event, data) =>this.changeTargetChartVisibility(data)} className=".checkbox" />
                        <Label color={"blue"} tag>
                            Епіцентр
                        </Label>
                        <Checkbox checked={this.state.fozzyLineIsVisible} value="fozzyLineIsVisible" onChange={(event, data) =>this.changeTargetChartVisibility(data)} className=".checkbox" />
                        <Label color={"purple"} tag>
                            Фозі
                        </Label>
                    </div>
                </Modal.Actions>
            </Modal>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({toggleStatisticsModal, loadStatistics}, dispatch);
}

function mapStateToProps(state) {
    return {
        showStatisticsModal: state.statisticsData.showStatisticsModal,
        statisticsIsLoading: state.statisticsData.statisticsIsLoading,
        statistics: state.statisticsData.statistics
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsModal);
