import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import PageLayout from '../PageLayout';

interface PromotionItem {
  id: number;
  title: string;
  category: string;
  discount: string;
  originalPrice: string;
  promotionPrice: string;
  image: string;
  description: string;
  validUntil: string;
  includes: string[];
}

export default function EventPage() {
  const [selectedItem, setSelectedItem] = useState<PromotionItem | null>(null);
  const [clickedCard, setClickedCard] = useState<number | null>(null);

  const promotionItems: PromotionItem[] = [
    {
      id: 1,
      title: 'Laser Hair Removal Package',
      category: 'laser treatment',
      discount: '40% OFF',
      originalPrice: '$800',
      promotionPrice: '$480',
      validUntil: 'Valid until March 31, 2024',
      image: 'https://images.unsplash.com/photo-1593260853607-d0e0f639bdab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBrb3JlYW4lMjB3b21hbiUyMHNraW5jYXJlfGVufDF8fHx8MTc1NjEwNjEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Complete laser hair removal package for international patients. Premium IPL technology with guaranteed smooth, beautiful skin results.',
      includes: ['6 Sessions Full Body', 'Free Consultation', 'Aftercare Products', 'English-speaking Staff']
    },
    {
      id: 2,
      title: 'Botox Anti-Aging Treatment',
      category: 'injectable',
      discount: '30% OFF',
      originalPrice: '$600',
      promotionPrice: '$420',
      validUntil: 'Valid until April 15, 2024',
      image: 'https://images.unsplash.com/photo-1722350766824-f8520e9676ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjB3b21hbiUyMGZhY2lhbCUyMHRyZWF0bWVudCUyMHNwYXxlbnwxfHx8fDE3NTYxMDYxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Professional Botox treatment for youthful, wrinkle-free skin. FDA-approved products with experienced Korean aesthetic doctors.',
      includes: ['Forehead + Eyes + Frown Lines', 'Post-Treatment Care', '2-Week Follow-up', 'International Certification']
    },
    {
      id: 3,
      title: 'Dermal Filler Enhancement',
      category: 'injectable',
      discount: '25% OFF',
      originalPrice: '$900',
      promotionPrice: '$675',
      validUntil: 'Valid until March 20, 2024',
      image: 'https://images.unsplash.com/photo-1722350766824-f8520e9676ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjB3b21hbiUyMGZhY2lhbCUyMHRyZWF0bWVudCUyMHNwYXxlbnwxfHx8fDE3NTYxMDYxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Premium hyaluronic acid fillers for facial contouring and volume restoration with natural-looking Korean beauty results.',
      includes: ['1ml Premium Filler', 'Face Mapping Analysis', 'Numbing Cream', 'Emergency Contact Support']
    },
    {
      id: 4,
      title: 'Glass Skin Facial Package',
      category: 'facial treatment',
      discount: '35% OFF',
      originalPrice: '$400',
      promotionPrice: '$260',
      validUntil: 'Valid until April 30, 2024',
      image: 'https://images.unsplash.com/photo-1593260853607-d0e0f639bdab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBiZWF1dHklMjBtb2RlbCUyMHNraW5jYXJlfGVufDF8fHx8MTc1NjEwNjEyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Achieve the famous Korean "glass skin" look with our signature hydrating facial treatment perfect for achieving porcelain-like complexion.',
      includes: ['3 Session Package', 'Korean Skincare Products', 'Home Care Kit', 'Skin Analysis Report']
    },
    {
      id: 5,
      title: 'K-Beauty Glow Treatment',
      category: 'brightening',
      discount: '50% OFF',
      originalPrice: '$1200',
      promotionPrice: '$600',
      validUntil: 'Valid until May 15, 2024',
      image: 'https://images.unsplash.com/photo-1581883556531-e5f8027f557f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwZ2xvd2luZyUyMHNraW58ZW58MXx8fHwxNzU2MTA2MTMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Comprehensive K-beauty glow program combining LED therapy, vitamin C infusions, and Korean brightening techniques for luminous skin.',
      includes: ['6-Month Treatment Plan', 'LED Light Therapy', 'Vitamin C Serums', 'Weekly Monitoring']
    },
    {
      id: 6,
      title: 'Premium Skincare Routine',
      category: 'skincare',
      discount: '45% OFF',
      originalPrice: '$1500',
      promotionPrice: '$825',
      validUntil: 'Valid until March 25, 2024',
      image: 'https://images.unsplash.com/photo-1710839465443-8671ced76e09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjB3b21hbiUyMHNraW5jYXJlJTIwcm91dGluZXxlbnwxfHx8fDE3NTYwMTk5Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Ultimate Korean beauty package combining multiple advanced treatments for comprehensive skin transformation and anti-aging.',
      includes: ['Microneedling + PRP', 'Chemical Peel', 'Vitamin C Infusion', '3-Month Skincare Kit']
    },
    {
      id: 7,
      title: 'Hydrating Beauty Boost',
      category: 'hydration',
      discount: '30% OFF',
      originalPrice: '$350',
      promotionPrice: '$245',
      validUntil: 'Valid until April 10, 2024',
      image: 'https://images.unsplash.com/photo-1593260853607-d0e0f639bdab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBnaXJsJTIwYmVhdXR5JTIwcHJvZHVjdHN8ZW58MXx8fHwxNzU2MTA2MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Deep hydration treatment using Korean beauty secrets for plump, dewy skin that glows from within.',
      includes: ['Hyaluronic Acid Therapy', 'Collagen Mask', 'Recovery Products', 'Follow-up Consultation']
    },
    {
      id: 8,
      title: 'Face Mask Therapy Special',
      category: 'mask treatment',
      discount: '40% OFF',
      originalPrice: '$500',
      promotionPrice: '$300',
      validUntil: 'Valid until March 28, 2024',
      image: 'https://images.unsplash.com/photo-1670201203614-cdb9b8fdf4c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwZmFjZSUyMG1hc2slMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzU2MTA2MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Luxurious face mask therapy using premium Korean ingredients for intensive skin repair and rejuvenation.',
      includes: ['Professional Face Masks', 'Serum Infusion', 'Healing Treatment', 'Post-Care Instructions']
    },
    {
      id: 9,
      title: 'Beauty Consultation Package',
      category: 'consultation',
      discount: 'FREE',
      originalPrice: '$150',
      promotionPrice: '$0',
      validUntil: 'Available Daily',
      image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBhc2lhbiUyMG1vZGVsJTIwc3BhJTIwdHJlYXRtZW50fGVufDF8fHx8MTc1NjEwNjEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Comprehensive beauty consultation with our Korean aesthetic specialists to create your personalized beauty transformation plan.',
      includes: ['Detailed Skin Analysis', 'Treatment Plan', 'Product Recommendations', 'Multi-language Support']
    }
  ];

  return (
    <PageLayout letter="P" letterPosition="top-left">
      <div className="max-w-7xl px-6 py-8 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-6 text-gray-800">Special Promotions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Exclusive K-beauty offers for international clients at SoRa Clinic. 
            Experience premium Korean beauty treatments with special discounted rates.
          </p>
          <div className="mt-6 inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium">
            ⚡ Limited Time Offers - Book Your Beauty Transformation Now!
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotionItems.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 border border-pink-100/50 cursor-pointer ${
                clickedCard === item.id ? 'transform scale-105 shadow-2xl' : 'transform scale-100'
              }`}
              onClick={() => {
                setClickedCard(item.id);
                setTimeout(() => {
                  setClickedCard(null);
                  setSelectedItem(item);
                }, 200);
              }}
            >
              {/* Discount Badge */}
              <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                {item.discount}
              </div>

              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* K-beauty inspired overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm text-pink-200 mb-1">
                      {item.validUntil}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block bg-gradient-to-r from-[#0ABAB5]/10 to-pink-100 text-[#0ABAB5] px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                    {item.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#0ABAB5] transition-colors">
                  {item.title}
                </h3>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-[#0ABAB5]">
                    {item.promotionPrice}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {item.originalPrice}
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="space-y-2">
                  <div className="text-xs text-gray-500 font-medium">INCLUDES:</div>
                  <div className="flex flex-wrap gap-1">
                    {item.includes.slice(0, 2).map((include, index) => (
                      <span key={index} className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded">
                        {include}
                      </span>
                    ))}
                    {item.includes.length > 2 && (
                      <span className="text-xs bg-gradient-to-r from-[#0ABAB5]/10 to-pink-100 text-[#0ABAB5] px-2 py-1 rounded">
                        +{item.includes.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* K-beauty glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0ABAB5]/5 via-pink-200/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-pink-100/50" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg relative">
                    <ImageWithFallback
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                      {selectedItem.discount}
                    </div>
                    {/* Beautiful overlay on modal image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-4">
                  <div>
                    <div className="mb-2">
                      <span className="inline-block bg-gradient-to-r from-[#0ABAB5]/10 to-pink-100 text-[#0ABAB5] px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                        {selectedItem.category}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl text-gray-800 mb-3 font-light leading-tight">
                      {selectedItem.title}
                    </h2>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl md:text-3xl font-bold text-[#0ABAB5]">
                        {selectedItem.promotionPrice}
                      </span>
                      <span className="text-lg md:text-xl text-gray-400 line-through">
                        {selectedItem.originalPrice}
                      </span>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 to-pink-50 border border-pink-200 rounded-lg p-2 mb-4">
                      <div className="text-xs md:text-sm text-pink-800 font-medium">
                        ⏰ {selectedItem.validUntil}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {selectedItem.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-800">What's Included:</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {selectedItem.includes.map((include, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#0ABAB5] to-pink-400 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{include}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-gradient-to-r from-[#0ABAB5] to-pink-400 hover:from-[#0ABAB5]/90 hover:to-pink-400/90 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex-1 text-sm">
                      Book This
                    </Button>
                    <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50 px-4 py-2 rounded-full transition-all duration-300 text-sm">
                      Ask Questions
                    </Button>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}