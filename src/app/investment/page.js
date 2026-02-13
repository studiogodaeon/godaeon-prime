export const metadata = {
    title: 'Investment - GODAEON',
    description: 'Strategic investment opportunities with Godaeon studio.',
};

export default function InvestmentPage() {
    return (
        <div className="container mx-auto px-6 py-24 pb-40">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-800 pb-8">
                <div>
                    <h1 className="text-5xl font-bold mb-4">
                        STRATEGIC <span className="text-red-600">INVESTMENT</span>
                    </h1>
                    <p className="text-gray-400 text-lg">Scaling responsibly while maintaining creative control.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <h2 className="text-3xl font-bold mb-8">
                        WE ARE <span className="text-red-600">OPEN TO</span>
                    </h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 bg-gray-900 rounded border border-gray-800">
                            <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center shrink-0">
                                <i className="fas fa-handshake text-red-500"></i>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-1">Strategic Partners</h4>
                                <p className="text-gray-400">Collaboration with entities that bring technical or market expertise.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-gray-900 rounded border border-gray-800">
                            <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center shrink-0">
                                <i className="fas fa-seedling text-red-500"></i>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-1">Early-Stage Investors</h4>
                                <p className="text-gray-400">Funding partners who understand the long-term value of original IP.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-gray-900 rounded border border-gray-800">
                            <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center shrink-0">
                                <i className="fas fa-bullhorn text-red-500"></i>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-1">Publishing Discussions</h4>
                                <p className="text-gray-400">Partnerships to bring Red Line Nation to a global audience.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded border border-gray-800 text-center">
                    <h3 className="text-2xl font-bold mb-4">INVESTMENT GOALS</h3>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Our primary objective is to build original, long-term game franchises. We aim to scale our operations responsibly while ensuring we maintain creative control and 100% IP ownership.
                    </p>

                    <div className="bg-black p-6 rounded border border-red-600/30">
                        <i className="fas fa-file-invoice-dollar text-4xl text-white mb-4"></i>
                        <h4 className="text-lg font-bold mb-2">REQUEST DECK</h4>
                        <p className="text-sm text-gray-500 mb-6">For detailed investment decks and financial projections.</p>
                        <a href="/contact" className="inline-block w-full bg-red-600 text-black font-bold py-3 uppercase tracking-widest hover:bg-white hover:text-red-600 transition-colors">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
