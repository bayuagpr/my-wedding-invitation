export default function WeddingGift() {
  return (
    <section className="py-20 bg-background" id="gift">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl text-center text-primary mb-12">
          Wedding Gift
        </h2>

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary/80 mb-12">
            Your presence is the greatest gift to us.<br />
            If you'd like to give a little extra blessing, you may do so at our wishing well or through the details below.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Bride's Account */}
            <div>
              <h3 className="text-xl md:text-2xl text-primary mb-4">Shahya</h3>
              <div className="bg-card p-6 rounded-lg shadow-md">
                <p className="text-primary mb-2">BCA</p>
                <p className="text-xl text-primary">3440646432</p>
              </div>
            </div>

            {/* Groom's Account */}
            <div>
              <h3 className="text-xl md:text-2xl text-primary mb-4">Bayu</h3>
              <div className="bg-card p-6 rounded-lg shadow-md">
                <p className="text-primary mb-2">Bank Mandiri</p>
                <p className="text-xl text-primary">1550007108155</p>
              </div>
            </div>
          </div>

          {/* Physical Gift */}
          <div className="mt-12">
            <h3 className="text-xl text-primary mb-4">Physical Gift Address:</h3>
            <p className="text-primary/80">
              Binong Permai Blok B5 No. 3, RT 003, RW 012, Kel. Binong,
              <br />Kec. Curug, Kab. Tangerang, 15810
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
