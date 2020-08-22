export default function NowPlayingBackground ({np}) {
  return (
    <div className="nowplaying-background">
      <img src={np.cover} alt="Current playing album cover"/>
    </div>
  )
}
