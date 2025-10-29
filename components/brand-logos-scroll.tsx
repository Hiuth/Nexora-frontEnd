import Image from "next/image";

const brands = [
  { name: "ADATA", logo: "/logo/adata.png" },
  { name: "AMD", logo: "/logo/amd.jpg" },
  { name: "AOC", logo: "/logo/aoc.jpg" },
  { name: "Baseus", logo: "/logo/baseus.jpg" },
  { name: "BenQ", logo: "/logo/benq.jpg" },
  { name: "Cooler Master", logo: "/logo/coolermaster.jpg" },
  { name: "Corsair", logo: "/logo/corsair.jpg" },
  { name: "Dareu", logo: "/logo/dareu.jpg" },
  { name: "Deepcool", logo: "/logo/deepcool.jpg" },
  { name: "Dell", logo: "/logo/dell.jpg" },
  { name: "Dry Studio", logo: "/logo/drystudio.png" },
  { name: "EDRA", logo: "/logo/edra.jpg" },
  { name: "Gamdias", logo: "/logo/gamdias.png" },
  { name: "Gigabyte", logo: "/logo/gigabyte.jpg" },
  { name: "G.Skill", logo: "/logo/gskill.jpg" },
  { name: "Intel", logo: "/logo/intel.jpg" },
  { name: "Lenovo", logo: "/logo/lenovo.png" },
  { name: "Lexar", logo: "/logo/lexar.png" },
  { name: "Logitech", logo: "/logo/logitech.jpg" },
  { name: "Samsung", logo: "/logo/samsung.jpg" },
  { name: "TeamGroup", logo: "/logo/teamgroup.jpg" },
  { name: "ViewSonic", logo: "/logo/viewsonic.png" },
];

export function BrandLogosScroll() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2 sm:mb-3">
          Thương hiệu hàng đầu
        </h2>
        <p className="text-sm sm:text-base text-center text-gray-600">
          Đối tác chính hãng của chúng tôi
        </p>
      </div>
      <div className="relative">
        <div className="flex gap-8 sm:gap-12 md:gap-16 animate-scroll">
          {brands.map((brand, index) => (
            <div
              key={`brand-1-${index}`}
              className="flex-shrink-0 w-28 h-14 sm:w-32 sm:h-16 md:w-40 md:h-20 flex items-center justify-center bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 scale-105"
            >
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={140}
                height={70}
                className="object-contain opacity-100 transition-opacity p-2 sm:p-3"
              />
            </div>
          ))}
          {brands.map((brand, index) => (
            <div
              key={`brand-2-${index}`}
              className="flex-shrink-0 w-28 h-14 sm:w-32 sm:h-16 md:w-40 md:h-20 flex items-center justify-center bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 scale-105"
            >
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={140}
                height={70}
                className="object-contain opacity-100 transition-opacity p-2 sm:p-3"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
