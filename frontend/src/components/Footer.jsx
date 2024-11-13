export default function Footer() {
    return (
        <footer className="bg-black text-white py-12 px-4 md:px-8 bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/layered-steps-haikei-invert.svg')] bg-cover min-h-[45vh]" id="footer">
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
                            <li><a href="mailto:solashashank1010@gmail.com" target="_blank">Contact</a></li>
                            <li><a href="https://drive.google.com/drive/folders/1Dp92XBB8ewhxPe_xPguy7PLMSH4yGHsb" target="_blank">Checkout our Dataset</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white pt-4 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; 2024 <a href="https://github.com/shashanksola/bird-species-classification-in-natural-habitat?tab=MIT-1-ov-file#readme" target="_blank">Shashank Sola</a></p>
                    <div className="space-x-4 mt-4 md:mt-0">
                        <a href="https://github.com/shashanksola/bird-species-classification-in-natural-habitat/blob/main/CODE_OF_CONDUCT.md" target="_blank">Creator Terms</a>
                        <a href="https://github.com/shashanksola/bird-species-classification-in-natural-habitat/blob/main/CODE_OF_CONDUCT.md" target="_blank">Privacy Policy</a>
                        <a href="https://github.com/shashanksola/bird-species-classification-in-natural-habitat/blob/main/CODE_OF_CONDUCT.md" target="_blank">Cookies Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}