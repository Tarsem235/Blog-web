import React from "react";

const testimonials = [
  {
    name: "Rahul Sharma",
    feedback: "The Fit Club changed my life! The trainers are so supportive and the programs are top-notch.",
    image: "https://i.ibb.co/j3YzDkP/person1.jpg",
    rating: 5,
  },
  {
    name: "Anjali Verma",
    feedback: "Amazing experience! The yoga classes helped me gain flexibility and peace of mind.",
    image: "https://i.ibb.co/5TjKpV0/person2.jpg",
    rating: 4,
  },
  {
    name: "Amit Singh",
    feedback: "Great atmosphere and excellent equipment. I highly recommend their HIIT workouts.",
    image: "https://i.ibb.co/n1YjN0H/person3.jpg",
    rating: 5,
  },
  {
    name: "Pooja Mehra",
    feedback: "I joined the premium plan and the personal trainer guidance is excellent!",
    image: "https://i.ibb.co/2M1h8DL/person4.jpg",
    rating: 4,
  },
];

const StarRating = ({ rating }) => (
  <div className="flex text-yellow-400 mb-2">
    {Array.from({ length: 5 }).map((_, index) => (
      <span key={index}>{index < rating ? "★" : "☆"}</span>
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-orange-500 min-h-screen text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">THE FIT CLUB</h1>
        <nav className="space-x-4 hidden sm:block">
          <a href="/" className="hover:underline">Home</a>
          <a href="/programs" className="hover:underline">Programs</a>
          <a href="/why-us" className="hover:underline">Why Us</a>
          <a href="/plans" className="hover:underline">Plans</a>
          <a href="#" className="hover:underline">Testimonials</a>
          <button className="bg-white text-black px-3 py-1 rounded ml-4">Join Now</button>
        </nav>
      </header>

      {/* Title */}
      <section className="text-center py-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">What Our Members Say</h2>
        <p className="text-sm sm:text-base max-w-xl mx-auto">
          Hear from our amazing community and see why they love The Fit Club.
        </p>
      </section>

      {/* Testimonials Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-10 pb-10">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-orange-400"
            />
            <h3 className="text-xl font-bold mb-1">{t.name}</h3>
            <StarRating rating={t.rating} />
            <p className="text-sm italic">"{t.feedback}"</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Testimonials;
