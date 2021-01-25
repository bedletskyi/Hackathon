import React, { PureComponent } from 'react';
import { Modal, Dimmer, Loader, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './statisticsModal.css';
import { toggleStatisticsModal } from './statisticsModalActions';
import { LineChart, Line } from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page B', uv: 300, pv: 600, amt: 2400}];

class StatisticsModal extends PureComponent {
    constructor(props) {
        super(props);
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
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
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
