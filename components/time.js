import moment from 'moment'
import { useEffect, useState } from 'react'

export default function Time ({ className }) {
  const [time, setTime] = useState(moment().format('HH:mm:ss'))
  const [date, setDate] = useState(moment().format('dddd – D MMMM YYYY'))


  useEffect(()=>{
    const interval = setInterval(() => {
      setTime(moment().format('HH:mm:ss'))
      setDate(moment().format('dddd – D MMMM YYYY'))
    }, 1000)
   return () =>  clearInterval(interval)
  },[])

  return (
    <div className={`time-block ${className}`}>

      <h1 className="display-huge leading-none">
        {time.split(':')[0]}
        <span className="text-primary blink">:</span>
        {time.split(':')[1]}
        <span className="text-primary blink">:</span>
        {time.split(':')[2]}
      </h1>
      <h3 className="lowercase">{date}</h3>

    </div>
  )
}
