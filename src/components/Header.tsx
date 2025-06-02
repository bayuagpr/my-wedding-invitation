import weddingHero from "@/assets/OSM-11.jpg"

export default function Header() {
  return (
    <header className="relative h-screen flex justify-center items-start 2xl:items-center 2xl:justify-start bg-background" id="home">
      <div
        className="absolute inset-0 bg-cover bg-[55%_10%] md:bg-center"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dizje8tlf/image/upload/v1748856434/OSM-11_b8hidc.jpg)`,
          // filter: 'brightness(0.5)'
        }}
      />

      <div className="relative z-10 text-center 2xl:text-left 2xl:pl-40 2xl:mb-20 md:mt-10 mt-12">
        <h2 className="text-lg md:text-xl 2xl:text-2xl text-primary mb-4 uppercase tracking-widest">
          THE WEDDING OF
        </h2>
        <h1 className="text-5xl md:text-7xl text-primary mb-6 font-light">
          Bayu & Shahya
        </h1>
        <p className="text-md md:text-lg 2xl:text-xl text-primary uppercase tracking-wider">
          Sunday, 27th July 2025
        </p>
      </div>
    </header>
  );
}
