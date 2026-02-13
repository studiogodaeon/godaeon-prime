export const metadata = {
    title: 'Contact - GODAEON',
    description: 'Get in touch with Godaeon studio for business, press, or investment inquiries.',
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-6 py-24 pb-40">
            <h1 className="text-5xl font-bold mb-12 text-center">
                GET IN <span className="text-red-600">TOUCH</span>
            </h1>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div>
                    <p className="text-xl text-gray-300 mb-8">For business, press, development, or investment inquiries.</p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 bg-gray-900 p-6 rounded border-l-4 border-red-600">
                            <i className="fas fa-envelope text-2xl text-red-600"></i>
                            <div>
                                <h3 className="font-bold text-sm text-gray-400 uppercase">Email</h3>
                                <p className="text-lg">official studio contact</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-gray-900 p-6 rounded border-l-4 border-white">
                            <i className="fas fa-share-alt text-2xl text-white"></i>
                            <div>
                                <h3 className="font-bold text-sm text-gray-400 uppercase">Social Media</h3>
                                <div className="flex gap-4 mt-2 text-xl">
                                    <a href="https://www.instagram.com/godaeon_studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-red-600" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                    <a href="https://www.youtube.com/@GODAEON_STUDIO" className="hover:text-red-600" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-youtube"></i>
                                    </a>
                                    <a href="https://www.linkedin.com/company/godaeon-studio/" className="hover:text-red-600" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-linkedin"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 p-8 rounded border border-gray-800">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 uppercase text-gray-400">Name</label>
                            <input type="text" className="w-full bg-black border border-gray-700 p-3 text-white focus:border-red-600 outline-none transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 uppercase text-gray-400">Subject</label>
                            <select className="w-full bg-black border border-gray-700 p-3 text-white focus:border-red-600 outline-none transition-colors">
                                <option>General Inquiry</option>
                                <option>Investment / Partnership</option>
                                <option>Press</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 uppercase text-gray-400">Message</label>
                            <textarea rows="5" className="w-full bg-black border border-gray-700 p-3 text-white focus:border-red-600 outline-none transition-colors"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-red-600 text-black font-bold py-3 uppercase tracking-widest hover:bg-white hover:text-red-600 transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
