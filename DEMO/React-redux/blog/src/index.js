// import { createStore } from 'redux';

// // 更具老的state 和action 生成新的state
// function counter(state=0,action) {
//     switch(action.type){
//         case '加':
//         return state+1
//         case '减':
//         return state -1
//         default:
//         return 10
//     }
// }
// // 1 新建store
// const store = createStore(counter)
// // const init = store.getState()
// console.log(store.getState())
// // 2 派发事件 传递action 
// store.dispatch({type:'加'})
// console.log(store.getState())

// // 订阅一个事件，
// function Listener() {
//     const current = store.getState()
//     console.log(`现在有机关枪${current}把`)
// }
// store.subscribe(Listener)

// // 下面的dispath 会触发 subscribe 
// store.dispatch({type:'加'})
// store.dispatch({type:'加'})
// store.dispatch({type:'加'})


import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import App from './App';
import {counter} from './index.redux'


const store = createStore(counter);

function render() {
    ReactDom.render(<App store={ store } />,document.getElementById('root'))
}
render();
// 状态改变执行render
store.subscribe(render);