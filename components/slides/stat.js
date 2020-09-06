import React, { useState } from 'react'

export default function Stat ({ server }) {

  const [mode, setMode] = useState(1);

  const getColor = (cpu) => {
    if (cpu < 10) {
      return 'green-600'
    } else if (cpu < 30) {
      return 'blue-500'
    } else if (cpu < 50) {
      return 'orange-500'
    }
    return 'red-500'
  }
  // setTimeout(()=>{
  //   console.log(mode)
  //   setMode(mode + 1);
  //   if(mode === 2){
  //     setMode(1);
  //   }
  // }, 2000)
  return <div
    className="stat bg-gray-300 shadow-md py-6 px-6 inline-flex flex-no-wrap items-center">
    {(mode === 1) ?
      <>
      <div
      className={`stat-circle bg-${getColor(
      server.stats.cpu)} rounded-full text-white flex items-center justify-center`}>
        <h5>{Math.round(server.stats.cpu * 100) / 100}%</h5>
      </div>
      <div className="stat-details ml-6 leading-tight">
      <h4>
      cpu @<br/>
      <span className="break-all"> {server.name}</span>
      </h4>
      </div>
      </> :
      <>
      <div
      className={`stat-circle bg-${getColor(
      server.stats.network / 1000)} rounded-full text-white flex items-center justify-center`}>
      <h5>{Math.round(server.stats.network / 100) / 10 } kBs</h5>
      </div>
      <div className="stat-details ml-6 leading-tight">
      <h4>
      transmit @<br/>
      <span className="break-all"> {server.name}</span>
      </h4>
      </div>
      </>
    }
    <style jsx>{`
        .stat .stat-circle{
          min-width: 100px;
          height: 100px;
        }
      `}</style>
  </div>
}
