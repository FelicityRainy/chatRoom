import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RoomSetting from '../components/RoomSetting.jsx'
import { joinRoom, changeRoom, setSnackbarState, hiddenInfoCard, addActiveItem, setMenuState, setListShow, getRoomActiveInfo, updateRoomInfo } from '../actions'
function mapStateToProps(state) {
    let roomName = state.getIn(['roomCard','name']),
        username = state.getIn(['userState','username']),
        token = state.getIn(['userState','token']);
    let isCreater = state.getIn(['roomCard','creater']) === username;
    let isJoined = state.getIn(['roomList',roomName]);
    return {
        roomInfo: state.get('roomCard'),
        token,
        username,
        isJoined,
        isCreater
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ joinRoom, changeRoom, hiddenInfoCard, addActiveItem, setMenuState, setListShow, setSnackbarState, getRoomActiveInfo, updateRoomInfo },dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(RoomSetting);