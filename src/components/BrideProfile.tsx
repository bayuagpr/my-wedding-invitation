import brideMain1 from "@/assets/OSM-3-rev.jpg"
import brideMain2 from "@/assets/OSM-5.jpg"

export default function BrideProfile() {
  return (
    <div>
      <div
        className="relative w-full h-[420px] md:h-[700px] overflow-hidden bg-no-repeat bg-[99%_30%] bg-[size:170%] md:bg-[size:150%]"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dizje8tlf/image/upload/v1748900273/OSM-3-rev-2_sfuw2j.jpg)`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0"></div>

        {/* Content overlay */}
        <div className="relative z-10 h-full flex flex-col justify-start md:justify-center items-end text-right text-primary pt-10 px-10 md:px-10 lg:px-20 xl:px-40">
          <h3 className="text-md md:text-2xl lg:text-3xl mb-1 md:mb-3">The Bride</h3>
          <h2 className="text-lg md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 w-[250px] md:w-full">Putri Shahya Maharani</h2>
          <p className="text-md md:text-lg lg:text-xl md:mb-2">Daughter of</p>
          <p className="text-md md:text-lg lg:text-xl mb-4 md:mb-6 w-[220px] md:w-full">Bapak Azra Erwan Sofyan (Alm) & Ibu Karina Yulianti Dewi</p>
          <a
            href="https://www.instagram.com/ayuudiwidi/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-primary/80 hover:text-primary transition-colors text-sm md:text-lg"
          >
            @misshahya
          </a>
        </div>
      </div>
      <div
        className="relative w-full h-96 md:h-[700px] overflow-hidden bg-cover bg-no-repeat bg-[50%_15%]"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dizje8tlf/image/upload/v1748856432/OSM-5_fq3ttw.jpg)`,
        }}
      ></div>
    </div>
  );
}
