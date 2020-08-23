import React from 'react'

export default function Stat ({ stats }) {
  return <div
    className="stat bg-gray-300 shadow-md py-4 px-6 inline-flex flex-wrap items-center">
    <div
      className="stat-circle bg-orange-500 rounded-full text-white flex items-center justify-center">
      <h5>50%</h5>
    </div>
    <div className="stat-details ml-6 leading-tight">
      <h4>
        cpu @<br/>
        web1.drimpy.com
      </h4>
    </div>
    <style jsx>{`
        .stat .stat-circle{
          width: 100px;
          height: 100px;
        }
      `}</style>
  </div>
}
