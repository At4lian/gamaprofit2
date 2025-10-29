"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  ChevronRight,
  Building2,
  FileText,
  Calculator,
  ShieldCheck,
  Users,
  ReceiptText,
  Cloud,
  Landmark,
  CalendarCheck2,
} from "lucide-react";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

// ------------------------------------------------------------
// Global finance-first theme tokens (CSS variables)
// ------------------------------------------------------------
function GlobalStyles() {
  return (
    <style jsx global>{`
      :root {
        --gp-primary: #0A5BD3;        /* cobalt */
        --gp-primary-600: #094BB0;    
        --gp-ink: #0D1B2A;            /* navy ink */
        --gp-accent: #11A36A;         /* profit green */
        --gp-surface: #F6F8FB;        /* light surface */
        --gp-border: #E5E7EB;         /* border neutral */
        --gp-muted: #6B7280;          /* text secondary */
        --gp-tint-1: rgba(10,91,211,.08);
        --gp-tint-2: rgba(17,163,106,.08);
        --gp-grid: rgba(13,27,42,.06);
      }
      .dark {
        --gp-primary: #6BA4FF;
        --gp-primary-600: #4E85E0;
        --gp-ink: #EAF2FF;
        --gp-accent: #2DD39E;
        --gp-surface: #0B1220;
        --gp-border: #1E293B;
        --gp-muted: #9CA3AF;
        --gp-tint-1: rgba(107,164,255,.12);
        --gp-tint-2: rgba(45,211,158,.12);
        --gp-grid: rgba(255,255,255,.06);
      }
      /* Utilities bound to tokens */
      .gp-btn-primary{ background: var(--gp-primary); color:#fff; }
      .gp-btn-primary:hover{ filter: brightness(0.95); }
      .gp-brand{ background: var(--gp-primary); color:#fff; }
      .gp-chip{ background: var(--gp-surface); border:1px solid var(--gp-border); color: var(--gp-ink); }
      .gp-card{ border-color: var(--gp-border); }
      .gp-ink{ color: var(--gp-ink); }
      .gp-kpi{ font-variant-numeric: tabular-nums; }
      .gp-gradient-bar{ background: linear-gradient(90deg,var(--gp-tint-1),var(--gp-tint-2)); }
      .gp-hero-bubble{ background: radial-gradient(ellipse at center, rgba(10,91,211,0.18), transparent 60%); }
      .gp-grid-spot{ background-image: repeating-linear-gradient(0deg, var(--gp-grid), var(--gp-grid) 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, var(--gp-grid), var(--gp-grid) 1px, transparent 1px, transparent 24px); }
    `}</style>
  );
}

// ------------------------------------------------------------
// Home Page — GamaProfit (Redesign 2025)
// - Financial visuals: cobalt + profit green accents, grid overlays, tabular numerals
// - Removed framer-motion to avoid sandbox error; pure-CSS animations/gradients
// ------------------------------------------------------------

