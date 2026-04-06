export default function Navbar(){
    return (
        <nav className="fixed inset-x-0 top-0 h-[68px] bg-[#0b132b]">
            <div className="flex justify-between items-center h-full px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex items-center space-x-1 cursor-pointer">
                    <img
                        src="/public/OpenAI-Logos-2025/OpenAI-logos(new)/PNGs/OpenAI-white-wordmark.png"
                        alt="AI Chat Wrapper"
                        className="w-35 h-15"
                    />
                    <span className="text-lg sm:text-xl font-medium">| AI Chat Wrapper</span>
                </div>
                <div className="flex items-center justify-center h-full">
                    <img
                        src="/src/assets/chiemsee2024-cat-1192026.jpg"
                        alt="ProfilePicture"
                        className="w-12 h-12 rounded-full border-2 border-white"
                    />
                </div>
            </div>
        </nav>
    );
}