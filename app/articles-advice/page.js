"use client";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ArticlesAdvice() {
    const images = [
        { id: 1, src: "/assets/1.jpeg", alt: "Property 1" },
        { id: 2, src: "/assets/2.jpeg", alt: "Property 2" },
        { id: 3, src: "/assets/3.jpeg", alt: "Property 3" },
        { id: 4, src: "/assets/4.jpeg", alt: "Property 4" },
        { id: 5, src: "/assets/5.jpeg", alt: "Property 5" },
        { id: 6, src: "/assets/6.jpeg", alt: "Property 6" },
        { id: 7, src: "/assets/7.jpeg", alt: "Property 7" },
        { id: 8, src: "/assets/8.jpeg", alt: "Property 8" },
        { id: 9, src: "/assets/9.jpeg", alt: "Property 9" },
        { id: 10, src: "/assets/10.jpeg", alt: "Property 10" }
    ];

    return (
        <main className="min-h-screen bg-[#F4F4F4]">
            <Header />
            
            {/* Simple Image Gallery */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-semibold text-gray-900 mb-3">
                           Features
                        </h1>
                        <p className="text-base text-gray-600">
                            Explore more of atrticles and advices
                        </p>
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {images.map((image) => (
                            <div key={image.id} className="group relative overflow-hidden rounded-lg border border-gray-200">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blogs Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-3">
                            Blogs
                        </h2>
                        <p className="text-base text-gray-600">
                            Latest insights and tips from our experts
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Blog 1 */}
                        <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                            <img
                                src="/assets/1.jpeg"
                                alt="Dubai Real Estate Market Trends"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Market Analysis</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Dubai Real Estate Market Trends 2024
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Discover the latest trends shaping Dubai's real estate market, from luxury developments to affordable housing initiatives.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">March 15, 2024</span>
                                    <button className="text-[#00458b] text-sm font-semibold">
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* Blog 2 */}
                        <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                            <img
                                src="/assets/2.jpeg"
                                alt="Investment Opportunities"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Investment Guide</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Top Investment Opportunities in Dubai
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Explore the best investment opportunities across Dubai's diverse real estate landscape, from commercial to residential.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">March 12, 2024</span>
                                    <button className="text-[#00458b] text-sm font-semibold">
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* Blog 3 */}
                        <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                            <img
                                src="/assets/3.jpeg"
                                alt="Property Management Tips"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2">Property Management</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Essential Property Management Tips
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Learn the essential strategies for effective property management and maximizing your rental income.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">March 10, 2024</span>
                                    <button className="text-[#00458b] text-sm font-semibold">
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* Blog 4 */}
                        <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                            <img
                                src="/assets/4.jpeg"
                                alt="Luxury Real Estate"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">Luxury Market</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Luxury Real Estate in Dubai: What's Hot
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Get insights into Dubai's luxury real estate market and the most sought-after properties and locations.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">March 8, 2024</span>
                                    <button className="text-[#00458b] text-sm font-semibold">
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* Blog 5 */}
                        <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                            <img
                                src="/assets/5.jpeg"
                                alt="Commercial Real Estate"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-2">Commercial</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Commercial Real Estate: Office Spaces
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Everything you need to know about investing in commercial office spaces in Dubai's business districts.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">March 5, 2024</span>
                                    <button className="text-[#00458b] text-sm font-semibold">
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* Blog 6 */}
                        <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                            <img
                                src="/assets/6.jpeg"
                                alt="Real Estate Technology"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">Technology</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    PropTech: Technology in Real Estate
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    How technology is revolutionizing the real estate industry and what it means for buyers and sellers.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">March 3, 2024</span>
                                    <button className="text-[#00458b] text-sm font-semibold">
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Load More Button */}
                    <div className="text-center mt-12">
                        <button className="bg-[#00458b] text-white px-6 py-3 rounded-lg text-sm font-semibold">
                            Load More Articles
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}