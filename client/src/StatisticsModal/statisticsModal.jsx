import React, { PureComponent } from 'react';
import { Modal, Dimmer, Loader, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './statisticsModal.css';
import { toggleStatisticsModal } from './statisticsModalActions';
import { LineChart, Line } from 'recharts';
const data = [{name: 'Page A', auchan: 400, epicentr: 2400, fozzy: 2400},{name: 'Page B', auchan: 300, epicentr: 600, fozzy: 2400}];

class StatisticsModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            auchanLineIsVisible : true,
            epicentrLineIsVisible : true,
            fozzyLineIsVisible : true
        }
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
                <LineChart width={400} height={400} data={data}>
                    {this.state.auchanLineIsVisible && <Line type="monotone" dataKey="auchan" stroke="#d32d41" />}
                    {this.state.epicentrLineIsVisible &&  <Line type="monotone" dataKey="epicentr" stroke="#8884d8" />}
                    {this.state.fozzyLineIsVisible &&  <Line type="monotone" dataKey="fozzy" stroke="#6ab187" />}
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
                        <Checkbox toggle checked={this.state.auchanLineIsVisible} value="auchanLineIsVisible"  label='Ашан' onChange={(event, data) =>this.changeTargetChartVisibility(data)} />
                        <Checkbox toggle checked={this.state.epicentrLineIsVisible} value="epicentrLineIsVisible" label='Епіцентр' onChange={(event, data) =>this.changeTargetChartVisibility(data)} className=".checkbox" />
                        <Checkbox toggle checked={this.state.fozzyLineIsVisible} value="fozzyLineIsVisible" label='Фозі' onChange={(event, data) =>this.changeTargetChartVisibility(data)} className=".checkbox" />
                    </div>
                </Modal.Actions>
            </Modal>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({toggleStatisticsModal}, dispatch);
}

function mapStateToProps(state) {
    return {
        showStatisticsModal: state.statisticsData.showStatisticsModal,
        statisticsIsLoading: state.statisticsData.statisticsIsLoading
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsModal);
