import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-slate-800 bg-gradient-to-br from-slate-900/70 via-slate-950 to-emerald-950/40 p-6 sm:p-10">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-[#FF385C]/20 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#FF385C]/10 via-emerald-500/10 to-sky-500/10 blur-3xl" />
          </div>

          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-200">
              <span className="inline-block h-2 w-2 rounded-full bg-[#FF385C]" />
              Luxury stays • Real results • Zero fluff
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF385C] to-emerald-400">jardiniHomes</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
              We’re not just listing properties — we’re curating real places with real value.
              From the first scroll to the final decision, we make buying and renting feel fast,
              clean, and confident.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Feature
                title="Verified listings"
                desc="Every home is presented clearly: price, type, and key details — so you can move quicker."
              />
              <Feature
                title="Deal-aware offers"
                desc="Spot discounts and offer-ready properties instantly — because your next win should be obvious."
              />
              <Feature
                title="Modern discovery"
                desc="Browse rent, sale, and offers in sleek sliders designed for real attention spans."
              />
              <Feature
                title="Built for trust"
                desc="Secure authentication and a smooth experience from profile to property details."
              />
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="text-xs font-semibold text-slate-400">Our promise</div>
                <div className="mt-2 text-lg font-semibold">Bold listings. Clean UX.</div>
                <div className="mt-2 text-sm text-slate-300">
                  We scream quality — design that feels premium, and content that stays truthful.
                </div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 lg:col-span-2">
                <div className="text-xs font-semibold text-slate-400">Why people choose us</div>
                <div className="mt-2 text-lg font-semibold">Less time searching. More time viewing.</div>
                <div className="mt-2 mt-2 text-sm text-slate-300">
                  Explore by category, open details with a gallery-style view, and find the right property
                  without getting lost.
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Rent', 'Sale', 'Offers', 'Not on offer'].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-slate-800 bg-slate-950/60 px-3 py-1 text-xs text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/60 to-slate-950/40 p-6 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-200">Ready to browse like a pro?</div>
                  <div className="mt-1 text-xs text-slate-400">
                    Jump into listings and find your next place — fast.
                  </div>
                </div>
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-full bg-[#FF385C] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#FF385C]/30 transition hover:bg-[#E31C5F]"
                >
                  Explore properties
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} jardiniHomes. All rights reserved.
        </div>
      </div>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
      <div className="text-sm font-semibold text-slate-100">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-slate-300">{desc}</div>
      <div className="mt-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-[#FF385C] to-emerald-400" />
    </div>
  );
}

