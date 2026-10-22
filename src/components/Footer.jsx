
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Camera,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
  Video,
  MessageCircle,
  BriefcaseBusiness,
} from "lucide-react";

import logo from "../assets/logo.png";

// Edit your website information here.
const footerData = {
  company: {
    name: "Heat Shield Engineering",
    logo,
    description:
      "Your engineering partner for dependable solutions, quality products, and professional project support.",
  },

  colors: {
    primary: "#1455A4",
    secondary: "#D92323",
    text: "#172B45",
  },

  cta: {
    badge: "Engineering Excellence",
    title: "Have a project in mind?",
    highlight: "Let's build something reliable.",
    description:
      "Tell us about your requirements. Our team is ready to help you explore the right engineering solution for your project.",
    button: "Get a Quote",
    href: "#contact",
  },

  solutions: [
    { name: "About Us", href: "#about" },
    { name: "Our Services", href: "#services" },
    { name: "Our Products", href: "#products" },
    { name: "Our Projects", href: "#projects" },
  ],

  resources: [
    { name: "Latest Articles", href: "#blog" },
    { name: "Frequently Asked Questions", href: "#faq" },
    { name: "Request a Quote", href: "#contact" },
    { name: "Contact Support", href: "#contact" },
  ],

  contact: {
    email: "info@yourcompany.com",
    emailHref: "mailto:info@yourcompany.com",
    phone: "+880 1000-000000",
    phoneHref: "tel:+8801000000000",
    address: "Add your office address",
  },

  socials: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/",
      Icon: Users,
      color: "hover:bg-blue-600",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/",
      Icon: Camera,
      color:
        "hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/",
      Icon: BriefcaseBusiness,
      color: "hover:bg-sky-700",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/",
      Icon: Video,
      color: "hover:bg-red-600",
    },
  ],

  legal: [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Use", href: "#terms" },
  ],
};

