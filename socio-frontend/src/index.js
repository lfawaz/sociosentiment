import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import CandidateTrendList from './components/candidate_trend_list'
//import CandidateWordList from './components/candidate_word_list'
import Senate from './containers/senate'
import House from './containers/house'
import Governor from './containers/governor'
import President from './containers/president'
import RefreshData from './containers/refresh_data'
import AddCandidate from './containers/add_candidate'
import CandidateDetail from './containers/candidate_detail'

import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import rootReducer from './reducers'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './containers/home'
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)


//const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
  <BrowserRouter>
        <Switch>

          <Route path='/Senate' component={Senate} />
          <Route path='/House' component={House} />
          <Route path='/Governor' component={Governor} />
          <Route path='/President' component={President} />
          <Route path='/Refresh' component={RefreshData} />
          <Route path='/Add' component={AddCandidate} />
          <Route path='/candidate/:screen_name' component={CandidateDetail}/>

          <Route path='/'      component={()=> <Home />}  />
        </Switch>
  </BrowserRouter>
  </Provider>

  , document.getElementById('root'));
registerServiceWorker();
