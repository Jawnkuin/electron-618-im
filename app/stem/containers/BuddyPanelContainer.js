import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BuddyPanel from '../components/BuddyPanel';
import * as Actions from '../actions';

function mapStateToProps (state) {
  return {
    historySessions: state.historySessions,
    allUsersInfo: state.allUsersInfo
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BuddyPanel);
