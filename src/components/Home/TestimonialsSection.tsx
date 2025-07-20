import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import Button from '../Button';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
  emoji: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "I would've missed the Roosevelt Island Tram if it weren't for this app! The views are absolutely insane! 🚠",
    author: "Sarah M.",
    location: "Chicago, IL",
    rating: 5,
    emoji: "🚠"
  },
  {
    id: '2',
    quote: "Found this amazing rooftop bar in Brooklyn that none of my local friends even knew about. Total game changer! 🍹",
    author: "Mike T.",
    location: "Austin, TX",
    rating: 5,
    emoji: "🍹"
  },
  {
    id: '3',
    quote: "The High Line at sunset was pure magic! This app helped me discover the perfect timing. Thank you! ✨",
    author: "Emma L.",
    location: "Seattle, WA",
    rating: 5,
    emoji: "✨"
  },
  {
    id: '4',
    quote: "Finally got that perfect NYC skyline shot at DUMBO! My Instagram followers are obsessed now 📸",
    author: "Alex K.",
    location: "Los Angeles, CA",
    rating: 5,
    emoji: "📸"
  },
  {
    id: '5',
    quote: "Green-Wood Cemetery was so peaceful and beautiful. Never would've thought to visit a cemetery, but wow! 🌳",
    author: "David R.",
    location: "Portland, OR",
    rating: 5,
    emoji: "🌳"
  },
  {
    id: '6',
    quote: "Katz's Deli was everything I hoped for and more. The pastrami sandwich is life-changing! 🥪",
    author: "Lisa P.",
    location: "Miami, FL",
    rating: 5,
    emoji: "🥪"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            What Travelers Are Saying
          </h2>
          <p className="text-base text-gray-600">
            Real experiences from people who discovered amazing NYC spots
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <div className="flex items-center justify-between mb-3">
                <FaQuoteLeft className="text-lg text-yellow-500" />
                <span className="text-2xl">{testimonial.emoji}</span>
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-3 italic text-sm leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Rating */}
              <div className="flex items-center mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xs" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.author}</p>
                  <p className="text-xs text-gray-600">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-3 text-sm">
            Ready to discover your own NYC adventure?
          </p>
          <Button 
            variant="primary" 
            size="md"
            icon={FaStar}
            iconPosition="right"
          >
            Start Planning Your Trip 🗽
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 