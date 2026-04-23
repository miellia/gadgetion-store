import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col">
            <Link href="/" className="mb-6 inline-block">
              <Image 
                src="/logo.png" 
                alt="Gadgetion Logo" 
                width={160} 
                height={50} 
                className="h-12 w-auto object-contain scale-[1.35] origin-left"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">
              Your one-stop shop for useful, affordable & imported everyday gadgets.
              We bring the best quality directly to you from across the globe.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-11 h-11 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-11 h-11 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#E4405F] hover:border-[#E4405F] transition-all shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-11 h-11 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-white hover:bg-black hover:border-black transition-all shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h3 className="font-black text-gray-900 mb-6 text-base uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-500 hover:text-orange-500 transition-colors font-medium text-sm">Home</Link></li>
              <li><Link href="/about" className="text-gray-500 hover:text-orange-500 transition-colors font-medium text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-500 hover:text-orange-500 transition-colors font-medium text-sm">Contact Us</Link></li>
              <li><Link href="/track" className="text-gray-500 hover:text-orange-500 transition-colors font-medium text-sm">Track Order</Link></li>
              <li><Link href="/faqs" className="text-gray-500 hover:text-orange-500 transition-colors font-medium text-sm">FAQs</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-black text-gray-900 mb-6 text-base uppercase tracking-wider">Categories</h3>
            <ul className="space-y-4">
              <li><Link href="/products?category=kitchen" className="text-gray-500 hover:text-orange-500 transition-colors font-medium text-sm">Kitchen Accessories</Link></li>
              <li><Link href="/products?category=bathroom" className="text-gray-500 hover:text-orange-500 transition-colors font-medium text-sm">Bathroom Accessories</Link></li>
              <li><Link href="/products?category=gadgets" className="text-gray-500 hover:text-orange-500 transition-colors font-medium text-sm">Smart Gadgets</Link></li>
              <li><Link href="/products?category=storage" className="text-gray-500 hover:text-orange-500 transition-colors font-medium text-sm">Storage Organizers</Link></li>
              <li><Link href="/products?category=deals" className="text-gray-500 hover:text-orange-500 transition-colors font-medium text-sm">Hot Deals</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-black text-gray-900 mb-6 text-base uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Email Address</span>
                <span className="text-gray-600 font-bold text-sm">support@gadgetion.pk</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Phone Number</span>
                <span className="text-gray-600 font-bold text-sm">+92 300 1234567</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Office Location</span>
                <span className="text-gray-600 font-bold text-sm">Gadgetion Store, Karachi, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-400 text-xs font-medium">
            &copy; {new Date().getFullYear()} Gadgetion. Smart solutions for modern homes.
          </p>
          <div className="flex items-center gap-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-orange-500 transition-colors">Terms</Link>
            <Link href="/shipping" className="hover:text-orange-500 transition-colors">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

