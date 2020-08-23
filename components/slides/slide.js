import React from 'react'

export default function Slide ({ title, children }) {
  return <div className="slide">
    {children}
    <h1 className="huge display-huge">{title}</h1>
    <style jsx>{`
        .slide{
          position:relative;
          width: 100%;
          height: 100%;
        }
        h1.huge{
          mix-blend-mode: difference;
          opacity: .15;
          position: absolute;
          bottom: 0;
          left: -50px;
          line-height: 100%;
          font-size: 310px;
        }
      `}</style>
  </div>

}
