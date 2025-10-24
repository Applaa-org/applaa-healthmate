import { Link } from '@tanstack/react-router';
import { Heart, Menu, Mic, Settings } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-pink-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
                HealthMate
              </h1>
              <p className="text-sm text-gray-500">For Seniors</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-pink-600 transition-colors font-medium text-lg"
            >
              Home
            </Link>
            <button
              onClick={() => {}}
              className="text-gray-700 hover:text-pink-600 transition-colors font-medium text-lg"
            >
              Health Conditions
            </button>
            <button
              onClick={() => {}}
              className="text-gray-700 hover:text-pink-600 transition-colors font-medium text-lg"
            >
              Exercises
            </button>
            <button
              onClick={() => {}}
              className="text-gray-700 hover:text-pink-600 transition-colors font-medium text-lg"
            >
              Recipes
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-pink-100"
              aria-label="Voice input"
            >
              <Mic className="w-5 h-5 text-pink-600" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-pink-100"
                >
                  <Settings className="w-5 h-5 text-pink-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Text Size</DropdownMenuItem>
                <DropdownMenuItem>Voice Settings</DropdownMenuItem>
                <DropdownMenuItem>Reminders</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full hover:bg-pink-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5 text-pink-600" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-pink-100">
            <nav className="flex flex-col space-y-3 pt-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-pink-600 transition-colors font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <button
                onClick={() => {}}
                className="text-gray-700 hover:text-pink-600 transition-colors font-medium text-lg text-left"
              >
                Health Conditions
              </button>
              <button
                onClick={() => {}}
                className="text-gray-700 hover:text-pink-600 transition-colors font-medium text-lg text-left"
              >
                Exercises
              </button>
              <button
                onClick={() => {}}
                className="text-gray-700 hover:text-pink-600 transition-colors font-medium text-lg text-left"
              >
                Recipes
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}