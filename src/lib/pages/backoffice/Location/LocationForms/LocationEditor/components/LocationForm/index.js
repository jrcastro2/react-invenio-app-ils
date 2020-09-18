import { connect } from 'react-redux';
import { sendSuccessNotification } from '@components/Notifications/actions';
import { LocationForm as LocationFormComponent } from './LocationForm';
import { createLocation, updateLocation } from './../../state/actions';

const mapStateToProps = state => ({
  data: state.location.data,
  error: state.location.error,
  isLoading: state.location.isLoading,
  hasError: state.location.hasError,
});

const mapDispatchToProps = dispatch => ({
  sendSuccessNotification: (title, content) =>
    dispatch(sendSuccessNotification(title, content)),
  createLocation: data => dispatch(createLocation(data)),
  updateLocation: (pid, data) => dispatch(updateLocation(pid, data)),
});

export const LocationForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationFormComponent);
