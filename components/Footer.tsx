import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa6";

const popularTours = [
  "Golden Triangle Tours",
  "Honeymoon Tours",
  "Jungle Safari",
  "Wildlife Tours",
  "Winter Holidays",
  "Luxury Train Tours",
  "Himalaya Tours",
  "Adventure Tours",
  "Pilgrimage Tours",
  "Cruise Holidays",
  "Summer Holidays",
  "Family Holidays",
  "Trekking Tour",
  "Camping Tour",
  "Architecture Tour",
];

const terms = [
  "Payment Policy",
  "Refund Policy",
  "Liabilities & Limitations",
];

const socials = [
  { Icon: FaFacebookF, label: "Facebook" },
  { Icon: FaXTwitter, label: "Twitter" },
  { Icon: FaLinkedinIn, label: "LinkedIn" },
  { Icon: FaInstagram, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <span
              className="text-2xl font-light tracking-[0.25em] text-white"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              APOLLO
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Bespoke luxury journeys across India, crafted for travellers
              seeking elegance, culture, and unforgettable experiences.
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, label }) => (
                <span
                  key={label}
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300"
                >
                  <Icon size={18} />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
              Recommended &amp; Popular Tours
            </h3>
            <ul className="flex flex-wrap gap-2">
              {popularTours.map((tour) => (
                <li key={tour}>
                  <span className="inline-block rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                    {tour}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
              Terms &amp; Conditions
            </h3>
            <ul className="mb-8 space-y-3 text-sm">
              {terms.map((item) => (
                <li key={item} className="text-slate-300">
                  &rsaquo; {item}
                </li>
              ))}
            </ul>

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
              Get In Touch With Us
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#D4AF37]" />
                36, Yashwant Place, Chanakyapuri, New Delhi – 110021, India
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-[#D4AF37]" />
                +91 11 2467 7515
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-[#D4AF37]" />
                info@apollovoyages.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="mx-auto max-w-7xl px-6 text-center text-xs text-slate-500 lg:px-8">
          © {new Date().getFullYear()} Apollo Voyages (India) Ltd. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
