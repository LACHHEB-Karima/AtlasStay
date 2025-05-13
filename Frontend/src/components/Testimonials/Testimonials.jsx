const testimonials = [
  {
    name: "Leila B.",
    title: "Student – Casablanca",
    comment:
      "The Atlas trip was unforgettable! The team was super organized, and the camel ride during sunset was pure magic.",
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Youssef M.",
    title: "Traveler – Rabat",
    comment:
      "I loved the Ourika Valley hike. The views were breathtaking and the cultural experience was enriching. Highly recommend!",
    image:
      "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    name: "Sarah A.",
    title: "Backpacker – Agadir",
    comment:
      "Rock climbing in Todgha Gorge was the highlight of my trip. Safe, challenging, and so rewarding. Thank you for the experience!",
    image:
      "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-teal-50 py-16 px-4 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-teal-700">What Our Travelers Say</h2>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto">
          Real stories from adventurers who experienced the Atlas Mountains with us.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            <img
              src={t.image}
              alt={t.name}
              className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-teal-500"
            />
            <p className="text-gray-700 italic mb-3">“{t.comment}”</p>
            <div>
              <p className="text-teal-700 font-semibold">{t.name}</p>
              <p className="text-sm text-gray-500">{t.title}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Decorative divider */}
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

export default Testimonials;
