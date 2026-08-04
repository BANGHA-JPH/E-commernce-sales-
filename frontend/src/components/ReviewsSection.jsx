import React from 'react';
import { Star, ShieldCheck, CheckCircle, ThumbsUp, Quote } from 'lucide-react';

const CUSTOMER_REVIEWS = [
  {
    id: 1,
    author: 'Marcus Vance',
    role: 'Master Engine Builder',
    location: 'Austin, TX',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '3 days ago',
    vehicle: '1967 VW Beetle 1500cc',
    partPurchased: 'NOS Holley 4150 & Mahle Piston Set',
    title: 'Flawless casting tolerances and verified OEM codes',
    review: 'Rebuilding a 67 Beetle engine requires exact tolerances. Every single part received from Rusty Aircooled matched original factory casting blueprints down to the millimeter. Couldn’t ask for better quality.'
  },
  {
    id: 2,
    author: 'Elena Rostova',
    role: 'Classic VW Collector',
    location: 'Portland, OR',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '1 week ago',
    vehicle: '1971 T2 Split-Window Bus',
    partPurchased: 'Dual Weber 40 IDF Carburetor Kit',
    title: 'The Blueprint Inspector saved me hours of guesswork',
    review: 'Using their interactive blueprint inspector made identifying the exact fuel delivery linkage effortless. Shipped securely in insulated wooden crates and arrived in under 48 hours.'
  },
  {
    id: 3,
    author: 'Dave "Sledge" Miller',
    role: 'Restoration Shop Owner',
    location: 'Denver, CO',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '2 weeks ago',
    vehicle: '1964 Karmann Ghia Coupe',
    partPurchased: 'Chrome Side Mirrors & Braking Cylinders',
    title: 'Top tier customer support and fast shipping',
    review: 'Our shop restores 15+ vintage VWs a year. Rusty Aircooled is our primary supplier. High-contrast authentic parts, zero knockoffs, and their customer care team actually knows air-cooled mechanics inside out.'
  }
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="max-w-[1440px] mx-auto px-4 md:px-8 mb-32 pt-8">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff7a1a]/10 border border-[#ff7a1a]/30 text-[#ff7a1a] font-technical-data text-xs uppercase tracking-widest rounded-sm mb-4">
          <ShieldCheck className="w-4 h-4" /> VERIFIED BUYER FEEDBACK
        </div>
        <h2 className="font-h2 text-2xl md:text-4xl text-[#e5e2e3] font-bold mb-4">
          Trusted by Restorers & Mechanics Worldwide
        </h2>
        <p className="font-body-md text-sm md:text-base text-[#e0c0b1] max-w-xl mx-auto">
          Over 1,200+ five-star reviews from verified classic car builders and garage technicians.
        </p>
      </div>

      {/* Aggregate Trust Banner */}
      <div className="glass-panel p-6 rounded-sm mb-12 flex flex-col md:flex-row justify-around items-center gap-6 border-b border-[#584236]/30 text-center md:text-left">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold font-h1 text-[#ff7a1a]">4.9</div>
          <div>
            <div className="flex text-[#ff7a1a] gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="font-technical-data text-xs text-[#e0c0b1]">Based on 1,240+ Verified Reviews</div>
          </div>
        </div>

        <div className="h-8 w-px bg-[#584236]/40 hidden md:block" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#83cffb]/10 border border-[#83cffb]/30 rounded-sm flex items-center justify-center text-[#83cffb]">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="font-h3 text-sm text-[#e5e2e3] font-bold">100% Guaranteed Fitment</div>
            <div className="font-technical-data text-xs text-[#a78b7d]">Blueprint Casting Code Verified</div>
          </div>
        </div>

        <div className="h-8 w-px bg-[#584236]/40 hidden md:block" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#ff7a1a]/10 border border-[#ff7a1a]/30 rounded-sm flex items-center justify-center text-[#ff7a1a]">
            <ThumbsUp className="w-5 h-5" />
          </div>
          <div>
            <div className="font-h3 text-sm text-[#e5e2e3] font-bold">99.4% Restorer Satisfaction</div>
            <div className="font-technical-data text-xs text-[#a78b7d]">Insured Global Dispatch</div>
          </div>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CUSTOMER_REVIEWS.map((review) => (
          <div key={review.id} className="glass-panel p-6 flex flex-col justify-between rounded-sm relative group hover:border-[#ff7a1a] transition-all">
            
            <Quote className="absolute top-4 right-4 w-8 h-8 text-[#584236]/30 group-hover:text-[#ff7a1a]/20 transition-colors" />

            <div>
              {/* Star Rating & Date */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex text-[#ff7a1a] gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-technical-data text-[10px] text-[#a78b7d]">
                  {review.date}
                </span>
              </div>

              {/* Title & Content */}
              <h3 className="font-h3 text-base text-[#e5e2e3] font-bold mb-2 leading-snug">
                "{review.title}"
              </h3>
              <p className="font-body-md text-xs text-[#e0c0b1] leading-relaxed mb-6">
                {review.review}
              </p>
            </div>

            {/* Author Details & Vehicle info */}
            <div className="pt-4 border-t border-[#584236]/30 flex items-center gap-3">
              <img 
                src={review.avatar} 
                alt={review.author} 
                className="w-10 h-10 rounded-sm object-cover border border-[#584236]"
              />
              <div>
                <div className="flex items-center gap-1.5 font-h3 text-xs text-[#e5e2e3] font-bold">
                  <span>{review.author}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-[#83cffb]" title="Verified Purchaser" />
                </div>
                <div className="font-technical-data text-[10px] text-[#ff7a1a]">
                  {review.vehicle}
                </div>
                <div className="font-technical-data text-[9px] text-[#a78b7d]">
                  {review.partPurchased}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
