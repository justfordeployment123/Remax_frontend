"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Search, MapPin, Building, DollarSign, Users, Briefcase } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Commercial() {
    const [currentProperty, setCurrentProperty] = useState(0);
    const router = useRouter();

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
            
            <section className="relative h-screen overflow-hidden">
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full px-4 md:px-8">
                        <div className="max-w-3xl">
                            <div className="flex text-white px-5 py-3 text-xs font-bold mb-8 uppercase tracking-widest flex items-center gap-2">
                                <Building className="w-7 h-5" />
                                Commercial Real Estate
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-white">
                                A better way in
                                <br />
                                <span className="text-[#66a7ff]">commercial real estate</span>
                            </h1>
                            <p className="text-lg md:text-xl mb-10 leading-relaxed text-white/90 max-w-2xl">
                                Find your next property with a RE/MAX Commercial® broker and discover a better way in commercial real estate.
                            </p>
                            <button 
                                onClick={() => router.push('/property?type=commercial')}
                                className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-bold hover:bg-[#003366] transition-all duration-300 hover:shadow-lg"
                            >
                                Search Listings
                            </button>
                        </div>
                    </div>
                </div>
            </section>

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

                        <div className="flex space-x-2">
                            <button
                                onClick={prevProperty}
                                className="w-10 h-10 border border-gray-300 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextProperty}
                                className="w-10 h-10 border border-gray-300 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {commercialProperties.map((property) => (
                            <div key={property.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="relative h-64 overflow-hidden bg-gray-200">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                                        property.status === 'FOR SALE' 
                                            ? 'bg-red-500 text-white' 
                                            : 'bg-blue-600 text-white'
                                    }`}>
                                        <Briefcase className="w-3 h-3" />
                                        {property.status}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="text-2xl font-bold text-gray-900 mb-2">
                                        {property.price}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                        {property.title}
                                    </h3>
                                    <div className="flex items-start text-gray-600 mb-3">
                                        <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-[#00458b]" />
                                        <span className="text-sm">{property.address}</span>
                                    </div>
                                    <div className="flex items-start text-gray-600 mb-3">
                                        <Building className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-[#00458b]" />
                                        <span className="text-sm">{property.type}</span>
                                    </div>
                                    {property.size && (
                                        <div className="flex items-start text-gray-600">
                                            <DollarSign className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-[#00458b]" />
                                            <span className="text-sm">Size: {property.size}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                            <button 
                                onClick={() => {
                                    const params = new URLSearchParams();
                                    params.append('expertise', 'commercial');
                                    router.push(`/find-agent?${params.toString()}`);
                                }}
                                className="bg-[#00458b] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#003366] transition-colors"
                            >
                                Find Your Professional
                            </button>
                        </div>

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

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                alt="Commercial Office"
                                className="w-full h-96 object-cover rounded-lg"
                            />
                        </div>

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
                            <button 
                                onClick={() => router.push('/property?type=commercial')}
                                className="bg-[#00458b] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#003366] transition-colors"
                            >
                                Find an Office
                            </button>
                        </div>
                    </div>
                </div>
            </section>



            <Footer />
        </main>
    );
}