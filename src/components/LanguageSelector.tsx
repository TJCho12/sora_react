import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Globe } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'KR', name: '한국어', flag: '🇰🇷' },
  { code: 'EN', name: 'English', flag: '🇺🇸' },
  { code: 'CH', name: '中文', flag: '🇨🇳' },
  { code: 'JP', name: '日本語', flag: '🇯🇵' }
];

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className="group relative bg-white/80 backdrop-blur-sm border border-pink-200/30 text-gray-600 hover:text-pink-500 hover:border-pink-300/50 p-2.5 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:bg-white/90"
        >
          <Globe className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          {/* Small badge showing current language */}
          <div className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
            {selectedLanguage.code.charAt(0)}
          </div>
        </button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-52 p-3 bg-white/95 backdrop-blur-md border border-pink-200/50 shadow-xl rounded-2xl" 
        align="end"
        sideOffset={12}
      >
        <div className="space-y-1">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                selectedLanguage.code === language.code
                  ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 shadow-sm'
                  : 'hover:bg-gray-50 text-gray-700 hover:text-pink-500'
              }`}
            >
              <span className="text-xl">{language.flag}</span>
              <div className="flex-1">
                <div className="font-medium">{language.code}</div>
                <div className={`text-sm ${
                  selectedLanguage.code === language.code 
                    ? 'text-pink-500' 
                    : 'text-gray-500'
                }`}>
                  {language.name}
                </div>
              </div>
              {selectedLanguage.code === language.code && (
                <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
        
        {/* Elegant bottom border */}
        <div className="mt-3 pt-2 border-t border-pink-100/60">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 px-2">
            <Globe className="w-3 h-3" />
            <span>Select Language</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}