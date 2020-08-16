import NowPlaying from '../../components/np'
import Time from '../../components/time'
import ContentWrapper from '../../components/content_wrapper'
import NowPlayingBackground from '../../components/np_background'

const TV = ({ data }) => {
  return (
    <>
      <div id="tv" className="wrapper px-24 grid grid-rows-4 h-screen">
        <header className="row-span-1 h-full w-full flex items-center">
          <div className="">
            <NowPlaying/>
          </div>
        </header>

        <main className="row-span-2">
          <ContentWrapper/>
        </main>
        <footer className="grid row-span-1 overflow-hidden h-full w-full flex items-center">
          <div className="grid grid-cols-6">
            <Time className="col-span-4"/>
            <img src="logo.svg" alt="logo"
                 className="col-span-2 ml-auto mt-auto mb-3"/>
          </div>
        </footer>
        <NowPlayingBackground/>
      </div>
    </>
  )
}


// export async function getStaticProps () {
// }

export default TV;
