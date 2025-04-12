export default function EventDetails() {
  return (
    <section className="py-20 bg-background" id="event">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl text-center text-primary mb-12">
          Event Details
        </h2>

        <div className="max-w-3xl mx-auto">
          {/* Akad Nikah */}
          <div className="mb-16">
            <h3 className="text-xl md:text-2xl text-center text-primary mb-6">Akad Nikah</h3>
            <div className="bg-card p-8 rounded-lg text-center shadow-md">
              <p className="text-primary mb-2">Saturday, 27th July 2025</p>
              <p className="text-primary mb-4">08:00 WIB</p>
              <p className="text-primary/80 mb-6">
                Lapangan Sepak Bola RW 08 Cimpaeun<br />
                Kecamatan Tapos<br />
                <br />Kota Depok, Jawa Barat
              </p>
              <a
                href="https://maps.app.goo.gl/SknFavRPqZ1zPHnu9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-none hover:bg-primary/90 transition-colors"
              >
                View on Google Maps
              </a>
            </div>
          </div>

          {/* Reception */}
          <div>
            <h3 className="text-xl md:text-2xl text-center text-primary mb-6">Reception</h3>
            <div className="bg-card p-8 rounded-lg text-center shadow-md">
              <p className="text-primary mb-2">Saturday, 27th July 2025</p>
              <p className="text-primary mb-4">11:00 - 14:00 WIB</p>
              <p className="text-primary/80 mb-6">
                Lapangan Sepak Bola RW 08 Cimpaeun<br />
                Kecamatan Tapos<br />
                <br />Kota Depok, Jawa Barat
              </p>
              <a
                href="https://maps.app.goo.gl/SknFavRPqZ1zPHnu9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-none hover:bg-primary/90 transition-colors"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
