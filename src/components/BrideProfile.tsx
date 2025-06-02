import brideMain1 from "@/assets/OSM-3-rev.jpg"
import brideMain2 from "@/assets/OSM-5.jpg"

export default function BrideProfile() {
  return (
    <div>
      <div
        className="relative w-full h-96 md:h-[700px] overflow-hidden bg-no-repeat bg-[99%_30%]"
        style={{
          backgroundImage: `url(${brideMain1.src})`,
          backgroundSize: '150%'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0"></div>

        {/* Content overlay */}
        <div className="relative z-10 h-full flex flex-col justify-center items-end text-right text-primary px-40">
          <h3 className="text-2xl md:text-3xl mb-3">The Bride</h3>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Putri Shahya Maharani</h2>
          <p className="text-lg md:text-xl mb-2">Daughter of</p>
          <p className="text-lg md:text-xl mb-6">Bapak Azra Erwan Sofyan (Alm) & Karina Yulianti Dewi</p>
          <a
            href="https://www.instagram.com/ayuudiwidi/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-primary/80 hover:text-primary transition-colors text-lg"
          >
            @misshahya
          </a>
        </div>
      </div>
      <div
        className="relative w-full h-96 md:h-[700px] overflow-hidden bg-cover bg-no-repeat bg-[50%_15%]"
        style={{
          backgroundImage: `url(${brideMain2.src})`,
        }}
      ></div>
    </div>
  );
}
