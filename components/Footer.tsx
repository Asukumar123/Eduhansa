import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-16 text-sm">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">NeoGyaan</h3>
            <p className="text-muted-foreground text-sm">
              Empowering learners with exam updates, blogs, test series, and downloadable resources. Your one-stop learning platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/examupdates" className="hover:text-foreground block text-muted-foreground">
                  Exam Updates
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground block text-muted-foreground">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/TestSeries" className="hover:text-foreground block text-muted-foreground">
                  Test Series
                </Link>
              </li>
              <li>
                <Link href="/SamplePapers" className="hover:text-foreground block text-muted-foreground">
                  Sample Papers
                </Link>
              </li>
              <li>
                <Link href="/ContactPage" className="hover:text-foreground block text-muted-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-md font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1" /> +91 9876543210
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1" /> support@neogyaan.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" /> Patna, India
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-md font-semibold mb-4">Follow Us</h4>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <Link href="#" className="hover:text-foreground"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-foreground"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-foreground"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-foreground"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-border py-4 px-4 text-center text-muted-foreground text-xs">
        &copy; {new Date().getFullYear()} NeoGyaan. All rights reserved.
      </div>
    </footer>
  );
}
