import groomMain1 from "@/assets/OSM-8.jpg"
import groomMain2 from "@/assets/OSM-10-rev.jpg"

export default function GroomProfile() {
  return (
    <div>
      <div
        className="relative w-full h-96 md:h-[700px] overflow-hidden bg-no-repeat bg-[1%_15%]"
        style={{
          backgroundImage: `url(${groomMain1.src})`,
          backgroundSize: '150%'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0"></div>

        {/* Content overlay */}
        <div className="relative z-10 h-full flex flex-col justify-center items-start text-left text-primary px-40">
          <h3 className="text-2xl md:text-3xl mb-3">The Groom</h3>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Bayu Agung Prakoso</h2>
          <p className="text-lg md:text-xl mb-2">Son of</p>
          <p className="text-lg md:text-xl mb-6">Bapak Joko Subagyo & Ibu Canti Suhesti (Almh)</p>
          <a
            href="https://www.instagram.com/jonathantrisna/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-primary/80 hover:text-primary transition-colors text-lg"
          >
            @bayuagpr
          </a>
        </div>
      </div>
      <div
        className="relative w-full h-96 md:h-[700px] overflow-hidden bg-cover bg-no-repeat bg-[50%_30%]"
        style={{
          backgroundImage: `url(${groomMain2.src})`,
        }}
      ></div>
    </div>
  );
}
