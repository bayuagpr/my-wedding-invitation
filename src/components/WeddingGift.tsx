import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function WeddingGift() {
  const [copiedStates, setCopiedStates] = useState({
    shahya: false,
    bayu: false
  });

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="py-20 bg-[#EAE5E7] font-semibold" id="gift">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl text-center text-primary mb-12">
          Wedding Gift
        </h2>

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary/80 text-lg mb-12">
            Your presence is the greatest gift to us.<br />
            If you'd like to give a little extra blessing, you may do so through the details below.
          </p>

          <div className="grid md:grid-cols-2 gap-12 text-left">
            {/* Groom's Account */}
            <div>
              <h3 className="text-xl md:text-2xl text-primary mb-4 text-center">Bayu</h3>
              <div className="bg-[#EAE5E7] p-6 rounded-lg shadow-lg">
                <p className="text-primary mb-2">Bank Mandiri</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl text-primary">1330014055412</p>
                  <button
                    onClick={() => copyToClipboard('1330014055412', 'bayu')}
                    className="ml-4 p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    title="Copy account number"
                  >
                    {copiedStates.bayu ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-primary" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Bride's Account */}
            <div>
              <h3 className="text-xl md:text-2xl text-primary mb-4 text-center">Shahya</h3>
              <div className="bg-[#EAE5E7] p-6 rounded-lg shadow-lg">
                <p className="text-primary mb-2">BCA</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl text-primary">6830840247</p>
                  <button
                    onClick={() => copyToClipboard('6830840247', 'shahya')}
                    className="ml-4 p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    title="Copy account number"
                  >
                    {copiedStates.shahya ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-primary" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            
          </div>

          {/* Physical Gift */}
          <div className="mt-12">
            <h3 className="text-xl text-primary mb-4">Physical Gift Address:</h3>
            <p className="text-primary/80 text-lg">
              Kost Gang Aut Harmoni Indah<br /> Gg. Aut bawah No.10, Gudang, Kecamatan Bogor Tengah,
              <br />Kota Bogor, Jawa Barat 16123
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}