import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar/Navbar';

function priceText(p) {
  const regular = p?.regularPrice ?? 0;
  const offer = p?.offer && (p?.discountPrice ?? 0) > 0;
  if (offer) {
    return {
      left: `$${p.discountPrice}`,
      right: `$${regular}`,
    };
  }
  return { left: `$${regular}`, right: null };
}

function PropertyCard({ p }) {
  const cover = Array.isArray(p.imageUrls) ? p.imageUrls[0] : '';
  const { left, right } = priceText(p);

  return (
    <Link
      to={`/property/${p._id || p.id}`}
      className="group block h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30 transition hover:border-slate-600 hover:bg-slate-900/50"
    >
      <div className="relative">
        {cover ? (
          <img
            src={cover}
            alt={p.name}
            className="h-40 w-full object-cover transition group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-40 w-full items-center justify-center bg-slate-800/40 text-xs text-slate-300">
            No image
          </div>
        )}

        {p.offer && p.discountPrice > 0 ? (
          <div className="absolute left-3 top-3 rounded-full bg-rose-500/90 px-3 py-1 text-[11px] font-semibold text-white">
            Offer
          </div>
        ) : null}
      </div>

      <div className="p-4">
        <div className="text-sm font-semibold text-slate-100 line-clamp-2">{p.name}</div>
        <div className="mt-1 text-xs text-slate-300 line-clamp-2">{p.address}</div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-100">
            {right ? (
              <>
                <span className="text-rose-300">{left}</span>
                <span className="ml-2 text-xs text-slate-400 line-through">{right}</span>
              </>
            ) : (
              left
            )}
          </div>
          <div className="text-xs text-slate-300">
            {p.bedrooms} bd · {p.bathrooms} ba
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
          <span>{p.type === 'rent' ? 'For Rent' : 'For Sale'}</span>
          <span>{p.furnished ? 'Furnished' : 'Not furnished'}</span>
        </div>

        <div className="mt-2 text-[11px] text-slate-400">
          {p.parking ? 'Parking: Yes' : 'Parking: No'}
        </div>
      </div>
    </Link>
  );
}

function HorizontalSlider({ title, items }) {
  const scrollerRef = useRef(null);

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(320, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section className="mt-10">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-200">{title}</h2>
          <p className="mt-1 text-xs text-slate-400">
            Browse {items.length} listing{items.length === 1 ? '' : 's'}
          </p>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            className="rounded-full border border-slate-800 bg-slate-900/30 px-3 py-2 text-xs text-slate-200 transition hover:border-slate-600 hover:bg-slate-900/50"
            aria-label={`Scroll ${title} left`}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            className="rounded-full border border-slate-800 bg-slate-900/30 px-3 py-2 text-xs text-slate-200 transition hover:border-slate-600 hover:bg-slate-900/50"
            aria-label={`Scroll ${title} right`}
          >
            →
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4 text-sm text-slate-300">
          No listings found.
        </div>
      ) : (
        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto pb-3 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((p) => (
              <div key={p._id || p.id} className="w-[280px] sm:w-[300px] shrink-0">
                <PropertyCard p={p} />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            <div className="pointer-events-auto sm:hidden">
              <button
                type="button"
                onClick={() => scrollByAmount(-1)}
                className="ml-2 rounded-full border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs text-slate-200"
                aria-label={`Scroll ${title} left`}
              >
                ←
              </button>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-end">
            <div className="pointer-events-auto sm:hidden">
              <button
                type="button"
                onClick={() => scrollByAmount(1)}
                className="mr-2 rounded-full border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs text-slate-200"
                aria-label={`Scroll ${title} right`}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHome = async () => {
      try {
        setLoading(true);
        setError('');
        axios.defaults.withCredentials = true;

        // Pull a bigger set; backend supports search but not type=rent/sale.
        const res = await axios.get('/api/properties/search', {
          params: { limit: 30, startIndex: 0, searchTerm: '', sort: 'createdAt', order: 'desc' },
        });

        setItems(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        setError(e?.response?.data?.message || 'Unable to load properties.');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, []);

  const sections = useMemo(() => {
    const rent = items.filter((p) => p?.type === 'rent');
    const sale = items.filter((p) => p?.type === 'sale');
    const offers = items.filter((p) => p?.offer === true && (p?.discountPrice ?? 0) > 0);
    const notOffers = items.filter((p) => p?.offer === false || (p?.discountPrice ?? 0) <= 0);

    return { rent, sale, offers, notOffers };
  }, [items]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-200">Explore properties</h1>
            <p className="mt-1 text-sm text-slate-400">
              Rent, sale, offers, and listings that are currently not on offer.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 px-4 py-3 text-xs text-slate-300">
            Showing newest listings
          </div>
        </header>

        {loading ? (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/30 p-4 text-sm text-slate-200">
            Loading...
          </div>
        ) : error ? (
          <div className="mt-10 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">
            {error}
          </div>
        ) : (
          <>
            <HorizontalSlider title="For Rent" items={sections.rent} />
            <HorizontalSlider title="For Sale" items={sections.sale} />
            <HorizontalSlider title="Offers" items={sections.offers} />
            <HorizontalSlider title="Not on Offer" items={sections.notOffers} />
          </>
        )}

        <footer className="mt-12 pb-10 text-center text-xs text-slate-500">
          Tip: Open a listing to see full details & image slider.
        </footer>
      </div>
    </div>
  );
}