"use client";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Star, MapPin, Bed, Bath, Square } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Luxury() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const luxuryProperties = [
        {
            id: 1,
            price: "AED 146,500,000",
            beds: 8,
            baths: "8F/4H",
            sqft: "17254",
            location: "Palm Jumeirah, Dubai",
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
            title: "Modern Luxury Estate"
        },
        {
            id: 2,
            price: "AED 93,600,000",
            beds: 6,
            baths: "6F/3H",
            sqft: "12500",
            location: "Emirates Hills, Dubai",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
            title: "Hillside Villa"
        },
        {
            id: 3,
            price: "AED 68,800,000",
            beds: 5,
            baths: "5F/2H",
            sqft: "9800",
            location: "Jumeirah Bay Island, Dubai",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
            title: "Oceanfront Penthouse"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % luxuryProperties.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + luxuryProperties.length) % luxuryProperties.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main className="min-h-screen bg-white">
            <Header />
            
            {/* Hero Section with Image Slider */}
            <section className="relative h-screen overflow-hidden">
                {/* Background Images */}
                {luxuryProperties.map((property, index) => (
                    <div
                        key={property.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <div
                            className="w-full h-full bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${property.image})` }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40" />
                    </div>
                ))}

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end">
                    <div className="w-full bg-gradient-to-t from-black via-black/70 to-transparent p-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex justify-between items-end">
                                {/* Property Details */}
                                <div className="text-white">
                                    <div className="text-5xl font-bold mb-2">
                                        {luxuryProperties[currentSlide].price}
                                    </div>
                                    <div className="flex items-center space-x-6 text-lg mb-4">
                                        <div className="flex items-center">
                                            <Bed className="w-5 h-5 mr-2" />
                                            {luxuryProperties[currentSlide].beds} Beds
                                        </div>
                                        <div className="flex items-center">
                                            <Bath className="w-5 h-5 mr-2" />
                                            {luxuryProperties[currentSlide].baths} Baths
                                        </div>
                                        <div className="flex items-center">
                                            <Square className="w-5 h-5 mr-2" />
                                            {luxuryProperties[currentSlide].sqft} Sq Ft
                                        </div>
                                    </div>
                                    <div className="flex items-center text-lg">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        {luxuryProperties[currentSlide].location}
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button className="bg-white text-[#00458b] px-6 py-3 rounded-lg text-sm font-semibold border border-gray-200">
                                    VIEW PROPERTY
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white z-10 px-4">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                            The RE/MAX Collection
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                            Fine Homes & Luxury Properties
                        </p>
                        
                        {/* Search Bar */}
                        <div className="flex justify-center mb-6">
                            <div className="flex bg-white rounded-lg overflow-hidden border border-gray-200 max-w-2xl w-full">
                                <input
                                    type="text"
                                    placeholder="Search luxury properties by location..."
                                    className="flex-1 px-6 py-4 text-gray-900 placeholder-gray-500 focus:outline-none text-base"
                                />
                                <button className="bg-[#00458b] text-white px-6 py-4">
                                    <Search className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {luxuryProperties.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide 
                                    ? 'bg-white' 
                                    : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                            Discover Exceptional Properties Worldwide
                        </h2>
                        <p className="text-base text-gray-600 leading-relaxed mb-8">
                            The RE/MAX Collection represents the finest luxury properties across the globe. Our network of specialized luxury agents provides unparalleled expertise and access to exclusive listings in the world's most prestigious locations.
                        </p>
                        <div className="grid md:grid-cols-3 gap-8 mt-12">
                            <div className="text-center">
                                <div className="text-3xl font-semibold text-[#00458b] mb-1">110+</div>
                                <p className="text-sm text-gray-600">Countries & Territories</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-semibold text-[#00458b] mb-1">140K+</div>
                                <p className="text-sm text-gray-600">Global Agents</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-semibold text-[#00458b] mb-1">#1</div>
                                <p className="text-sm text-gray-600">Luxury Real Estate Brand</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Properties Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-3">
                            Featured Luxury Properties
                        </h2>
                        <p className="text-base text-gray-600 max-w-2xl mx-auto">
                            Explore our curated selection of exceptional homes and estates
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {luxuryProperties.map((property) => (
                            <div key={property.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                                <div className="relative">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                            <span className="text-sm font-semibold">Luxury</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {property.price}
                                    </h3>
                                    <h4 className="text-base font-medium text-gray-700 mb-3">
                                        {property.title}
                                    </h4>
                                    <div className="flex items-center text-gray-600 mb-4">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {property.location}
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <Bed className="w-4 h-4 mr-1" />
                                            {property.beds} Beds
                                        </div>
                                        <div className="flex items-center">
                                            <Bath className="w-4 h-4 mr-1" />
                                            {property.baths} Baths
                                        </div>
                                        <div className="flex items-center">
                                            <Square className="w-4 h-4 mr-1" />
                                            {property.sqft} Sq Ft
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="bg-[#00458b] text-white px-6 py-3 rounded-lg text-sm font-semibold">
                            VIEW ALL LUXURY PROPERTIES
                        </button>
                    </div>
                </div>
            </section>

            {/* Why Choose RE/MAX Collection */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                                Why Choose The RE/MAX Collection
                            </h2>
                            <p className="text-base text-gray-600 mb-6 leading-relaxed">
                                When you work with a RE/MAX Collection agent, you gain access to a global network of luxury real estate professionals who understand the unique demands of high-end property transactions.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-[#E8F0FB] rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Global Reach</h3>
                                        <p className="text-sm text-gray-600">Access to international buyers and sellers through our worldwide network</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-[#E8F0FB] rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Exclusive Access</h3>
                                        <p className="text-sm text-gray-600">First access to off-market and pre-market luxury listings</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-[#E8F0FB] rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Expert Marketing</h3>
                                        <p className="text-sm text-gray-600">Sophisticated marketing strategies tailored for luxury properties</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                                alt="Luxury Home Interior"
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-[#F4F4F4] text-gray-700">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl font-semibold mb-4">
                        Work with a Luxury Specialist
                    </h2>
                    <p className="text-base mb-8 leading-relaxed text-black/90">
                        Connect with RE/MAX Collection agents who specialize in luxury real estate and deliver thoughtful service at every price point.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <button className="bg-remax-blue text-white px-6 py-3 rounded-lg text-sm font-semibold">
                            FIND A LUXURY AGENT
                        </button>
                        <button className="bg-remax-blue text-white px-6 py-3 rounded-lg text-sm font-semibold">
                            SCHEDULE A CONSULTATION
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
