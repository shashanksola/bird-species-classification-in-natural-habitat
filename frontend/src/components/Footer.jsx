export default function Footer() {
    return (
        <footer className="bg-black text-white py-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-2xl font-bold mb-4">Birdz</h2>
                        <div className="flex items-center mb-4">
                            <span className="uppercase text-sm">Bird species classification</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Social</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="https://www.instagram.com/shashank_sola/">Instagram</a></li>
                            <li><a href="https://github.com/shashanksola">Github</a></li>
                            <li><a href="https://www.linkedin.com/in/shashank-sola/">LinkedIn</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/faq">FAQ</a></li>
                            <li><a href="/help">Help Centre</a></li>
                            <li><a href="/careers">Careers</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/acceptable-use">Acceptable Use</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; 2024 <a href="https://github.com/shashanksola/bird-species-classification-in-natural-habitat?tab=MIT-1-ov-file#readme" target="_blank">Shashank Sola</a></p>
                    <div className="space-x-4 mt-4 md:mt-0">
                        <a href="/creator-terms">Creator Terms</a>
                        <a href="/privacy-policy">Privacy Policy</a>
                        <a href="/cookies-policy">Cookies Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}