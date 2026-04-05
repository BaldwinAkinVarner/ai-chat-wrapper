export default function Navbar(){
    return <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-rose-950/20 backdrop-blur-5m">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h14 sm:h-16 md:h-20">
                <div className="flex items-center space-x-1 group cursor-pointer ">
                    <div>
                        <img src="/src/assets/react.svg" alt="WebsiteName" className="w-6 h-6 sm: w-8 h-8"/>
                    </div>
                    <span className="text-lg sm:text-xl md:2xl font-medium">
                        <span>Website</span>
                        <span>Name</span>
                    </span>
                </div>
                <div>
                    <img src="/src/assets/vite.svg" alt="ProfilePicture" className="w-12 h-12 rounded-full border-3"/>
                </div>
            </div>
        </div>
    </nav>;
}