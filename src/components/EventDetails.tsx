export default function EventDetails() {
  return (
    <section className="py-20 bg-[#10191e]" id="weddingevent">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl text-center text-white mb-16">
          save our date
        </h2>

        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl text-white mb-2">SUNDAY</h3>
          <h3 className="text-xl md:text-2xl text-white/80">27th JULY 2025</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Holy Matrimony */}
          <div className="text-center">
            <h3 className="text-2xl text-white mb-4">Holy Matrimony</h3>
            <p className="text-lg text-white/80 mb-8">08.00 AM - 10.00 AM</p>

            <div className="mb-6">
              <p className="text-lg text-white mb-2">GKJ Magelang</p>
              <p className="text-base text-white/70">
                Jl. Tentara Pelajar No.106, Kemirirejo,
                <br />Kota Magelang, Jawa Tengah
              </p>
            </div>

            <a
              href="https://maps.app.goo.gl/ySAz8Fed7BSC6AJq5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-transparent border border-white text-white px-4 py-2 text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              GOOGLE MAPS
            </a>
          </div>

          {/* Wedding Reception */}
          <div className="text-center">
            <h3 className="text-2xl text-white mb-4">Wedding Reception</h3>
            <p className="text-lg text-white/80 mb-8">12.00 PM - 01.30 PM</p>

            <div className="mb-6">
              <p className="text-lg text-white mb-2">Villa Grand Artos</p>
              <p className="text-base text-white/70">
                Jl. Cempaka, Jurangombo Utara,
                <br />Kec. Magelang Sel., Kota Magelang, Jawa Tengah
              </p>
            </div>

            <a
              href="https://maps.app.goo.gl/LgPeQZRtGZsSQQ2s7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-transparent border border-white text-white px-4 py-2 text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              GOOGLE MAPS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
