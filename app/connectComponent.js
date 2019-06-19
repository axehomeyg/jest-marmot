import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions'

// We just map everything to everything. Use inline mapping for components that need special behavior
const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)})

const connectComponent = Component => connect(mapStateToProps, mapDispatchToProps)(Component)

export default connectComponent
