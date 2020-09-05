import React from 'react'

export default function Stat ({ server }) {

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

  return <div
    className="stat bg-gray-300 shadow-md py-6 px-6 inline-flex flex-no-wrap items-center">
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
    <style jsx>{`
        .stat .stat-circle{
          min-width: 100px;
          height: 100px;
        }
      `}</style>
  </div>
}
