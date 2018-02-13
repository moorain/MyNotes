import React, { Component } from 'react';
import {Button} from 'antd-mobile';
// import 'antd-mobile/dist/antd-mobile.css';
// import logo from './logo.svg';
// import './App.css';
// import {createStore} from 'redux';
class App extends Component {
  render() {
    const boss = '李云龙'
    return (
      <div className="App">
          <h2>独立团团长{boss}</h2>
          <List/>
          <OneList iboss="你大爷" />
      </div>
    );
  }
}
// 函数式组件
function List(params) {
  return <h1>你说</h1>
}

class OneList extends React.Component{
  constructor(props){
    super(props)
    // 初始化state
    this.state={
    soliders:['a','b','c']
    }
  }

  AddSolider = (props) => {
    console.log("111")
    this.setState({
      soliders:[...this.state.soliders,'新兵蛋子'+ Math.random()]
    })
  }

  render(){
    return (
      <div>
        <h2>一营营长{this.props.iboss}</h2>
        <Button type="primary" onClick={this.AddSolider}>新兵入伍</Button>
        <ul>
          {this.state.soliders.map(v=>{
            return <li key={v}>{v}</li>
          })}
        </ul>
      </div>
    )
  }
}
export default App;
