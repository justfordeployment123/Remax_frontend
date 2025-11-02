"use client";
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, MapPin, Building, DollarSign, Users, Briefcase } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Commercial() {
    const [currentProperty, setCurrentProperty] = useState(0);

    const commercialProperties = [
        {
            id: 1,
            price: "$1,100,000",
            title: "3.61 Acres New Berlin",
            address: "9025 Farm to Market 775, New Berlin, TX 78155",
            type: "SHOPPING CENTER / RETAIL, VACANT LAND",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            status: "FOR SALE"
        },
        {
            id: 2,
            price: "$10,500,000",
            title: "Chase Plaza",
            address: "2333 Lake Avenue, Altadena, CA 91001",
            type: "OFFICE, OFFICE RETAIL",
            size: "26,249 SF",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            status: "FOR SALE"
        },
        {
            id: 3,
            price: "$120.00 sf/yr",
            title: "402 S Richland Creek Dr Suite A",
            address: "402 South Richland Creek Drive, Princeton, IN 47670",
            type: "OFFICE",
            size: "3,200 SF",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
            status: "FOR LEASE"
        }
    ];

    const nextProperty = () => {
        setCurrentProperty((prev) => (prev + 1) % commercialProperties.length);
    };

    const prevProperty = () => {
        setCurrentProperty((prev) => (prev - 1 + commercialProperties.length) % commercialProperties.length);
    };

    return (
        <main className="min-h-screen bg-white">
            <Header />
            
            {/* Enhanced Hero Section */}
            <section className="relative h-screen overflow-hidden">
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Enhanced Left Content */}
                            <div className="text-white">
                                <div className="inline-block bg-[#00458b] text-white px-4 py-2 rounded-full text-xs font-semibold mb-5 uppercase tracking-wide">
                                    🏢 Commercial Real Estate
                                </div>
                                <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
                                    A better way in
                                    <br />
                                    <span className="text-[#66a7ff]">commercial real estate</span>
                                </h1>
                                <p className="text-base md:text-lg mb-6 leading-relaxed text-white/85">
                                    Find your next property with a RE/MAX Commercial® broker and discover a better way in commercial real estate.
                                </p>
                                <button className="bg-[#00458b] text-white px-6 py-3 rounded-lg text-sm font-semibold">
                                    Search Listings
                                </button>
                            </div>

                            {/* Enhanced Right Content - Property Card */}
                            <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md mx-auto lg:mx-0">
                                <div className="relative mb-6">
                                    <img
                                        src={commercialProperties[currentProperty].image}
                                        alt={commercialProperties[currentProperty].title}
                                        className="w-full h-48 object-cover rounded-xl"
                                    />
                                    <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold ${
                                        commercialProperties[currentProperty].status === 'FOR SALE' 
                                            ? 'bg-red-500 text-white' 
                                            : 'bg-remax-blue text-white'
                                    }`}>
                                        {commercialProperties[currentProperty].status}
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="text-2xl font-semibold text-gray-900">
                                        {commercialProperties[currentProperty].price}
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-800">
                                        {commercialProperties[currentProperty].title}
                                    </h3>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span className="text-sm">{commercialProperties[currentProperty].address}</span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {commercialProperties[currentProperty].type}
                                    </div>
                                    {commercialProperties[currentProperty].size && (
                                        <div className="text-sm text-gray-600">
                                            Building Size: {commercialProperties[currentProperty].size}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Commercial Properties Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
                        <div>
                            <div className="text-red-600 text-xs font-semibold uppercase tracking-wide mb-2">
                                Featured
                            </div>
                            <h2 className="text-3xl font-semibold text-gray-900">
                                Commercial Properties
                            </h2>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex space-x-2">
                            <button
                                onClick={prevProperty}
                                className="w-10 h-10 border border-gray-300 text-gray-700 rounded-full flex items-center justify-center"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextProperty}
                                className="w-10 h-10 border border-gray-300 text-gray-700 rounded-full flex items-center justify-center"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {commercialProperties.map((property) => (
                            <div key={property.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                                <div className="relative">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
                                        property.status === 'FOR SALE' 
                                            ? 'bg-red-500 text-white' 
                                            : 'bg-blue-600 text-white'
                                    }`}>
                                        {property.status}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="text-xl font-semibold text-gray-900 mb-2">
                                        {property.price}
                                    </div>
                                    <h3 className="text-base font-medium text-gray-800 mb-3">
                                        {property.title}
                                    </h3>
                                    <div className="flex items-start text-gray-600 mb-3">
                                        <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                                        <span className="text-sm">{property.address}</span>
                                    </div>
                                    <div className="text-sm text-gray-600 mb-2">
                                        {property.type}
                                    </div>
                                    {property.size && (
                                        <div className="text-sm text-gray-600">
                                            Building Size: {property.size}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Professionals Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div>
                            <div className="text-red-600 text-xs font-semibold uppercase tracking-wide mb-2">
                                Professionals
                            </div>
                            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                                Search Commercial Brokers
                            </h2>
                            <p className="text-base text-gray-600 leading-relaxed mb-6">
                                Whatever the property or transaction, RE/MAX Commercial delivers awareness, trust, and confidence that is unmatched. Find a RE/MAX Commercial broker or let us connect you with the perfect fit for your needs.
                            </p>
                            <button className="bg-[#00458b] text-white px-6 py-3 rounded-lg text-sm font-semibold">
                                Find Your Professional
                            </button>
                        </div>

                        {/* Right Image */}
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                alt="Commercial Building"
                                className="w-full h-96 object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Offices Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Image */}
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                alt="Commercial Office"
                                className="w-full h-96 object-cover rounded-lg"
                            />
                        </div>

                        {/* Right Content */}
                        <div>
                            <div className="text-red-600 text-xs font-semibold uppercase tracking-wide mb-2">
                                Offices
                            </div>
                            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                                RE/MAX Commercial Offices
                            </h2>
                            <p className="text-base text-gray-600 leading-relaxed mb-6">
                                Find the right footprint for your commercial ambitions. A dedicated RE/MAX Commercial office helps you navigate the industry and focus on the best sector for your investment—from first handshake to final signature.
                            </p>
                            <button className="bg-[#00458b] text-white px-6 py-3 rounded-lg text-sm font-semibold">
                                Find an Office
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div>
                            <div className="text-red-600 text-xs font-semibold uppercase tracking-wide mb-2">
                                Support
                            </div>
                            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                                Giving Back
                            </h2>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Children's Miracle Network Hospitals®
                            </h3>
                            <p className="text-base text-gray-600 leading-relaxed">
                                RE/MAX® is built on a culture of giving. For over 32 years, RE/MAX has partnered with Children's Miracle Network Hospitals to change kids' health and support communities worldwide, including initiatives in the UAE.
                            </p>
                        </div>

                        {/* Right Image */}
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                alt="Children's Hospital"
                                className="w-full h-96 object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}