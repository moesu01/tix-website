const investors = [
  { name: 'a16z', src: 'backed/a16z.png', tall: false },
  { name: 'Founders Fund', src: 'backed/founders fund.png', tall: true },
  { name: 'Comcast Ventures', src: 'backed/comcast.png', tall: true },
  { name: 'NBCUniversal', src: 'backed/nbcu.png', tall: false },
  { name: 'CAA', src: 'backed/caa.png', tall: false },
  { name: 'UTA', src: 'backed/UTA.png', tall: true },
]

export const BackedBy = () => (
  <div className="w-full py-16 border-t border-white/5 bg-gradient-to-b from-black to-zinc-950">
    <div className="section-container">
      <p className="subhead text-center mb-8">BACKED BY THE BEST</p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
        {investors.map((investor) => (
          <img
            key={investor.name}
            src={`${import.meta.env.BASE_URL}${investor.src}`}
            alt={investor.name}
            className={`w-auto object-contain ${investor.tall ? 'h-14' : 'h-7'}`}
          />
        ))}
      </div>
    </div>
  </div>
)
