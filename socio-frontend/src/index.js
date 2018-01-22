import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CandidateTrendList from './components/candidate_trend_list'
import CandidateWordList from './components/candidate_word_list'
import Senate from './components/senate'
import House from './components/house'
import Governor from './components/governor'
import President from './components/president'

import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import rootReducer from './reducers'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './containers/home'
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

const handleList = [['realdonaldtrump'],['BernieSanders'],['JoeBiden'],['KamalaHarris'],['SenBooker'],['SenGillibrand'],['SenWarren'],['JohnKasich']]
//const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
  <BrowserRouter>
        <Switch>
          <Route path='/cloud' component={()=> <CandidateWordList handleList={handleList}/>}  />
          <Route path='/trend' component={()=> <CandidateTrendList handleList={handleList}/>} />
          <Route path='/senate' component={Senate} />
          <Route path='/house' component={House} />
          <Route path='/Governor' component={Governor} />
          <Route path='/President' component={President} />
          <Route path='/'      component={()=> <Home handleList={handleList}/>}  />
        </Switch>
  </BrowserRouter>
  </Provider>

  , document.getElementById('root'));
registerServiceWorker();
