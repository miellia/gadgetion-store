import { Truck, ShieldCheck, Package, Tag, Phone, MessageCircle } from "lucide-react";

export default function TrustSection() {
  const features = [
    {
      icon: <Truck size={28} />,
      title: "Cash on Delivery",
      desc: "Pay when you receive",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Easy Returns",
      desc: "7 days return policy",
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
    {
      icon: <Package size={28} />,
      title: "Fast Shipping",
      desc: "Delivery all over PK",
      color: "text-orange-500",
      bg: "bg-orange-50"
    },
    {
      icon: <Tag size={28} />,
      title: "Best Prices",
      desc: "Imported & affordable",
      color: "text-green-500",
      bg: "bg-green-50"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Features Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group flex items-center gap-5 p-6 bg-gray-50/50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 cursor-default"
            >
              <div className={`shrink-0 w-14 h-14 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                {feature.icon}
              </div>
              <div>
                <h4 className="font-black text-gray-900 text-sm mb-0.5 uppercase tracking-wide">{feature.title}</h4>
                <p className="text-gray-500 text-xs font-medium">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Banner */}
        <div className="relative overflow-hidden bg-gray-900 rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
          {/* Abstract background blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full -ml-20 -mb-20"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-green-500/40 rotate-3 group hover:rotate-0 transition-transform duration-500">
              <MessageCircle size={40} className="text-white fill-white/20" />
            </div>
            <div>
              <h3 className="font-black text-white text-3xl md:text-4xl mb-3 tracking-tight">
                Need Help? <span className="text-green-400">Chat with us!</span>
              </h3>
              <p className="text-gray-400 font-medium text-lg max-w-md">
                Our support team is available on WhatsApp to assist you with your orders and queries.
              </p>
            </div>
          </div>
          
          <button className="group relative z-10 w-full lg:w-auto bg-green-500 hover:bg-green-400 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-500/20 active:scale-95">
            <MessageCircle size={24} className="fill-white" />
            <span>Open WhatsApp Chat</span>
          </button>
        </div>

      </div>
    </section>
  );
}

