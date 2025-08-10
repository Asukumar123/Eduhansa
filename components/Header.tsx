"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  Menu,
  X,
  FileText,
  FileDown,
  Newspaper,
  Phone,
  BookMarkedIcon,
  NotebookText,
  GraduationCap,
  Keyboard,
  Mic,
  Video,
  MessageSquare,
  Users,
  Code,
  Briefcase,
  FileSignature,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "@/components/DarkModeToggle";
import { SearchInput } from "./SearchInput";

const servicesDropdown = [
  { title: "Typing Practice", href: "/services/typing", icon: <Keyboard className="h-4 w-4 mr-2" /> },
  { title: "Education Podcast", href: "/services/podcast", icon: <Mic className="h-4 w-4 mr-2" /> },
  { title: "Notes", href: "/services/notes", icon: <FileText className="h-4 w-4 mr-2" /> },
  { title: "Live Classes", href: "/services/live-classes", icon: <Video className="h-4 w-4 mr-2" /> },
  { title: "Mock Interviews", href: "/services/interviews", icon: <MessageSquare className="h-4 w-4 mr-2" /> },
  { title: "Doubt Solving", href: "/services/doubt", icon: <Users className="h-4 w-4 mr-2" /> },
  { title: "Career Counselling", href: "/services/counselling", icon: <GraduationCap className="h-4 w-4 mr-2" /> },
  { title: "Coding Practice", href: "/services/coding", icon: <Code className="h-4 w-4 mr-2" /> },
  { title: "Internship Portal", href: "/services/internship", icon: <Briefcase className="h-4 w-4 mr-2" /> },
  { title: "Resume Builder", href: "/services/resume", icon: <FileSignature className="h-4 w-4 mr-2" /> },
  { title: "Job Updates", href: "/services/jobs", icon: <Bell className="h-4 w-4 mr-2" /> },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Search */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/src/logo.png" alt="logo" width={50} height={50} />
              <span className="text-xl font-extrabold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent tracking-tight">
                Eduhansa
              </span>
            </Link>
            <div className="hidden md:block w-64">
              <SearchInput />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
            <NavItem href="/blogs" icon={<Newspaper className="h-4 w-4" />}>Blogs</NavItem>
            <NavItem href="/TestSeries" icon={<FileText className="h-4 w-4" />}>Test Series</NavItem>
            <NavItem href="/Ebooks" icon={<NotebookText className="h-4 w-4" />}>Ebooks</NavItem>
            <NavItem href="/ContactPage" icon={<Phone className="h-4 w-4" />}>Contact Us</NavItem>
            <NavDropdown title="Services" items={servicesDropdown} />
            <NavItem href="/my-courses" icon={<BookMarkedIcon className="h-4 w-4" />} border>My Courses</NavItem>

            <div className="flex items-center gap-2">
              <DarkModeToggle />
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" size="sm">Sign In</Button>
                </SignInButton>
              </SignedOut>
            </div>
          </nav>

          {/* Hamburger for Mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-2">
          <NavItem href="/blogs" icon={<Newspaper className="h-4 w-4" />} mobile>Blogs</NavItem>
          <NavItem href="/TestSeries" icon={<FileText className="h-4 w-4" />} mobile>Test Series</NavItem>
          <NavItem href="/Ebooks" icon={<FileDown className="h-4 w-4" />} mobile>Ebooks</NavItem>
          <NavItem href="/ContactPage" icon={<Phone className="h-4 w-4" />} mobile>Contact Us</NavItem>
          <NavItem href="/my-courses" icon={<BookMarkedIcon className="h-4 w-4" />} mobile border>My Courses</NavItem>

          {/* Services Dropdown in Mobile */}
          <div>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center gap-2 w-full px-2 py-2 hover:text-foreground transition-colors"
            >
              <span className="font-medium">Services</span>
              <span>{mobileServicesOpen ? "▲" : "▼"}</span>
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 space-y-1">
                {servicesDropdown.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="flex items-center px-3 py-2 rounded-md text-sm hover:bg-muted transition"
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

// Nav Item Component
function NavItem({ href, icon, children, border = false, mobile = false }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 ${
        border ? "border border-border rounded-md px-3 py-2" : "px-2 py-2"
      } ${mobile ? "w-full" : ""} hover:text-foreground transition-colors`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

// Nav Dropdown Component (Bug-Free)
function NavDropdown({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        {title} <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="absolute left-0 z-50 mt-2 w-60 rounded-md border bg-background p-2 shadow-md">
          {items.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="block px-3 py-2 rounded-md text-sm hover:bg-muted transition"
            >
              <div className="flex items-center gap-2">
                {item.icon}
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
