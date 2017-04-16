import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProfilePanel from '../components/ProfilePanel';
import * as CounterActions from '../actions';

function mapStateToProps (state) {
  return {
    buddyInfo: state.buddyInfo
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePanel);
