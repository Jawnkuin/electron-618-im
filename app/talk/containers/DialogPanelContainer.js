import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DialogPanel from '../components/DialogPanel';
import * as CounterActions from '../actions';

function mapStateToProps (state) {
  return {
    dlgInfo: state.dlgInfo,
    buddyInfo: state.buddyInfo
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogPanel);
