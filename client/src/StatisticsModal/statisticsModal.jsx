import React, { PureComponent } from 'react';
import { Modal, Select, Checkbox, Icon, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './statisticsModal.css';
import { toggleStatisticsModal, loadStatistics, setStatistics } from './statisticsModalActions';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

class StatisticsModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            auchanLineIsVisible : true,
            epicentrLineIsVisible : true,
            fozzyLineIsVisible : true,
            period :3
        }
    }

    periodSelectOptions = [
        {key:"days",text:"Останні 3 дні",value:3},
        {key:"week",text:"Останній тиждень",value:7},
        {key:"month",text:"Останній місяць",value:30},
        {key:"year",text:"Останній рік",value:365}
    ]

    componentDidMount() {
        this.props.loadStatistics(3);
    }
    
    changeTargetChartVisibility = (data) =>{
        this.setState({...this.state,[data.value]:data.checked})
        this.props.setStatistics([...this.props.statistics])
    }

    changePeriod(period){
        if(this.state.period!==period){
            this.setState({...this.state, period})
            this.props.loadStatistics(period)
        }

    }

    getModalContent = () =>{
        return (
            <div className="chart-wrapper">               
                <LineChart width={600} height={400} data={this.props.statistics}>
                <XAxis dataKey="dayOfCapture" />
                <YAxis/>
                <Legend/>
                <Tooltip />
                    {this.state.auchanLineIsVisible && <Line type="monotone" dataKey="auchanPrice" stroke="#bd372b" name="auchan.zakaz.ua" unit=" грн/кг"/>}
                    {this.state.epicentrLineIsVisible &&  <Line type="monotone" dataKey="epicentrPrice" stroke="#5187cd" name="epicentrk.ua" unit=" грн/кг"/>}
                    {this.state.fozzyLineIsVisible &&  <Line type="monotone" dataKey="fozzyPrice" stroke="#903ec5" name="fozzyshop.ua" unit=" грн/кг"/>}
                </LineChart> 
                
            </div>

        )
    }

    render() {
        return (
            <Modal
                onClose={() => this.props.toggleStatisticsModal()}
                open={this.props.showStatisticsModal}>
                <Modal.Header>Графік зміни цін на товар за пошуковим запитом "Гречана крупа" 
                    <Popup content={`Графік створено на основі значень мінімальної ціни за 1 кілограм гречки в певному магазині на певну дату. Мінімальна ціна в магазині обирається з цін товарів, що з'являються в пошуковій видачі за запитом "Гречана крупа". Перед вибором, ціни всіх знайдених товарів приводяться до форми грн/кг.`}  position='bottom left' trigger={<Icon color={"blue"} name='question circle' size="small" />} />
                </Modal.Header>
                <Modal.Content>
                    {this.getModalContent()}
                </Modal.Content>
                <Modal.Actions>
                    <div className="actions-wrapper">
                        <div className="period-selector-wrapper">
                            <Select placeholder='Оберіть період перегляду цін' value={this.state.period} options={this.periodSelectOptions} onChange={(event, data) => this.changePeriod(data.value)}/>
                        </div>
                        <div className="targets-selector-wrapper">
                            <Checkbox checked={this.state.auchanLineIsVisible} label="Ашан" value="auchanLineIsVisible" onChange={(event, data) =>this.changeTargetChartVisibility(data)} />
                            <Checkbox checked={this.state.epicentrLineIsVisible}label="Епіцентр" value="epicentrLineIsVisible" onChange={(event, data) =>this.changeTargetChartVisibility(data)} className=".checkbox" />
                            <Checkbox checked={this.state.fozzyLineIsVisible} label="Фозі" value="fozzyLineIsVisible" onChange={(event, data) =>this.changeTargetChartVisibility(data)} className=".checkbox" />
                        </div>
                    </div>
                    
                </Modal.Actions>
            </Modal>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({toggleStatisticsModal, setStatistics, loadStatistics}, dispatch);
}

function mapStateToProps(state) {
    return {
        showStatisticsModal: state.statisticsData.showStatisticsModal,
        statisticsIsLoading: state.statisticsData.statisticsIsLoading,
        statistics: state.statisticsData.statistics
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsModal);
