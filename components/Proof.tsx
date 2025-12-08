interface ArtistImage {
  src: string
  desktopStyle: {
    left?: string
    right?: string
    top?: string
    bottom?: string
  }
  borderRadius: number
  zIndex: number
}

const artistImages: ArtistImage[] = [
  {
    src: '/artists/artist_1.png',
    desktopStyle: { left: '0', top: '80px' },
    borderRadius: 40,
    zIndex: 10,
  },
  {
    src: '/artists/artist_2.png',
    desktopStyle: { left: '140px', top: '0' },
    borderRadius: 40,
    zIndex: 20,
  },
  {
    src: '/artists/artist_3.png',
    desktopStyle: { right: '0', top: '80px' },
    borderRadius: 100,
    zIndex: 15,
  },
  {
    src: '/artists/artist_4.png',
    desktopStyle: { left: '60px', top: '210px' },
    borderRadius: 100,
    zIndex: 25,
  },
  {
    src: '/artists/artist_5.png',
    desktopStyle: { left: '200px', top: '330px' },
    borderRadius: 40,
    zIndex: 10,
  },
  {
    src: '/artists/artist_6.png',
    desktopStyle: { right: '40px', top: '230px' },
    borderRadius: 40,
    zIndex: 15,
  },
]

const getImageStyles = (borderRadius: number) => ({
  boxShadow: 'inset 0 0 4px rgba(255, 255, 255, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: `${borderRadius}px`,
})

export const Proof = () => (
  <section className="py-24 bg-zinc-950 border-t border-white/10">
    <div className="section-container flex flex-col md:flex-row items-start justify-between gap-12">
      {/* Text Content */}
      <div className="md:w-[45%] md:flex-shrink-0">
        <p className="subhead mb-4">ALREADY WORKING</p>
        <h2 className="serif text-5xl md:text-6xl gradient-text-hero mb-8">
          Trusted by the world's biggest artists & venues.
        </h2>
        <p className="gradient-text-body max-w-md text-lg leading-relaxed mb-4">
          Over 1,000+ global artists already use programmable ticketing standards that TIX enables, bringing fans closer and value back to creators.
        </p>
        <p className="gradient-text-body max-w-md text-lg leading-relaxed mb-8">
          TIX powers the next generation of live shows, from sold-out arenas to emerging tours.
        </p>
        <button 
          className="cta-gradient px-6 py-3 font-semibold transition-all hover:opacity-90"
          aria-label="Join the TIX waitlist"
          tabIndex={0}
        >
          <span className="text-white/75">Join Waitlist</span>
        </button>
      </div>

      {/* Artist Images Collage - Desktop Scattered Layout */}
      <div className="hidden md:block md:w-[55%] relative h-[480px]">
        {artistImages.map((image, index) => (
          <div
            key={index}
            className="absolute w-[134px] h-[134px] overflow-hidden"
            style={{
              ...getImageStyles(image.borderRadius),
              ...image.desktopStyle,
              zIndex: image.zIndex,
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}${image.src}`}
              alt={`Featured artist ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Artist Images Collage - Mobile Grid */}
      <div className="md:hidden w-full">
        <div className="grid grid-cols-3 gap-3 max-w-[340px] mx-auto">
          {artistImages.map((image, index) => (
            <div
              key={index}
              className="w-[100px] h-[100px] overflow-hidden"
              style={getImageStyles(image.borderRadius)}
            >
              <img
                src={`${import.meta.env.BASE_URL}${image.src}`}
                alt={`Featured artist ${index + 1}`}
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
