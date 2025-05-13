import React from 'react';

const Activities = () => {
  const activities = [
    {
      title: "Trek the High Atlas Trails",
      description:
        "Explore scenic routes through Berber villages and breathtaking mountain valleys. Our guided trekking tours offer both challenge and serenity in the heart of nature.",
      image:
        "https://res.cloudinary.com/demk1ru75/image/upload/v1/rooms/aw2rxzworuuyz5wa5uww?_a=DAGAACAVZAA0", // Replace with a relevant image
      buttonText: "Explore",
    },
    {
      title: "Sunset Camel Rides",
      description:
        "Experience the magic of the Atlas foothills with a camel ride during golden hour. This peaceful journey offers unforgettable views and cultural immersion.",
      image:
        "https://res.cloudinary.com/demk1ru75/image/upload/v1/rooms/mszlnvtnhr3es30emswt?_a=DAGAACAVZAA0", // Replace with another relevant image
      buttonText: "Explore",
    },
    {
      title: "Rock Climbing in Todgha Gorge",
      description:
        "Embark on an exhilarating rock climbing adventure in Todgha Gorge, a stunning limestone canyon located in the eastern High Atlas Mountains near Tinerhir. With its towering 160-meter-high cliffs and over 150 bolted routes ranging from French Grade 5+ to 8, Todgha Gorge is a premier destination for climbers of all levels. The gorge's dramatic scenery and challenging ascents offer an unforgettable experience for adventure seekers.",
      image:
        "https://res.cloudinary.com/demk1ru75/image/upload/v1/rooms/oxerp69uh9cpxwiwicjm?_a=DAGAACAVZAA0", // Replace with another relevant image
      buttonText: "Explore",
    },
    {
      title: "Explore the Ourika Valley's Natural Beauty",
      description:
        "Discover the serene landscapes of the Ourika Valley, nestled in the foothills of the High Atlas Mountains just 20 miles from Marrakech. This picturesque valley is renowned for its lush greenery, cascading waterfalls, and traditional Amazigh villages. Visitors can enjoy guided hikes through untouched wilderness, explore local markets, and experience the rich biodiversity of the region, including unique flora and fauna.",
      image:
        "https://res.cloudinary.com/demk1ru75/image/upload/v1/rooms/rkz2eprs3d45cey6fqop?_a=DAGAACAVZAA0", // Replace with another relevant image
      buttonText: "Explore",
    },
  ];

  // Custom Moroccan pattern SVG
  const moroccanPattern = (
    <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 80 80">
      <pattern id="moroccanTile" patternUnits="userSpaceOnUse" width="80" height="80">
        <path d="M0,0 L80,0 L80,80 L0,80 Z" fill="none" stroke="#0D9488" strokeWidth="1" />
        <path d="M40,0 L80,40 L40,80 L0,40 Z" fill="none" stroke="#0D9488" strokeWidth="1" />
        <circle cx="40" cy="40" r="20" fill="none" stroke="#0D9488" strokeWidth="1" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#moroccanTile)" />
    </svg>
  );

  return (
    <section className="relative py-16 px-4 lg:px-24 ">
      {/* Moroccan geometric pattern background */}
      {moroccanPattern}

      {/* Section heading with Moroccan-inspired styling */}
      <div className="text-center mb-16 relative">
        <div className="absolute inset-x-0 top-1/2 h-0.5 bg-teal-700 opacity-20" />
        <h2 className="inline-block relative px-6 text-3xl font-bold text-teal-800">
          Atlas Mountain Experiences
        </h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto font-light">
          Discover unforgettable adventures infused with authentic Amazigh culture in the majestic mountains of Morocco.
        </p>
      </div>

      {/* Activities listing */}
      <div className="space-y-24">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              } gap-8`}
          >
            {/* Image with Moroccan frame effect */}
            <div className="lg:w-1/2 relative p-2">
              <div className="absolute inset-0 border-4 border-teal-600 opacity-10 rounded-lg transform rotate-2"></div>
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-auto rounded-lg shadow-lg relative z-10"
              />
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-teal-600 opacity-20 rounded-tl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-teal-600 opacity-20 rounded-tr"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-teal-600 opacity-20 rounded-bl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-teal-600 opacity-20 rounded-br"></div>
            </div>

            {/* Content box with styling */}
            <div className="lg:w-1/2 relative">
              <div className="border-l-4 border-teal-600 pl-6">
                <h2 className="text-2xl font-bold text-teal-700 mb-4">
                  {activity.title}
                </h2>
                <p className="text-gray-700 mb-6">{activity.description}</p>
                <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition flex items-center group">
                  {activity.buttonText}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              {/* Decorative ornamental element */}
              <div className="absolute -right-4 top-0 opacity-10">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <path d="M30 0L60 30L30 60L0 30L30 0Z" fill="#0D9488" />
                  <circle cx="30" cy="30" r="15" stroke="#0D9488" strokeWidth="2" fill="none" />
                  <circle cx="30" cy="30" r="7" fill="#0D9488" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative  footer divider */}
      <div className="mt-16 flex justify-center">
        <div className="flex space-x-2 items-center">
          <div className="w-16 h-0.5 bg-teal-600 opacity-30"></div>
          <div className="w-3 h-3 rotate-45 bg-teal-600 opacity-30"></div>
          <div className="w-16 h-0.5 bg-teal-600 opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
