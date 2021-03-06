import * as Actions from '../Actions/ActionTypes'
import {Constant} from '../../Global/Constant'

const initial = {}
const SettingsKey = Constant().SettingsKey();
initial[SettingsKey.username] = ""
initial[SettingsKey.useremail] = ""
initial[SettingsKey.usertoken] = ""
initial[SettingsKey.games] = ""
initial[SettingsKey.gametypes] = []
initial[SettingsKey.isMount] = false




const settingReducer = (state = initial, action)=>{
    switch(action.type){
        case (Actions.SAVE_INFO):{
            let info = {
                ...state
            }
            info[action.input_type] = action.input_value
            return info
        }
        case (Actions.LOAD_INFO):{
            if(action.load_success){
                let info = {
                    ...state
                }
                info[SettingsKey.username] = action.value[SettingsKey.username]
                info[SettingsKey.useremail] = action.value[SettingsKey.useremail]
                info[SettingsKey.games] = action.value[SettingsKey.games]
                info[SettingsKey.gametypes] = action.value[SettingsKey.gametypes] 
                info[SettingsKey.isMount] = true
                return info
            }
            else{
                let info = {
                    ...state
                } 
                info[SettingsKey.username] = "unknown"
                info[SettingsKey.useremail] = "unknown"
                info[SettingsKey.games] = ""
                info[SettingsKey.gametypes] = ["speed"]
                info[SettingsKey.isMount] = false
                return info
            }
           
        }
        default:{
            return state
        }
    }
}

export default settingReducer