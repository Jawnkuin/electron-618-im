import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormHeader from '../components/FormHeader';
import * as CounterActions from '../actions';

function mapStateToProps (state) {
  return {
    buddyInfo: state.buddyInfo
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormHeader);