export default function Home() {
  React.useEffect(() => {
    // --- simple runtime tests (dev-only) ---
    if (process.env.NODE_ENV === "production") return;
    const styles = getComputedStyle(document.documentElement);
    const colors = ["--gp-primary", "--gp-ink", "--gp-accent"]; 
    colors.forEach((c) => console.assert(styles.getPropertyValue(c).trim() !== "", `Missing token ${c}`));

    // Contrast tests (AA >= 4.5 for normal text)
    const hex = (v:string) => {
      const s = styles.getPropertyValue(v).trim();
      // parse rgb or hex
      if (s.startsWith("#")) return s;
      const m = s.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/i);
      if (!m) return "#000000";
      const toHex = (n:number) => n.toString(16).padStart(2,"0");
      return `#${toHex(+m[1])}${toHex(+m[2])}${toHex(+m[3])}`;
    };
    const lum = (hexColor:string) => {
      const c = hexColor.replace("#",""), r = parseInt(c.substring(0,2),16)/255, g = parseInt(c.substring(2,4),16)/255, b = parseInt(c.substring(4,6),16)/255;
      const srgb = [r,g,b].map((v)=> v<=0.03928? v/12.92 : Math.pow(((v+0.055)/1.055),2.4));
      return 0.2126*srgb[0]+0.7152*srgb[1]+0.0722*srgb[2];
    };
    const contrast = (fg:string,bg:string) => {
      const L1 = lum(fg), L2 = lum(bg); const ratio = (Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05); return ratio;
    };
    const white = "#ffffff";
    console.assert(contrast(hex("--gp-ink"), white) >= 4.5, "Ink on white should pass AA");
    console.assert(contrast(white, hex("--gp-primary")) >= 4.5, "White on primary should pass AA");
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      <GlobalStyles />
      <Header />
      <main>
        <AnnouncementBar />
        <Hero />
        <TrustStrip />
        <Services />
        <Process />
        <USP />
        <Testimonials />
        <DownloadsCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

// ------------------------------------------------------------
// Header & Navigation
// ------------------------------------------------------------
function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80" style={{borderColor: "var(--gp-border)"}}>
      <TopUtility />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2" aria-label="GamaProfit — domů">
            <div className="grid h-10 w-10 place-items-center rounded-xl gp-brand">
              <span className="font-bold">GP</span>
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">GamaProfit</p>
              <p className="text-xs" style={{color: "var(--gp-muted)"}}>Účetnictví • Mzdy • Daně</p>
            </div>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink href="#sluzby">Služby</NavLink>
          <NavLink href="#proces">Jak pracujeme</NavLink>
          <NavLink href="#reference">Reference</NavLink>
          <NavLink href="#stazeni">Ke stažení</NavLink>
          <NavLink href="#kontakt">Kontakt</NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:+420000000000" className="text-sm font-medium transition-colors" style={{color:"var(--gp-ink)"}}>
            <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> +420 000 000 000</span>
          </a>
          <Link href="#kontakt">
            <Button className="gp-btn-primary rounded-xl px-5" size="sm">
              Nezávazná konzultace
            </Button>
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-xl" style={{borderColor:"var(--gp-border)"}}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="mt-8 flex flex-col gap-4">
                <MobileNavLink href="#sluzby">Služby</MobileNavLink>
                <MobileNavLink href="#proces">Jak pracujeme</MobileNavLink>
                <MobileNavLink href="#reference">Reference</MobileNavLink>
                <MobileNavLink href="#stazeni">Ke stažení</MobileNavLink>
                <MobileNavLink href="#kontakt">Kontakt</MobileNavLink>
                <Link href="#kontakt">
                  <Button className="gp-btn-primary mt-2 w-full rounded-xl">Nezávazná konzultace</Button>
                </Link>
                <div className="mt-6 grid gap-2 text-sm" style={{color:"var(--gp-muted)"}}>
                  <a href="tel:+420000000000" className="inline-flex items-center gap-2 hover:opacity-80">
                    <Phone className="h-4 w-4" /> +420 000 000 000
                  </a>
                  <a href="mailto:info@gamaprofit.cz" className="inline-flex items-center gap-2 hover:opacity-80">
                    <Mail className="h-4 w-4" /> info@gamaprofit.cz
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function TopUtility() {
  return (
    <div className="hidden gp-gradient-bar text-xs md:block" style={{borderBottom:"1px solid var(--gp-border)", color:"var(--gp-ink)"}}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Nepomuk • Plzeňsko</span>
          <span className="inline-flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> ID datové schránky: <strong className="ml-1">xxxxxxx</strong></span>
        </div>
        <div className="flex items-center gap-4">
          <a href="mailto:info@gamaprofit.cz" className="inline-flex items-center gap-1 hover:opacity-80"><Mail className="h-3.5 w-3.5" /> info@gamaprofit.cz</a>
          <a href="tel:+420000000000" className="inline-flex items-center gap-1 hover:opacity-80"><Phone className="h-3.5 w-3.5" /> +420 000 000 000</a>
        </div>
      </div>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm font-medium transition-colors hover:opacity-80" style={{color:"var(--gp-ink)"}}>
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-base font-medium" style={{color:"var(--gp-ink)"}}>
      {children}
    </Link>
  );
}

// ------------------------------------------------------------
// Announcement bar (finance tint)
// ------------------------------------------------------------
function AnnouncementBar() {
  return (
    <div className="gp-gradient-bar py-2 text-xs" style={{borderBottom:"1px solid var(--gp-border)", color:"var(--gp-ink)"}}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <CalendarCheck2 className="h-4 w-4" />
          <p className="hidden sm:block">Blíží se termíny: DPH (měsíční), kontrolní hlášení, záloha na daň z příjmů.</p>
          <p className="sm:hidden">Aktuální daňové termíny.</p>
        </div>
        <Link href="#poradna" className="inline-flex items-center gap-1 font-medium hover:opacity-80">
          Poradna
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Hero with finance grid & bubble
// ------------------------------------------------------------
function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* finance bubble + grid overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 gp-hero-bubble" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 gp-grid-spot" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
        <div>
          <h1 id="hero-title" className="text-4xl font-semibold tracking-tight sm:text-5xl gp-ink">
            Účetnictví, mzdy a daně pro malé a střední firmy.
          </h1>
          <p className="mt-5 max-w-xl text-lg" style={{color:"var(--gp-muted)"}}>
            Přebíráme plnou odpovědnost za vaše povinnosti. Transparentně, včas a v souladu se zákonem.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="#kontakt">
              <Button size="lg" className="gp-btn-primary rounded-xl px-6">
                Nezávazná konzultace
              </Button>
            </Link>
            <Link href="#sluzby">
              <Button size="lg" variant="outline" className="rounded-xl px-6" style={{borderColor:"var(--gp-primary)", color:"var(--gp-primary)"}}>
                Naše služby
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "Účetnictví",
              "Daňová evidence",
              "Mzdy & personalistika",
              "Daňová přiznání",
              "Zastupování na úřadech",
              "On-line účetnictví",
            ].map((label) => (
              <Badge key={label} variant="secondary" className="gp-chip rounded-full">
                {label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl border shadow-sm gp-card">
            <Image
              src="/hero-ledger.jpg"
              alt="Ilustrativní pracovní scéna — účetní agenda"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="pointer-events-none absolute -bottom-6 -right-6 hidden rotate-3 sm:block">
            <Card className="rounded-xl bg-white/90 backdrop-blur dark:bg-slate-900/80" style={{borderColor:"var(--gp-border)"}}>
              <CardContent className="flex items-center gap-3 p-4 text-sm">
                <ShieldCheck className="h-5 w-5" />
                <div>
                  <p className="font-medium">Bezpečná správa dokladů</p>
                  <p style={{color:"var(--gp-muted)"}}>GDPR-ready, kontrola termínů, auditní stopa</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// Trust strip (KPI s tabular-nums)
// ------------------------------------------------------------
function TrustStrip() {
  const items = [
    { label: "Klienti v různých oborech", value: "100+" },
    { label: "Mzdy zpracované měsíčně", value: "∞" },
    { label: "On-line spolupráce", value: "Standard" },
    { label: "Zastupování na úřadech", value: "Ano" },
  ];
  return (
    <section aria-label="Důvěryhodnost" className="border-y bg-[var(--gp-surface)] dark:bg-transparent" style={{borderColor:"var(--gp-border)"}}>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">
        {items.map((it) => (
          <div key={it.label} className="text-center">
            <p className="gp-kpi text-2xl font-semibold tracking-tight" style={{color:"var(--gp-primary)"}}>{it.value}</p>
            <p className="mt-1 text-xs" style={{color:"var(--gp-muted)"}}>{it.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// Services
// ------------------------------------------------------------
function Services() {
  const services = [
    {
      icon: ReceiptText,
      title: "Vedení účetnictví",
      bullets: ["Účtování dokladů", "DPH a KH", "Výkazy a uzávěrky"],
    },
    {
      icon: FileText,
      title: "Daňová evidence (OSVČ)",
      bullets: ["Příjmy/výdaje", "Paušály", "On-line sdílení"],
    },
    {
      icon: Users,
      title: "Mzdy & personalistika",
      bullets: ["Mzdová agenda", "Přihlášky/odhlášky", "ELDP, exekuce"],
    },
    {
      icon: Calculator,
      title: "Daňová přiznání",
      bullets: ["FO/PO", "Silniční, nemovitosti", "DPH, kontrolní hlášení"],
    },
    {
      icon: Landmark,
      title: "Zastupování na úřadech",
      bullets: ["Finanční úřad", "ČSSZ, zdravotní", "Kontroly a komunikace"],
    },
    {
      icon: Cloud,
      title: "On‑line účetnictví",
      bullets: ["Sběr dokladů digitálně", "Napojení banky", "Přehled kdykoli"],
    },
  ];
  return (
    <section id="sluzby" aria-labelledby="services-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="services-title" className="text-3xl font-semibold tracking-tight sm:text-4xl gp-ink">Čím vám pomůžeme</h2>
        <p className="mt-3" style={{color:"var(--gp-muted)"}}>
          Kompletní agenda na jednom místě. Jasná odpovědnost, žádné stresy.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Card key={s.title} className="group rounded-2xl p-2 transition hover:-translate-y-0.5 hover:shadow-md gp-card" style={{borderColor:"var(--gp-border)"}}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl gp-brand">
                  <s.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg gp-ink">{s.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="mt-1 space-y-1 text-sm" style={{color:"var(--gp-muted)"}}>
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <ChevronRight className="mt-0.5 h-4 w-4 flex-none" style={{color:"var(--gp-border)"}} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <Link href="#kontakt" className="inline-flex items-center text-sm font-medium hover:opacity-80" style={{color:"var(--gp-primary)"}}>
                  Získat kalkulaci <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// Process steps
// ------------------------------------------------------------
function Process() {
  const steps = [
    { icon: Phone, title: "1) Krátký hovor", text: "Ujasníme si rozsah a termíny." },
    { icon: FileText, title: "2) Předání podkladů", text: "Digitálně nebo fyzicky — jak je vám pohodlné." },
    { icon: Calculator, title: "3) Nastavení a běh", text: "Napojení banky, automatizace, pravidelné výstupy." },
    { icon: ShieldCheck, title: "4) Jistota a zastupování", text: "Hlídáme termíny a komunikujeme s úřady." },
  ];
  return (
    <section id="proces" aria-labelledby="process-title" className="py-16" style={{borderTop:"1px solid var(--gp-border)", borderBottom:"1px solid var(--gp-border)", background:"var(--gp-surface)"}}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="process-title" className="text-3xl font-semibold tracking-tight sm:text-4xl gp-ink">Jak spolupracujeme</h2>
          <p className="mt-3" style={{color:"var(--gp-muted)"}}>Jednoduchý proces bez zbytečných kroků.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <Card key={s.title} className="rounded-2xl p-4 gp-card" style={{borderColor:"var(--gp-border)"}}>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl gp-brand">
                  <s.icon className="h-5 w-5" />
                </div>
                <p className="font-medium gp-ink">{s.title}</p>
              </div>
              <p className="mt-3 text-sm" style={{color:"var(--gp-muted)"}}>{s.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// USP band (proč my)
// ------------------------------------------------------------
function USP() {
  const items = [
    { title: "Transparentní komunikace", text: "Mluvíme srozumitelně a držíme slovo." },
    { title: "Přebíráme odpovědnost", text: "Termíny hlídáme my, ne vy." },
    { title: "On-line spolupráce", text: "Doklady posíláte digitálně, přehled máte kdykoli." },
  ];
  return (
    <section aria-labelledby="usp-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div>
          <h2 id="usp-title" className="text-3xl font-semibold tracking-tight sm:text-4xl gp-ink">Proč si vybrat GamaProfit</h2>
          <p className="mt-3 max-w-xl" style={{color:"var(--gp-muted)"}}>
            Stabilní tým, jasné dohody a bezpečná práce s daty. Cíl: klid ve vaší firmě.
          </p>
          <ul className="mt-6 space-y-3">
            {items.map((i) => (
              <li key={i.title} className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-none" style={{color:"var(--gp-primary)"}} />
                <div>
                  <p className="font-medium gp-ink">{i.title}</p>
                  <p className="text-sm" style={{color:"var(--gp-muted)"}}>{i.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <Link href="#kontakt">
              <Button className="gp-btn-primary rounded-xl px-6">Domluvme si 15 minut</Button>
            </Link>
            <Link href="#reference">
              <Button variant="outline" className="rounded-xl px-6" style={{borderColor:"var(--gp-primary)", color:"var(--gp-primary)"}}>Reference</Button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl border shadow-sm gp-card" style={{borderColor:"var(--gp-border)"}}>
            <Image src="/office-ledger-2.jpg" alt="Tým při práci" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// Testimonials
// ------------------------------------------------------------
function Testimonials() {
  const items = [
    {
      name: "Jan Novák",
      role: "e‑shop s doplňky",
      quote:
        "Převzetí účetnictví proběhlo hladce. Vyhovuje nám on‑line režim a jasné termíny výstupů.",
    },
    {
      name: "Lucie Veselá",
      role: "stavební firma",
      quote:
        "U kontrol na úřadech jsme konečně v klidu. Komunikace je rychlá a konkrétní.",
    },
    {
      name: "Petr Dvořák",
      role: "služby B2B",
      quote:
        "Mzdová agenda bez chyb. Oceňuji přehledné podklady pro management.",
    },
  ];
  return (
    <section id="reference" aria-labelledby="testimonials-title" className="py-16" style={{borderTop:"1px solid var(--gp-border)", borderBottom:"1px solid var(--gp-border)", background:"var(--gp-surface)"}}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="testimonials-title" className="text-3xl font-semibold tracking-tight sm:text-4xl gp-ink">Co o nás říkají</h2>
          <p className="mt-3" style={{color:"var(--gp-muted)"}}>Krátké zkušenosti klientů z různých oborů.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((t) => (
            <Card key={t.name} className="rounded-2xl p-4 gp-card" style={{borderColor:"var(--gp-border)"}}>
              <blockquote className="text-sm leading-relaxed" style={{color:"var(--gp-ink)"}}>“{t.quote}”</blockquote>
              <div className="mt-4 text-sm" style={{color:"var(--gp-muted)"}}>
                <p className="font-medium" style={{color:"var(--gp-ink)"}}>{t.name}</p>
                <p>{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// Downloads / Lead magnet
// ------------------------------------------------------------
function DownloadsCTA() {
  return (
    <section id="stazeni" aria-labelledby="downloads-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div>
          <h2 id="downloads-title" className="text-3xl font-semibold tracking-tight sm:text-4xl gp-ink">Checklist předání účetnictví</h2>
          <p className="mt-3 max-w-xl" style={{color:"var(--gp-muted)"}}>
            Praktický seznam dokumentů a kroků, aby převzetí proběhlo rychle a bez chyb.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="gp-btn-primary rounded-xl px-6">Stáhnout PDF</Button>
            <Link href="#kontakt">
              <Button variant="outline" className="rounded-xl px-6" style={{borderColor:"var(--gp-primary)", color:"var(--gp-primary)"}}>Potřebuji s tím pomoct</Button>
            </Link>
          </div>
        </div>
        <Card className="rounded-2xl p-0 gp-card" style={{borderColor:"var(--gp-border)"}}>
          <CardContent className="p-0">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
              <Image src="/checklist-preview.jpg" alt="Náhled checklistu" fill className="object-cover" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// Contact
// ------------------------------------------------------------
function Contact() {
  return (
    <section id="kontakt" aria-labelledby="contact-title" className="py-16" style={{borderTop:"1px solid var(--gp-border)", background:"var(--gp-surface)"}}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <h2 id="contact-title" className="text-3xl font-semibold tracking-tight sm:text-4xl gp-ink">Ozvěte se nám</h2>
          <p className="mt-3" style={{color:"var(--gp-muted)"}}>Nezávazně probereme vaši situaci a doporučíme nejefektivnější postup.</p>
          <form className="mt-8 grid grid-cols-1 gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input required aria-label="Jméno" placeholder="Jméno a příjmení" className="rounded-xl" />
              <Input aria-label="Firma" placeholder="Firma (volitelné)" className="rounded-xl" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input required type="email" aria-label="E‑mail" placeholder="E‑mail" className="rounded-xl" />
              <Input aria-label="IČ" placeholder="IČ (volitelné)" className="rounded-xl" />
            </div>
            <Textarea required aria-label="Zpráva" placeholder="Stručně popište, co potřebujete…" className="min-h-[120px] rounded-xl" />
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs" style={{color:"var(--gp-muted)"}}>Odesláním souhlasíte se zpracováním osobních údajů.</p>
              <Button type="submit" className="gp-btn-primary rounded-xl px-6">Odeslat</Button>
            </div>
          </form>
        </div>
        <div className="space-y-4">
          <Card className="rounded-2xl gp-card" style={{borderColor:"var(--gp-border)"}}>
            <CardContent className="p-6">
              <div className="space-y-3 text-sm" style={{color:"var(--gp-ink)"}}>
                <div className="flex items-center gap-3"><Phone className="h-4 w-4" /> +420 000 000 000</div>
                <div className="flex items-center gap-3"><Mail className="h-4 w-4" /> info@gamaprofit.cz</div>
                <div className="flex items-center gap-3"><MapPin className="h-4 w-4" /> Nepomuk • Plzeňsko</div>
                <div className="flex items-center gap-3"><Building2 className="h-4 w-4" /> ID datové schránky: xxxxxxx</div>
              </div>
            </CardContent>
          </Card>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border shadow-sm gp-card" style={{borderColor:"var(--gp-border)"}}>
            {/* Map placeholder — nahraďte embedem Google Maps */}
            <Image src="/map-placeholder.jpg" alt="Mapa — Nepomuk" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// Footer
// ------------------------------------------------------------
function Footer() {
  return (
    <footer className="bg-white py-10 text-sm dark:bg-slate-950" style={{borderTop:"1px solid var(--gp-border)"}}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl gp-brand">
              <span className="font-bold">GP</span>
            </div>
            <p className="font-semibold gp-ink">GamaProfit</p>
          </div>
          <p className="mt-3 max-w-xs" style={{color:"var(--gp-muted)"}}>
            Stabilní účetní partner pro malé a střední firmy. Transparentně, včas, bez stresu.
          </p>
        </div>
        <div>
          <p className="mb-3 font-semibold gp-ink">Navigace</p>
          <ul className="space-y-2" style={{color:"var(--gp-muted)"}}>
            <li><Link href="#sluzby" className="hover:opacity-80">Služby</Link></li>
            <li><Link href="#proces" className="hover:opacity-80">Jak pracujeme</Link></li>
            <li><Link href="#reference" className="hover:opacity-80">Reference</Link></li>
            <li><Link href="#stazeni" className="hover:opacity-80">Ke stažení</Link></li>
            <li><Link href="#kontakt" className="hover:opacity-80">Kontakt</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-semibold gp-ink">Právní</p>
          <ul className="space-y-2" style={{color:"var(--gp-muted)"}}>
            <li><Link href="/gdpr" className="hover:opacity-80">Zpracování osobních údajů</Link></li>
            <li><Link href="/cookies" className="hover:opacity-80">Cookies</Link></li>
            <li><Link href="/obchodni-podminky" className="hover:opacity-80">Obchodní podmínky</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-semibold gp-ink">Fakturační údaje</p>
          <ul className="space-y-1" style={{color:"var(--gp-muted)"}}>
            <li>GamaProfit s.r.o.</li>
            <li>IČ: ———— • DIČ: ————</li>
            <li>Datová schránka: xxxxxxx</li>
          </ul>
          <div className="mt-4 text-xs" style={{color:"var(--gp-muted)"}}>© {new Date().getFullYear()} GamaProfit. Všechna práva vyhrazena.</div>
        </div>
      </div>
    </footer>
  );
}
