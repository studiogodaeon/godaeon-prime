export const metadata = {
    title: 'About - GODAEON',
    description: 'Learn about Godaeon game development studio.',
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-6 py-24">
            <h1 className="text-5xl font-bold mb-12 text-center">
                ABOUT <span className="text-red-600">GODAEON</span>
            </h1>

            <div className="max-w-4xl mx-auto mb-20 text-center">
                <h2 className="text-2xl font-bold mb-6 text-red-600 uppercase tracking-widest">Who We Are</h2>
                <p className="text-xl text-white mb-6 leading-relaxed font-light">
                    GODAEON is a next-generation game development studio built with a clear goal: to create original IPs that blend realism, technology, and meaningful storytelling.
                </p>
                <p className="text-gray-400 leading-relaxed">
                    We focus on grounded experiences that respect real-world complexity while remaining entirely fictional and narrative-driven.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <div className="bg-gray-900 p-8 rounded border-l-4 border-red-600">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <i className="fas fa-eye text-red-600"></i> OUR VISION
                    </h2>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-3">
                            <i className="fas fa-chevron-right text-red-600 mt-1 text-xs"></i>
                            <span>Build original, long-term game franchises.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="fas fa-chevron-right text-red-600 mt-1 text-xs"></i>
                            <span>Push realism through smart technology, not gimmicks.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="fas fa-chevron-right text-red-600 mt-1 text-xs"></i>
                            <span>Develop games that challenge players emotionally and tactically.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-gray-900 p-8 rounded border-l-4 border-white">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <i className="fas fa-gem text-white"></i> OUR VALUES
                    </h2>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-3">
                            <i className="fas fa-check text-white mt-1 text-xs"></i>
                            <span><strong className="text-white">Authenticity</strong> over exaggeration.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="fas fa-check text-white mt-1 text-xs"></i>
                            <span><strong className="text-white">Respect</strong> for cultures, beliefs, and people.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="fas fa-check text-white mt-1 text-xs"></i>
                            <span><strong className="text-white">Innovation</strong> through discipline and optimization.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
