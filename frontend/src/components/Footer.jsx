import React from "react";
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    
    return (
        <footer 
            className="bg-gradient-to-b from-blue-50 to-slate-100 text-slate-800 pt-12 px-4 md:px-8 bg-cover min-h-[35vh]" 
            id="footer"
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-2xl font-bold mb-4 text-blue-700">{t('footer.title')}</h2>
                        <div className="flex flex-col items-start mb-4">
                            <span className="uppercase text-sm mb-2 text-slate-800">{t('footer.description')}</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 text-blue-600">{t('footer.social')}</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="https://www.instagram.com/shashank_sola/" className="hover:text-blue-600 transition duration-300">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/shashanksola" className="hover:text-blue-600 transition duration-300">
                                    Github
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/shashank-sola/" className="hover:text-blue-600 transition duration-300">
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 text-blue-600">{t('footer.support')}</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="mailto:solashashank1010@gmail.com" target="_blank" className="hover:text-blue-600 transition duration-300">
                                    {t('footer.contact')}
                                </a>
                            </li>
                            <li>
                                <a href="https://drive.google.com/drive/folders/1Dp92XBB8ewhxPe_xPguy7PLMSH4yGHsb" target="_blank" className="hover:text-blue-600 transition duration-300">
                                    {t('footer.dataset')}
                                </a>
                            </li>
                           
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-200 pt-4 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p className="text-slate-800">
                        &copy; 2024 <a href="https://github.com/shashanksola/bird-species-classification-in-natural-habitat?tab=MIT-1-ov-file#readme" target="_blank" className="hover:text-blue-600 transition duration-300">
                            {t('footer.copyright')}
                        </a>
                    </p>
                    <div className="space-x-4 mt-4 md:mt-0">
                        <a href="https://github.com/shashanksola/bird-species-classification-in-natural-habitat/blob/main/CODE_OF_CONDUCT.md" target="_blank" className="hover:text-blue-600 transition duration-300">
                            {t('footer.terms')}
                        </a>
                        <a href="https://github.com/shashanksola/bird-species-classification-in-natural-habitat/blob/main/CODE_OF_CONDUCT.md" target="_blank" className="hover:text-blue-600 transition duration-300">
                            {t('footer.privacy')}
                        </a>
                        <a href="https://github.com/shashanksola/bird-species-classification-in-natural-habitat/blob/main/CODE_OF_CONDUCT.md" target="_blank" className="hover:text-blue-600 transition duration-300">
                            {t('footer.cookies')}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}