import VideoBackground from '@/components/VideoBackground';
import TypingEffect from '@/components/TypingEffect';

export const metadata = {
    title: 'GODAEON - Red Line Nation',
    description: 'Creating grounded, cinematic, and intelligent game worlds.',
};

export default function HomePage() {
    return (
        <>
            <VideoBackground />

            <section className="hero-section" id="home">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className="text-content-wrapper text-right">
                        <h1 className="hero-title">
                            <TypingEffect text="RED LINE NATION" />
                        </h1>

                        <h2 className="hero-subtitle mb-4 text-xl tracking-widest text-gray-300">
                            Creating grounded, cinematic, and intelligent game worlds.
                        </h2>

                        <div className="border-r-4 border-red-600 pr-6 mb-8 py-2 bg-gradient-to-l from-red-900/20 to-transparent">
                            <h3 className="text-2xl font-bold text-white mb-2">RED LINE NATION</h3>
                            <p className="text-gray-400 italic">
                                &quot;The world saw his death as victory… but darkness has deeper roots.&quot;
                            </p>
                        </div>

                        <div className="flex justify-end gap-4">
                            <a
                                href="https://www.instagram.com/reel/DPhC8qJihML/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-white/30 px-8 py-3 uppercase tracking-widest text-sm hover:border-red-600 hover:text-red-500 transition-colors inline-block"
                            >
                                Watch Trailer
                            </a>
                            <a
                                href="/development"
                                className="bg-red-600 text-black font-bold px-8 py-3 uppercase tracking-widest text-sm hover:bg-white transition-colors"
                            >
                                Follow Development
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
