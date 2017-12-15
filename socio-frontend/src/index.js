import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CandidateTrendList from './components/candidate_trend_list'
import CandidateWordList from './components/candidate_word_list'

import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import rootReducer from './reducers'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './containers/home'
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

const handleList = [['realdonaldtrump','red'],['BernieSanders','blue'],['JoeBiden','blue'],['KamalaHarris','blue'],['SenBooker','blue'],['SenGillibrand','blue'],['SenWarren','blue'],['JohnKasich','red']]
//const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
  <BrowserRouter>
        <Switch>
          <Route path='/cloud' component={()=> <CandidateWordList handleList={handleList}/>}  />
          <Route path='/trend' component={()=> <CandidateTrendList handleList={handleList}/>} />
          <Route path='/'      component={Home}  />
        </Switch>
  </BrowserRouter>
  </Provider>

  , document.getElementById('root'));
registerServiceWorker();
