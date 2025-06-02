import groomMain1 from "@/assets/OSM-8.jpg"
import groomMain2 from "@/assets/OSM-10-rev.jpg"

export default function GroomProfile() {
  return (
    <div>
      <div
        className="relative w-full h-[420px] md:h-[700px] overflow-hidden bg-no-repeat bg-[1%_15%] bg-cover md:bg-[size:150%]"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dizje8tlf/image/upload/v1748856431/OSM-8_ucmzab.jpg)`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0"></div>

        {/* Content overlay */}
        <div className="relative w-[250px] md:w-full z-10 h-full flex flex-col justify-start md:justify-center items-start text-left text-primary pt-10 px-10 md:px-10 lg:px-20 xl:px-40">
          <h3 className="text-md md:text-2xl lg:text-3xl mb-1 md:mb-3">The Groom</h3>
          <h2 className="text-lg md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">Bayu Agung Prakoso</h2>
          <p className="text-md md:text-lg lg:text-xl md:mb-2">Son of</p>
          <p className="text-md md:text-lg lg:text-xl mb-4 md:mb-6">Bapak Joko Subagyo & Ibu Canti Suhesti (Almh)</p>
          <a
            href="https://www.instagram.com/jonathantrisna/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-primary/80 hover:text-primary transition-colors text-sm md:text-lg"
          >
            @bayuagpr
          </a>
        </div>
      </div>
      <div
        className="relative w-full h-96 md:h-[700px] overflow-hidden bg-cover bg-no-repeat bg-[50%_30%]"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dizje8tlf/image/upload/v1748856465/OSM-10-rev_u7v0hq.jpg)`,
        }}
      ></div>
    </div>
  );
}
