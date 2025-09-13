import { Link } from "react-router-dom";

/** Home: Displays HomePage
 *
 *
 * RoutesList -> Home
 */
const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className='flex justify-center'>
        <div className='container relative'>
          <img src="https://media.gq.com/photos/581b5976fa4b32021e5551f4/16:9/w_1280,c_limit/pickup-bball.png"
            alt="ficus green insight"
            className='w-full' />
          <span className='absolute text-white bottom-0w-full top-6 right-4 text-center mt-1 mr-2 text-md font-sans font-bold md:mt-10 md:top-10 md:right-10 md:text-xl lg:right-16 lg:text-2xl'>Who Got Next??</span>
        </div>
      </div>

      {/* Hero section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Welcome to Who Got Next!
            </h1>
            <p className="mt-4 mb-6 text-lg text-gray-600">
              A place where you can track player rotations for your pick up games.
            </p>
            <Link to="/guest/basketball" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded inline-block">
              Try It!
            </Link>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Home;