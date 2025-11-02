"use client";
import { useEffect } from 'react';

export default function Global() {
    useEffect(() => {
        // Redirect to RE/MAX Global website
        window.location.href = 'https://global.remax.com/';
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center max-w-2xl mx-auto px-6">
                <div className="bg-white rounded-3xl shadow-2xl p-12">
                    <div className="inline-block bg-remax-blue text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        🌍 Global Network
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                        <span className="text-remax-blue">RE/MAX Global</span> Network
                    </h1>
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-remax-blue border-t-transparent mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 mb-8">Redirecting to RE/MAX Global...</p>
                    <div className="bg-remax-blue/10 rounded-xl p-6">
                        <p className="text-gray-700">
                            You're being redirected to our global platform where you can explore 
                            real estate opportunities worldwide.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}