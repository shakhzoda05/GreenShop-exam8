
export default function Blogs() {
  return (
    <div className="flex flex-col min-h-screen max-w-[1200px] mx-auto">
      <main className="flex-grow">
        <section className="bg-[#F5F5F5] py-12 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Greenshop Blog
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Insights, tips, and stories for plant lovers
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-8">
              Latest Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "The Rise of Urban Jungle: Bringing Nature Indoors",
                "Sustainable Gardening: How to Create an Eco-Friendly Oasis",
                "From Seed to Bloom: A Beginner's Guide to Growing Flowers",
                "The Healing Power of Plants: Green Therapy for Modern Life",
                "Vertical Gardening: Maximizing Space in Small Apartments",
                "The Art of Bonsai: Cultivating Miniature Marvels"
              ].map((title, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="bg-gray-200 h-48 mb-4 rounded-md"></div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                  <p className="text-gray-600 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">May 15, 2023</span>
                    <a href="#" className="text-[#46A358] hover:underline">Read more</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

