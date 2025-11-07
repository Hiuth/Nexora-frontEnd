"use client";

export function HeroBanner() {
  return (
    <section className="relative h-[160px] xs:h-[180px] sm:h-[280px] md:h-[360px] lg:h-[480px] xl:h-[560px] overflow-hidden">
      <div className="absolute inset-0">
        {/* Banner 1 */}
        <div className="absolute inset-0 animate-[slideShow_20s_infinite_0s]">
          <img
            src="/banner1.png"
            alt="Gaming Banner 1"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Banner 2 */}
        <div className="absolute inset-0 animate-[slideShow_20s_infinite_5s]">
          <img
            src="/banner2.png"
            alt="Gaming Banner 2"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Banner 3 */}
        <div className="absolute inset-0 animate-[slideShow_20s_infinite_10s]">
          <img
            src="/banner3.png"
            alt="Gaming Banner 3"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Banner 4 */}
        <div className="absolute inset-0 animate-[slideShow_20s_infinite_15s]">
          <img
            src="/banner4.png"
            alt="Gaming Banner 4"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 sm:bg-gradient-to-r sm:from-black/20 sm:via-black/5 sm:to-transparent"></div>
        {/* Dots */}
        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-white/70 animate-[dotActive_20s_infinite_0s] transition-all duration-300"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-white/70 animate-[dotActive_20s_infinite_5s] transition-all duration-300"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-white/70 animate-[dotActive_20s_infinite_10s] transition-all duration-300"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-white/70 animate-[dotActive_20s_infinite_15s] transition-all duration-300"></div>
        </div>
      </div>
    </section>
  );
}
