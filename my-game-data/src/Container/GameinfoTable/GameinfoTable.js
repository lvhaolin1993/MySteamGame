import React from 'react'
import {Table} from 'react-bootstrap'
import {connect} from 'react-redux'
import {Constant} from '../../Global/Constant'
import ImageLink from '../../Component/Basic/ImageLink/ImageLink'
import {Game_info, game_del} from '../../Store/Actions/GameinfoAction'
import {ProgressBar} from 'react-bootstrap'
import Style from '../Gameinfo/Gameinfo.module.css'



class GameinfoTable extends React.Component{
 
    state={
        isLoading:false,
        noProgressBar:false,
    }
    
    componentDidMount(){
        if(this.props.isMount === true&& this.state.isLoading === false&& this.props.count === 0){
             const appIds = this.props.gameNames
             if(appIds.length>0){
                 this.setState({
                     isLoading:true,
                 })
                 this.props.gameinfo(appIds);                
             }
        }
     }

    componentDidUpdate(){
        if(this.props.isMount === true && this.state.isLoading === false && this.props.count === 0){
            const appIds = this.props.gameNames
            if(appIds.length>0){
                this.setState({
                    isLoading:true,
                })
                this.props.gameinfo(appIds);
            }
       }
    }  

    showExtraGameInfo = (id)=>{
        const popup = document.getElementById("popup")
        popup.innerHTML = "<div class='Wrapper'><iframe class='Frame' src='https://steamdb.info/embed/?appid="+id+ "'scrolling='no' frameborder='0'></iframe></div>"
        popup.classList.remove("hiddenPopup")
        popup.classList.add("showPopup")       
        const frame = popup.getElementsByTagName("iframe")[0]
        frame.onmouseout = ()=>this.hideExtraGameInfo(popup)
    }

    hideExtraGameInfo = (popup)=>{
        popup.classList.add("hiddenPopup")
        popup.classList.remove("showPopup")
        popup.innerHTML = ""
    }

    Unsubscribe = (e,id)=>{
        const Promises = Constant().Verify(this.props.token)
        Promises.then(res=>{
          if(res.data === "success")
          {
            this.props.gamedel(id);
            this.setState({
                isLoading:false,
                noProgressBar:true
            })
          }
          else
          {
            Constant().Popup();
          }
        }).catch(err=>{
          Constant().Popup();
        })
        e.stopPropagation();
    }

    render(){
        const style = {
            width:'80%',
            margin:'auto',
        }

        const tableBody = this.props.games.map((game)=>
        {
        return <tr className={Style.onhover}  key={game.id} onClick={()=>{this.showExtraGameInfo(game.id)}}>
            <td><i onClick={(e)=>this.Unsubscribe(e,game.id)} className="fas fa-ban"></i>{game.name}</td>
            <td>{game.online}</td>
            <td>{game.score}</td>
            <td>{game.price}</td>
            <td><ImageLink url={game.header_image} id={game.id} website={game.website}></ImageLink></td>
        </tr>})

        return(
        (this.props.count >= this.props.gameNames.length||this.state.noProgressBar)?
        <Table responsive style={style}>
            <thead >
                <tr>
                    <th>Games</th>
                    <th>Online</th>
                    <th>hot index</th>
                    <th>Price (CAD)</th>
                    <th>Learn more</th>
                </tr>
            </thead>
            <tbody>
                {tableBody}
            </tbody>
        </Table>
        :<ProgressBar className={Style.center} now={100*this.props.count/this.props.gameNames.length>=99?99:100*this.props.count/this.props.gameNames.length} label={"the game is loading now... "+100*this.props.count/this.props.gameNames.length>=99?99:100*this.props.count/this.props.gameNames.length+"%"} />)
    }
}

const mapStateToProps = state=>{
    const SettingsKey = Constant().SettingsKey()
    return{
      gameNames:state.setting[SettingsKey.games].split(','),
      games:state.gameinfo.gameinfo,
      count:state.gameinfo.gameinfoCount,
      isMount:state.setting[SettingsKey.isMount],
      token:state.setting[SettingsKey.usertoken]
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        gameinfo:(id)=>dispatch(Game_info(id)),
        gamedel:(id)=>dispatch(game_del(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GameinfoTable)
