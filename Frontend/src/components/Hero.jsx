import React from 'react';

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Escape to Nature,<br className="hidden sm:block" />
            Discover the Atlas
          </h1>
          <p className="text-gray-500 mb-6">
            We provide authentic Moroccan experiences in the heart of the Atlas mountains. Reconnect with nature and create unforgettable memories.
          </p>
          {/* <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
            Show More
          </button> */}
          <div className="w-full md:w-1/2">
          <div className="grid grid-cols-3 gap-4 mt-8 md:mt-12">
            <div className="flex flex-col items-center">
              <div className="text-teal-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <div className="font-bold text-xl">2500</div>
              <div className="text-gray-500 text-sm">Guests</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-teal-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="font-bold text-xl">200</div>
              <div className="text-gray-500 text-sm">Experiences</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-teal-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="font-bold text-xl">30</div>
              <div className="text-gray-500 text-sm">Locations</div>
            </div>
          </div>
          </div>
        </div>
        {/*https://res.cloudinary.com/demk1ru75/image/upload/v1/rooms/aeclfwcachqik0an2xx4?_a=DAGAACAVZAA0
        */}
        <div className="w-full md:w-1/2">
          <div className="rounded-2xl overflow-hidden  p-2 bg-white">
            <img 
              src="https://res.cloudinary.com/demk1ru75/image/upload/v1/rooms/putnqhlodx1i1b3bg6ys?_a=DAGAACAVZAA0" 
              alt="Scenic view of Atlas mountains" 
              className="w-full h-64 md:h-80 rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;