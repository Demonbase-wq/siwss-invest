'use client'

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';
import { languages } from "@/lib/utils";
import { useLanguage } from "../Context/LanguageContext";

export function LanguageSelector() {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 px-3 py-2 text-white"
        >
          <span className="text-xl">{currentLanguage.flag}</span>
          <span>{currentLanguage.name}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] bg-primary text-white">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang, lang.code as "en" | "es" | "de" | "fr" | "it")}
            className="flex items-center space-x-2 px-3 py-2 cursor-pointer"
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="text-white">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

