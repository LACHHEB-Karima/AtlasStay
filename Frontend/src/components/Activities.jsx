import React from 'react';

const Activities = () => {
  const activities = [
    {
      title: "Trek the High Atlas Trails",
      description:
        "Explore scenic routes through Berber villages and breathtaking mountain valleys. Our guided trekking tours offer both challenge and serenity in the heart of nature.",
      image:
        "https://images.unsplash.com/photo-1549880181-56a44cf4a9a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60", // Replace with a relevant image
      buttonText: "Explore",
    },
    {
      title: "Sunset Camel Rides",
      description:
        "Experience the magic of the Atlas foothills with a camel ride during golden hour. This peaceful journey offers unforgettable views and cultural immersion.",
      image:
        "https://images.unsplash.com/photo-1564518098550-4d00aaf6a098?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60", // Replace with another relevant image
      buttonText: "Explore",
    },
    {
        title: "Rock Climbing in Todgha Gorge",
        description:
          "Embark on an exhilarating rock climbing adventure in Todgha Gorge, a stunning limestone canyon located in the eastern High Atlas Mountains near Tinerhir. With its towering 160-meter-high cliffs and over 150 bolted routes ranging from French Grade 5+ to 8, Todgha Gorge is a premier destination for climbers of all levels. The gorge's dramatic scenery and challenging ascents offer an unforgettable experience for adventure seekers.",
        image:
          "https://images.unsplash.com/photo-1564518098550-4d00aaf6a098?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60", // Replace with another relevant image
        buttonText: "Explore",
      },
      {
        title: "Explore the Ourika Valley's Natural Beauty",
        description:
          "Discover the serene landscapes of the Ourika Valley, nestled in the foothills of the High Atlas Mountains just 20 miles from Marrakech. This picturesque valley is renowned for its lush greenery, cascading waterfalls, and traditional Amazigh villages. Visitors can enjoy guided hikes through untouched wilderness, explore local markets, and experience the rich biodiversity of the region, including unique flora and fauna.",
        image:
          "https://images.unsplash.com/photo-1564518098550-4d00aaf6a098?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60", // Replace with another relevant image
        buttonText: "Explore",
      },
  ];

  return (
    <section className="bg-white py-12 px-4 lg:px-24">

        {/* Section heading */}
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-700">Live the best experiences in the Atlas Mountains</h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Discover unforgettable experiences from scenic treks to camel rides and cultural immersion — all in the heart of Morocco’s Atlas region.
            </p>
        </div>
       {/* Activities listing */}
      <div className="space-y-16">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center ${
              index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
            } gap-8`}
          >
            <div className="lg:w-1/2">
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-teal-800 mb-4">
                {activity.title}
              </h2>
              <p className="text-gray-700 mb-6">{activity.description}</p>
              <button className="bg-teal-500 text-white px-5 py-2 rounded hover:bg-teal-600 transition">
                {activity.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Activities;
