import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { authenticationReducer } from '@authentication/reducer';
import { notificationsReducer } from '@components/Notifications/reducer';
import { documentDetailsFrontReducer } from '@pages/frontsite/Documents/DocumentDetails/reducer';
import { loanRequestFormReducer } from '@pages/frontsite/Documents/DocumentDetails/LoanRequestForm/reducer';
import { seriesDetailsFrontReducer } from '@pages/frontsite/Series/SeriesDetails/reducer';
import {
  patronCurrentLoansReducer,
  patronDocumentRequestsReducer,
  patronPastLoansReducer,
  patronPendingLoansReducer,
  patronCurrentBorrowingRequestsReducer,
  patronPastBorrowingRequestsReducer,
} from '@modules/Patron';
import {
  patronCurrentDocumentRequestsReducer,
  patronPastDocumentRequestsReducer,
} from '@pages/frontsite/PatronProfile/reducer';
import { staticPageReducer } from '@pages/frontsite/StaticPage/reducer';

const rootReducer = combineReducers({
  authenticationManagement: authenticationReducer,
  notifications: notificationsReducer,
  /* frontsite */
  documentDetailsFront: documentDetailsFrontReducer,
  loanRequestForm: loanRequestFormReducer,
  seriesDetailsFront: seriesDetailsFrontReducer,
  patronCurrentLoans: patronCurrentLoansReducer,
  patronDocumentRequests: patronDocumentRequestsReducer,
  patronPastDocumentRequests: patronPastDocumentRequestsReducer,
  patronCurrentDocumentRequests: patronCurrentDocumentRequestsReducer,
  patronPastLoans: patronPastLoansReducer,
  patronPendingLoans: patronPendingLoansReducer,
  patronCurrentBorrowingRequests: patronCurrentBorrowingRequestsReducer,
  patronPastBorrowingRequests: patronPastBorrowingRequestsReducer,
  staticPage: staticPageReducer,
});

const composeEnhancers = composeWithDevTools({
  name: 'ILS Backoffice',
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
