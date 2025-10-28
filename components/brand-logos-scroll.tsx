import Image from "next/image";

const brands = [
  { name: "Intel", logo: "/intel-logo.jpg" },
  { name: "AMD", logo: "/amd-logo.jpg" },
  { name: "NVIDIA", logo: "/nvidia-logo.jpg" },
  { name: "ASUS", logo: "/asus-logo.jpg" },
  { name: "MSI", logo: "/msi-logo.jpg" },
  { name: "Gigabyte", logo: "/gigabyte-logo.jpg" },
  { name: "Corsair", logo: "/corsair-logo.jpg" },
  { name: "G.Skill", logo: "/gskill-logo.jpg" },
];

export function BrandLogosScroll() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2 sm:mb-3">
          Thương hiệu hàng đầu
        </h2>
        <p className="text-sm sm:text-base text-center text-gray-600">
          Đối tác chính hãng của chúng tôi
        </p>
      </div>
      <div className="relative">
        <div className="flex gap-8 sm:gap-12 md:gap-16 animate-scroll">
          {/* First set */}
          {brands.map((brand, index) => (
            <div
              key={`brand-1-${index}`}
              className="flex-shrink-0 w-28 h-14 sm:w-32 sm:h-16 md:w-40 md:h-20 flex items-center justify-center bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
            >
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={140}
                height={70}
                className="object-contain opacity-70 hover:opacity-100 transition-opacity p-2 sm:p-3"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {brands.map((brand, index) => (
            <div
              key={`brand-2-${index}`}
              className="flex-shrink-0 w-28 h-14 sm:w-32 sm:h-16 md:w-40 md:h-20 flex items-center justify-center bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
            >
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={140}
                height={70}
                className="object-contain opacity-70 hover:opacity-100 transition-opacity p-2 sm:p-3"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
