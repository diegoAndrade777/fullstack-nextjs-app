import Feed from "@components/Feed"
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
  return (
    <>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discovery & Share
          <br className="max-md:hidden" />
          <span className="orange_gradient">AI-Powered Prompts</span>
        </h1>

        <p className="desc text-center">
          This app is an open-souce AI prompting tool form modern worldto discover,
          create and share creative prompts
        </p>

        <Feed />
      </section>
    </>
  )
}

export default Home