import Stats from './slides/stats'
import Slide from './slides/slide'

export default function ContentWrapper(){
  return (
    <>
    <div className="content-wrapper h-full">
      <Slide title={"monitor"}>
        <Stats/>
      </Slide>
      {/*<Slide title={"monitor"}></Slide>*/}
    </div>
    </>
  )
}
