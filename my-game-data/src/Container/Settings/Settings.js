import React from 'react'
import StaticText from '../../Component/Basic/StaticText/StaticText'
import Switch from '../../Component/Basic/Switch/Switch'
import SettingStyle from './Settings.module.css'
import {Constant} from '../../Global/Constant'
import {connect} from 'react-redux'
import {Save_info} from '../../Store/Actions/SettingAction'

class Settings extends React.Component{

 
    
    render(){
        const SettingsKey = Constant().SettingsKey()
        const UI = Constant().UI()
        return(
            <div className={SettingStyle.body}>
                <div className={SettingStyle.section}>
                    <StaticText value="Personal Information" type={UI.HEADER}></StaticText>
                    <Switch onSave={this.props.saveInfo} token={this.props.usertoken}  valueType={SettingsKey.username} value={this.props.username} type={UI.SINGLELINE} text="Name"></Switch>
                    <Switch onSave={this.props.saveInfo}  token={this.props.usertoken} valueType={SettingsKey.useremail}value={this.props.useremail} type={UI.SINGLELINE} text="Email"></Switch>
                    <Switch onSave={this.props.saveInfo} token={this.props.usertoken}  valueType={SettingsKey.usertoken} value={this.props.usertoken} type={UI.SINGLELINE} text="Token"></Switch>
                </div>
                <div className={SettingStyle.section}>
                    <StaticText value="Selected Game" type={UI.HEADER}></StaticText>
                    <Switch onSave={this.props.saveInfo}  token={this.props.usertoken} valueType={SettingsKey.games} value={this.props.games} type={UI.SINGLELINE} text="Games"></Switch>
                </div>
                <div className={SettingStyle.section}>
                    <StaticText value="Selected Area" type={UI.HEADER}></StaticText>
                    <Switch onSave={this.props.saveInfo}  token={this.props.usertoken} valueType={SettingsKey.gametypes} value={this.props.gametypes} type={UI.SINGLELINE} text="Game Areas"></Switch>
                </div>
            </div>
        )
    }
}

const mapStoreToProps = state=>{
    const SettingsKey = Constant().SettingsKey()
    return{
    username: state.setting[SettingsKey.username],
    useremail: state.setting[SettingsKey.useremail],
    usertoken: state.setting[SettingsKey.usertoken],
    games: state.setting[SettingsKey.games],
    gametypes: state.setting[SettingsKey.gametypes],
    isVerified:state.setting[SettingsKey.isVerified]
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        saveInfo:(type,value,isVerify)=>dispatch(Save_info(type,value,true,isVerify)),
    }
}

export default connect(mapStoreToProps,mapDispatchToProps)(Settings);
