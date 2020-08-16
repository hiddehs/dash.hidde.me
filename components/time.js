import moment from 'moment'

export default function Time ({className}) {

  const time = moment().format("HH:mm:ss")
  const date = moment().format("dddd – D MMMM YYYY")


  return (
    <div className={`time-block ${className}`}>

      <h1 className="display-huge leading-none">
        {time.split(":")[0]}
        <span className="text-primary">:</span>
        {time.split(":")[1]}
        <span className="text-primary">:</span>
        {time.split(":")[2]}
      </h1>
      <h3 className="lowercase">{date}</h3>

    </div>
  )
}
