import { Star, CheckCircle } from "lucide-react";

export default function ReviewsBlock() {
  // Static placeholders for reviews
  const reviewsCount = 124;
  const rating = 4.8;
  const breakdown = [
    { stars: 5, count: 105, percent: 85 },
    { stars: 4, count: 12, percent: 10 },
    { stars: 3, count: 4, percent: 3 },
    { stars: 2, count: 2, percent: 1 },
    { stars: 1, count: 1, percent: 1 },
  ];

  return (
    <div className="py-12 border-t border-gray-100 mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-gray-900">Customer Reviews ({reviewsCount})</h2>
        <button className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors">
          View All
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Summary Card */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:w-80 shrink-0 border border-gray-100 flex flex-col items-center justify-center">
          <div className="text-6xl font-black text-gray-900 mb-2">{rating}</div>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className={`${i < 4 ? "fill-orange-400 text-orange-400" : "fill-gray-200 text-gray-200"}`} />
            ))}
          </div>
          <div className="text-sm text-gray-500 mb-8">Based on {reviewsCount} reviews</div>

          <div className="w-full space-y-3">
            {breakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-gray-600 font-medium w-8 shrink-0">
                  {item.stars} <Star size={12} className="fill-gray-600 text-gray-600" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-400 rounded-full" 
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
                <div className="w-8 text-right text-gray-500">{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="flex-1">
          <div className="border-b border-gray-100 pb-8">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold shrink-0">
                A
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900">Ayesha Khan</span>
                  <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    <CheckCircle size={12} className="fill-green-600 text-white" /> Verified Buyer
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
              </div>
            </div>
            
            <h4 className="font-bold text-gray-900 mb-2">Great product! Highly recommended</h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Very sturdy and has a lot of space. My place is now so organized. Totally worth it!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