// Reusable footer link column
function FooterColumn({ title, links, accent }) {
  return (
    <div>
      <h3 className="text-base font-extrabold text-[#172B45]">
        {title}
      </h3>

      <div
        className="mt-3 h-1 w-12 rounded-full"
        style={{ backgroundColor: accent }}
      />

      <ul className="mt-6 space-y-4">
        {links.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className="group flex w-fit items-center gap-2 text-sm text-slate-600 transition-all duration-300 hover:translate-x-1"
              style={{ "--footer-accent": accent }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = accent)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "")
              }
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
              {item.name}
              <ArrowUpRight
                size={14}
                className="opacity-0 transition group-hover:opacity-100"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const { company, colors, cta, solutions, resources, contact, socials, legal } =
    footerData;

  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-gradient-to-br from-white via-[#F5F8FF] to-[#FFF7F7] text-[#172B45]">
      {/* Decorative backgrounds */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-red-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* CTA */}
        <section className="border-b border-slate-200/80 py-12 sm:py-14 lg:py-16">
          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              
<div
  className="group relative mb-4 inline-flex items-center gap-2 overflow-hidden rounded-full border bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
  style={{
    color: colors.primary,
    borderColor: `${colors.primary}30`,
  }}
>
  {/* Animated shimmer */}
  <span className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-blue-100/70 to-transparent" />

  {/* Pulsing shield */}
  <span className="relative flex items-center justify-center">
    <span className="absolute h-5 w-5 animate-ping rounded-full bg-blue-400/30" />
    <ShieldCheck
      size={16}
      className="relative animate-[shieldFloat_2.5s_ease-in-out_infinite]"
    />
  </span>

  {/* Animated text */}
  <span className="relative bg-gradient-to-r from-[#1455A4] via-blue-500 to-[#D92323] bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradientMove_4s_ease_infinite]">
    {cta.badge}
  </span>
</div>

              <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
                {cta.title}
                <span
                  className="mt-1 block bg-gradient-to-r from-[#1455A4] via-blue-600 to-[#D92323] bg-clip-text text-transparent"
                >
                  {cta.highlight}
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                {cta.description}
              </p>
            </div>

            <a
              href={cta.href}
              className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-xl px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ backgroundColor: colors.primary }}
            >
              {cta.button}
              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </a>
          </div>
        </section>

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-16">
          {/* Company */}
          <div>
            <a href="#home" className="group inline-flex items-center gap-3">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-slate-200/80 transition duration-300 group-hover:-translate-y-1">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-14 w-14 object-contain"
                />
              </span>

              <span
                className="max-w-[190px] bg-gradient-to-r from-[#1455A4] to-[#D92323] bg-clip-text text-lg font-extrabold leading-tight text-transparent"
              >
                {company.name}
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
              {company.description}
            </p>

            <div className="mt-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                Connect with us
              </p>

              <div className="flex flex-wrap gap-3">
                {socials.map(({ name, href, Icon, color }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${company.name} on ${name}`}
                    title={name}
                    className={`group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:text-white ${color}`}
                  >
                    <Icon
                      size={19}
                      className="transition-transform group-hover:scale-110"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          <FooterColumn
            title="Solutions"
            links={solutions}
            accent={colors.primary}
          />

          <FooterColumn
            title="Resources"
            links={resources}
            accent={colors.secondary}
          />

          {/* Contact */}
          <div>
            <h3 className="text-base font-extrabold">Get in Touch</h3>

            <div
              className="mt-3 h-1 w-12 rounded-full"
              style={{
                background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
              }}
            />

            <p className="mt-5 text-sm leading-7 text-slate-600">
              Have a question or planning a project? We'd love to hear from you.
            </p>

            <ul className="mt-5 space-y-4">
              <ContactItem
                Icon={Mail}
                label="Email us"
                value={contact.email}
                href={contact.emailHref}
                accent={colors.primary}
              />

              <ContactItem
                Icon={Phone}
                label="Call us"
                value={contact.phone}
                href={contact.phoneHref}
                accent={colors.secondary}
              />

              <li className="flex items-center gap-3 rounded-xl p-2">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50"
                  style={{ color: colors.primary }}
                >
                  <MapPin size={19} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-slate-500">
                    Our location
                  </span>
                  <span className="mt-1 block text-sm font-semibold">
                    {contact.address}
                  </span>
                </span>
              </li>

              <li>
                <a
                  href={cta.href}
                  className="mt-2 inline-flex items-center gap-2 text-sm font-bold transition-colors hover:opacity-75"
                  style={{ color: colors.primary }}
                >
                  <MessageCircle size={17} />
                  Talk to our team
                  <ArrowRight size={15} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-slate-200 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-500">
            © {currentYear}{" "}
            <span
              className="bg-gradient-to-r from-[#1455A4] to-[#D92323] bg-clip-text font-bold text-transparent"
            >
              {company.name}
            </span>
            . All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {legal.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-500 transition-colors hover:text-[#1455A4]"
              >
                {item.name}
              </a>
            ))}

            <button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-semibold shadow-sm transition-all duration-300 hover:-translate-y-1 hover:text-white"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
              }}
            >
              Back to top
              <ArrowUp
                size={16}
                className="transition-transform group-hover:-translate-y-1"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactItem({ Icon, label, value, href, accent }) {
  return (
    <li>
      <a
        href={href}
        className="group -ml-2 flex items-center gap-3 rounded-xl p-2 transition-all duration-300 hover:bg-white hover:shadow-md"
      >
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 transition-colors group-hover:text-white"
          style={{ color: accent }}
        >
          <Icon size={19} />
        </span>

        <span className="min-w-0">
          <span className="block text-xs text-slate-500">{label}</span>
          <span className="mt-1 block break-words text-sm font-semibold">
            {value}
          </span>
        </span>
      </a>
    </li>
  );
}

export default Footer;
