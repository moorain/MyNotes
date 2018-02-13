import React from 'react';
import { addGUN } from './index.redux'
class App extends React.Component{
    // constructor(props){
    //     super(super)
    // }
    render(){
        const store = this.props.store;
        const num = store.getState();
        return(
            <div>
                <button onClick={()=>store.dispatch(addGUN())}>加武器</button>
                <h1>现在有机枪{num}把</h1>
            </div>
        )
    }
}

export default App;