import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-[1200px] mx-auto">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#F5F5F5] py-12 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Plant Care Guide
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Learn how to keep your plants thriving
            </p>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-8">
              Essential Plant Care Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "Watering Wisdom: Finding the Perfect Balance",
                "Let There Be Light: Understanding Plant Light Needs",
                "The Dirt on Soil: Choosing the Right Mix",
                "Pruning 101: Shaping Your Plants for Health",
                "Pest Control: Natural Ways to Protect Your Plants",
                "Fertilizing Facts: Nourishing Your Green Friends"
              ].map((title, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <a href="#" className="text-[#46A358] hover:underline mt-4 inline-block">Read more</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default page
