export default function Footer() {
  return (
    <footer className="py-10 bg-[#EAE5E7] relative">
      <div
        className="absolute inset-0 bg-[50%_40%] bg-cover opacity-20"
        style={{ backgroundImage: `url(https://res.cloudinary.com/dizje8tlf/image/upload/v1748923777/OSM_sycld0.jpg)`, filter: 'brightness(0.9)' }}
      />
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl text-primary mb-4">Forever Grateful</h2>
          <p className="text-primary/70 max-w-xl mx-auto">
            Your love and presence have made our day even more special.<br />
            We are deeply grateful for your presence, love, and support as we begin this new chapter together.
          </p>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-2xl text-primary">Bayu & Shahya</h3>
        </div>
        <div className="text-center mb-24 rounded-lg p-4 bg-background text-white">
          <h3 className="text-lg">made by bayu</h3>
          <h3 className="text-md">(yes you're correct, the groom made this website 😅)</h3>
        </div>
      </div>
    </footer>
  );
}
