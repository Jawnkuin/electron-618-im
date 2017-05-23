import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InputPanel from '../components/InputPanel';
import * as CounterActions from '../actions';

function mapStateToProps (state) {
  return {
    loginstate: state.login
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InputPanel);
