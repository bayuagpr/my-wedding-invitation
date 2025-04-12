export default function Header() {
  return (
    <header className="relative h-screen flex items-center justify-center bg-background" id="home">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: "url('https://ext.same-assets.com/2165661133/2979611549.jpeg')",
          filter: 'brightness(0.5)'
        }}
      />

      <div className="relative z-10 text-center px-4">
        <h2 className="text-lg md:text-xl text-white mb-4 uppercase tracking-widest">
          THE WEDDING OF
        </h2>
        <h1 className="text-5xl md:text-7xl text-white mb-6 font-light">
          Shahya & Bayu
        </h1>
        <p className="text-md md:text-lg text-white uppercase tracking-wider">
          Sunday, 27th July 2025
        </p>
      </div>
    </header>
  );
}
