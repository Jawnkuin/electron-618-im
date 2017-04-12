import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StemProfile from '../components/StemProfile';
import * as Actions from '../actions';

function mapStateToProps (state) {
  return {
    userInfo: state.userInfo
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StemProfile);
