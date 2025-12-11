const artistImages = [
  'artists/artist_1.png',
  'artists/artist_2.png',
  'artists/artist_3.png',
  'artists/artist_4.png',
  'artists/artist_5.png',
  'artists/artist_6.png',
]

const BORDER_RADIUS = 24

const imageStyles = {
  boxShadow: 'inset 0 0 4px rgba(255, 255, 255, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: `${BORDER_RADIUS}px`,
}

export const Proof = () => (
  <section className="py-24 bg-zinc-950 border-t border-white/10">
    <div className="section-container flex flex-col md:flex-row items-start justify-between gap-12">
      {/* Text Content */}
      <div className="md:w-[45%] md:flex-shrink-0">
        <p className="subhead mb-4">ALREADY WORKING</p>
        <h2 className="serif text-4xl md:text-6xl gradient-text-hero mb-8 leading-[1.1]">
          Trusted by the World's Biggest Artists and Venues via KYD Labs.
        </h2>
        <p className="gradient-text-body max-w-md text-lg leading-relaxed mb-4">
          Over 1,000+ artists worldwide are already using the new, programmable ticketing standard powered by TIX, bringing fans closer and returning value to creators.
        </p>
        <p className="gradient-text-body max-w-md text-lg leading-relaxed mb-8">
          TIX powers the next generation of live shows, from sold-out arenas to emerging tours.
        </p>
        <button
          className="cta-gradient px-6 py-3 font-semibold transition-all hover:opacity-90"
          aria-label="Start building"
          tabIndex={0}
        >
          <span className="text-white/75">Start Building</span>
        </button>
      </div>

      {/* Artist Images Grid - Desktop */}
      <div className="hidden md:block md:w-[55%]">
        <div className="grid grid-cols-3 gap-4 max-w-[450px] mx-auto">
          {/* Row 1: Empty, Artist 1, Empty */}
          <div className="w-[134px] h-[134px]" />

          <div
            className="w-[134px] h-[134px] overflow-hidden"
            style={imageStyles}
          >
            <img
              src={`${import.meta.env.BASE_URL}${artistImages[0]}`}
              alt="Featured artist 1"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="w-[134px] h-[134px]" />

          {/* Row 2: Artist 2, KYD Logo Center, Artist 3 */}
          <div
            className="w-[134px] h-[134px] overflow-hidden"
            style={imageStyles}
          >
            <img
              src={`${import.meta.env.BASE_URL}${artistImages[1]}`}
              alt="Featured artist 2"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Center: KYD Logo + Stats */}
          <div className="w-[134px] h-[134px] flex flex-col items-center justify-center">
            <img
              src={`${import.meta.env.BASE_URL}KYD logo white.svg`}
              alt="KYD Labs"
              className="w-[100px] h-auto"
            />
            <p className="gradient-text-body text-xs mt-2 text-center leading-tight">
              300k+ tickets,<br />thousands of artists
            </p>
          </div>

          <div
            className="w-[134px] h-[134px] overflow-hidden"
            style={imageStyles}
          >
            <img
              src={`${import.meta.env.BASE_URL}${artistImages[2]}`}
              alt="Featured artist 3"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Row 3: Artist 4, Artist 5, Artist 6 */}
          {artistImages.slice(3, 6).map((src, index) => (
            <div
              key={index + 3}
              className="w-[134px] h-[134px] overflow-hidden"
              style={imageStyles}
            >
              <img
                src={`${import.meta.env.BASE_URL}${src}`}
                alt={`Featured artist ${index + 4}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Artist Images Grid - Mobile */}
      <div className="md:hidden w-full">
        <div className="grid grid-cols-3 gap-3 max-w-[340px] mx-auto">
          {/* Row 1: Empty, Artist 1, Empty */}
          <div className="w-[100px] h-[100px]" />

          <div
            className="w-[100px] h-[100px] overflow-hidden"
            style={imageStyles}
          >
            <img
              src={`${import.meta.env.BASE_URL}${artistImages[0]}`}
              alt="Featured artist 1"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="w-[100px] h-[100px]" />

          {/* Row 2: Artist 2, KYD Logo Center, Artist 3 */}
          <div
            className="w-[100px] h-[100px] overflow-hidden"
            style={imageStyles}
          >
            <img
              src={`${import.meta.env.BASE_URL}${artistImages[1]}`}
              alt="Featured artist 2"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Center: KYD Logo + Stats */}
          <div className="w-[100px] h-[100px] flex flex-col items-center justify-center">
            <img
              src={`${import.meta.env.BASE_URL}KYD logo white.svg`}
              alt="KYD Labs"
              className="w-[72px] h-auto"
            />
            <p className="gradient-text-body text-[10px] mt-1 text-center leading-tight">
              300k+ tickets,<br />thousands of artists
            </p>
          </div>

          <div
            className="w-[100px] h-[100px] overflow-hidden"
            style={imageStyles}
          >
            <img
              src={`${import.meta.env.BASE_URL}${artistImages[2]}`}
              alt="Featured artist 3"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Row 3: Artist 4, Artist 5, Artist 6 */}
          {artistImages.slice(3, 6).map((src, index) => (
            <div
              key={index + 3}
              className="w-[100px] h-[100px] overflow-hidden"
              style={imageStyles}
            >
              <img
                src={`${import.meta.env.BASE_URL}${src}`}
                alt={`Featured artist ${index + 4}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)
