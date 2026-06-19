import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar/Navbar';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const term = urlParams.get('searchTerm');
    setSearchTerm(term || '');
  }, [location.search]);

  const queryParams = useMemo(() => {
    const urlParams = new URLSearchParams();
    if (searchTerm) urlParams.set('searchTerm', searchTerm);
    // backend supports offer/furnished/parking; leaving unset means “any”
    return urlParams;
  }, [searchTerm]);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError('');

      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get('/api/properties/search', {
          params: Object.fromEntries(queryParams.entries()),
        });
        setResults(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        setError(e?.response?.data?.message || 'Unable to fetch search results.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Always fetch when page params change (even for empty searchTerm)
    fetchResults();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-2xl font-semibold mb-6 text-slate-200">Search Properties</h1>

          <form onSubmit={handleSubmit} className="mb-8">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 rounded-full border border-slate-800 bg-slate-900/90 py-2.5 pl-11 pr-4 text-sm text-slate-200 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              className="mt-2 rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
            >
              Search
            </button>
          </form>

          {isLoading ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/30 px-4 py-3 text-sm text-slate-200">
              Loading...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          ) : results.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/30 px-4 py-3 text-sm text-slate-200">
              No results found.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => {
                const cover = Array.isArray(p.imageUrls) ? p.imageUrls[0] : '';
                return (
                  <div
                    key={p._id || p.id}
                    className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30"
                  >
                    {cover ? (
                      <img
                        src={cover}
                        alt={p.name}
                        className="h-40 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-40 w-full items-center justify-center bg-slate-800/40 text-xs text-slate-300">
                        No image
                      </div>
                    )}

                    <div className="p-4">
                      <div className="text-sm font-semibold text-slate-100 line-clamp-2">{p.name}</div>
                      <div className="mt-1 text-xs text-slate-300 line-clamp-2">{p.address}</div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-sm font-semibold text-slate-100">
                          {p.offer && p.discountPrice ? (
                            <>
                              <span className="text-rose-300">${p.discountPrice}</span>
                              <span className="ml-2 text-xs text-slate-400 line-through">${p.regularPrice}</span>
                            </>
                          ) : (
                            <>
                              ${p.regularPrice}
                            </>
                          )}
                        </div>
                        <div className="text-xs text-slate-300">
                          {p.bedrooms} bd · {p.bathrooms} ba
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-slate-300">
                        {p.type} · {p.furnished ? 'Furnished' : 'Not furnished'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchPage;

