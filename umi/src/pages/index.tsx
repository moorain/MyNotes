export default () => {
  return (
    <div>111</div>
  )
}

// import { useEffect, useState } from 'react'
// import { record } from 'rrweb'
// import rrwebPlayer from 'rrweb-player';
// import 'rrweb-player/dist/style.css';

// function App() {
//   const [start, setStart] = useState(false)
//   const [events, setEvents] = useState([])

//   useEffect(() => { 
//     if (start) {
//       record({
//         emit(event) {
//           setEvents(e => {
//             e.push(event)
//             return e
//           })
//         }
//       });
//     }
//   }, [start])

//   const replay = () => {
//     const target = document.querySelector('#replayBox') as HTMLElement;
//     if (target && events?.length > 0) {
//       target.innerHTML = '';
//       const replay = new rrwebPlayer({
//         target,
//         // 配置项
//         props: {
//           width: '100%',
//           events,
//         },
//       });
//       replay.play();
//     }
//   }

//   return (
//     <div className="App">

//       <div className="card">
//         <button onClick={() => setStart(state => !state)}>
//           点击{!start ? '开始' : '停止'}录制
//         </button>
//         <button onClick={replay}>
//           点击开始回放
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>

//       <div id='replayBox' >

//       </div>
//     </div>
//   )
// }

// export default App