export const metadata = {
    title: 'Development - GODAEON',
    description: 'Follow the development progress of Red Line Nation.',
};

export default function DevelopmentPage() {
    return (
        <div className="container mx-auto px-6 py-24 pb-40">
            <div className="mb-16 border-b border-gray-800 pb-8">
                <h1 className="text-5xl font-bold mb-4">
                    SYSTEM <span className="text-red-600">DEVELOPMENT</span>
                </h1>
                <p className="text-gray-400 max-w-2xl text-lg">
                    Updates are shared regularly through devlogs and social channels.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
                <div className="bg-gray-900 border border-gray-800 p-6 rounded">
                    <div className="text-red-600 text-sm font-bold mb-2">CURRENT STATUS</div>
                    <div className="text-2xl font-bold mb-1">ACTIVE</div>
                    <div className="text-xs text-gray-500 mt-1">Playable Prototype Phase</div>
                </div>
                <div className="bg-gray-900 border border-gray-800 p-6 rounded">
                    <div className="text-red-600 text-sm font-bold mb-2">ENGINE</div>
                    <div className="text-2xl font-bold mb-1">UNREAL 5</div>
                    <div className="text-xs text-gray-500 mt-1">Lumen &amp; Nanite Workflow</div>
                </div>
                <div className="bg-gray-900 border border-gray-800 p-6 rounded">
                    <div className="text-red-600 text-sm font-bold mb-2">PIPELINE</div>
                    <div className="text-2xl font-bold mb-1">OPTIMIZED</div>
                    <div className="text-xs text-gray-500 mt-1">Scalability &amp; Realism Focus</div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-1">
                    <h2 className="text-2xl font-bold mb-6 text-red-600">DEVELOPMENT APPROACH</h2>
                    <p className="text-gray-400 mb-6">We follow a transparent, milestone-based development model:</p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 bg-gray-900 p-4 rounded border border-gray-800">
                            <i className="fas fa-check-circle text-red-600"></i>
                            <span>Prototype-first validation</span>
                        </li>
                        <li className="flex items-center gap-3 bg-gray-900 p-4 rounded border border-gray-800">
                            <i className="fas fa-tachometer-alt text-red-600"></i>
                            <span>Performance and optimization focused</span>
                        </li>
                        <li className="flex items-center gap-3 bg-gray-900 p-4 rounded border border-gray-800">
                            <i className="fas fa-users text-red-600"></i>
                            <span>Iterative design with community feedback</span>
                        </li>
                    </ul>
                </div>

                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-6">MAIN PROJECT</h2>
                    <div className="group relative overflow-hidden bg-gray-900 rounded-lg border border-gray-800 p-8 hover:border-red-600 transition-all duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <i className="fas fa-gamepad text-9xl"></i>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">RED LINE NATION</h3>
                        <p className="text-sm text-red-600 mb-6 font-mono tracking-widest">THE LAST LEADER OF SHADOWS</p>

                        <p className="text-gray-400 mb-6 relative z-10 leading-relaxed">
                            A tactical, story-driven game exploring the unseen structures of power. Currently in active prototyping with core mechanics for bodycam perspective and squad AI being refined.
                        </p>

                        <div className="w-full bg-black rounded-full h-2 mb-4">
                            <div className="bg-red-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 font-mono">
                            <span>PROTOTYPING</span>
                            <span>ALPHA</span>
                            <span>BETA</span>
                            <span>RELEASE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
