import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Organizations from '../components/Organizations';
import * as Actions from '../actions';

function mapStateToProps (state) {
  return {
    userInfo: state.userInfo,
    allUsersInfo: state.allUsersInfo
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
