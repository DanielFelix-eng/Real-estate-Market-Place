import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Home, MapPin, DollarSign, Loader2, Trash2 } from 'lucide-react';

const inputClass =
  'w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors duration-150 focus:border-[#FF385C] focus:outline-none focus:ring-2 focus:ring-[#FF385C]/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100';
const errorInputClass = 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20';

export default function UpdateProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    name: '',
    description: '',
    address: '',
    price: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    type: 'rent',
    offer: false,
    discountPrice: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`/api/properties/get/${id}`);
        const property = response.data;
        setFields({
          name: property.name || '',
          description: property.description || '',
          address: property.address || '',
          price: property.regularPrice?.toString() || '',
          bedrooms: property.bedrooms || 1,
          bathrooms: property.bathrooms || 1,
          parking: property.parking || false,
          furnished: property.furnished || false,
          type: property.type || 'rent',
          offer: property.offer || false,
          discountPrice: property.discountPrice?.toString() || '',
        });
      } catch (error) {
        setStatus({ type: 'error', message: error?.response?.data?.message || 'Could not load property.' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleFieldChange = (field, value) => {
    setFields((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const validation = {};

    if (!fields.name.trim()) validation.name = 'Property name is required.';
    if (!fields.description.trim()) validation.description = 'Description is required.';
    if (!fields.address.trim()) validation.address = 'Address is required.';
    if (!fields.price || Number(fields.price) <= 0) validation.price = 'Price must be greater than 0.';
    if (fields.offer && (!fields.discountPrice || Number(fields.discountPrice) <= 0)) {
      validation.discountPrice = 'Discount price must be greater than 0.';
    }

    setErrors(validation);
    return Object.keys(validation).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) {
      setStatus({ type: 'error', message: 'Please fix the errors before saving.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      axios.defaults.withCredentials = true;
      await axios.put(`/api/properties/update/${id}`, {
        name: fields.name,
        description: fields.description,
        address: fields.address,
        regularPrice: Number(fields.price),
        discountPrice: fields.offer ? Number(fields.discountPrice) : 0,
        bathrooms: Number(fields.bathrooms),
        bedrooms: Number(fields.bedrooms),
        parking: fields.parking,
        furnished: fields.furnished,
        type: fields.type,
        offer: fields.offer,
      });
      setStatus({ type: 'success', message: 'Property updated successfully.' });
    } catch (error) {
      setStatus({ type: 'error', message: error?.response?.data?.message || 'Unable to update property.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this listing? This cannot be undone.')) return;

    setIsDeleting(true);
    setStatus({ type: '', message: '' });

    try {
      axios.defaults.withCredentials = true;
      await axios.delete(`/api/properties/listings/${id}`);
      navigate('/profile');
    } catch (error) {
      setStatus({ type: 'error', message: error?.response?.data?.message || 'Unable to delete listing.' });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 px-4 py-24 text-center text-neutral-700 dark:bg-neutral-950 dark:text-neutral-100">
        <Loader2 className="mx-auto h-8 w-8 animate-spin" />
        <p className="mt-4">Loading property...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-28 dark:bg-neutral-950">
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-4">
          <Home className="h-5 w-5 text-[#FF385C]" />
          <h1 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Edit property</h1>
        </div>
      </header>

      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 pt-6">
        {status.message ? (
          <div className={`rounded-2xl border px-4 py-3 text-sm ${status.type === 'success' ? 'border-emerald-300 bg-emerald-500/10 text-emerald-200' : 'border-rose-300 bg-rose-500/10 text-rose-200'}`}>
            {status.message}
          </div>
        ) : null}

        <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Basics</h2>
          <div className="mt-4 grid gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">Property name</label>
              <input className={`${inputClass} ${errors.name ? errorInputClass : ''} mt-2`} value={fields.name} onChange={(e) => handleFieldChange('name', e.target.value)} placeholder="Sunny loft near downtown" />
              {errors.name ? <p className="mt-2 text-sm text-rose-400">{errors.name}</p> : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">Description</label>
              <textarea className={`${inputClass} mt-2 min-h-30 resize-y ${errors.description ? errorInputClass : ''}`} value={fields.description} onChange={(e) => handleFieldChange('description', e.target.value)} placeholder="Describe what makes this place special..." />
              {errors.description ? <p className="mt-2 text-sm text-rose-400">{errors.description}</p> : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">Address</label>
              <div className="relative mt-2">
                <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input className={`${inputClass} pl-10 ${errors.address ? errorInputClass : ''}`} value={fields.address} onChange={(e) => handleFieldChange('address', e.target.value)} placeholder="123 Market St, San Francisco, CA" />
              </div>
              {errors.address ? <p className="mt-2 text-sm text-rose-400">{errors.address}</p> : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">Price per night (USD)</label>
              <div className="relative mt-2">
                <DollarSign className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input type="number" min={0} className={`${inputClass} pl-10 ${errors.price ? errorInputClass : ''}`} value={fields.price} onChange={(e) => handleFieldChange('price', e.target.value)} />
              </div>
              {errors.price ? <p className="mt-2 text-sm text-rose-400">{errors.price}</p> : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">Type</label>
                <select className={`${inputClass} mt-2`} value={fields.type} onChange={(e) => handleFieldChange('type', e.target.value)}>
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                </select>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input id="offer" type="checkbox" checked={fields.offer} onChange={(e) => handleFieldChange('offer', e.target.checked)} className="h-4 w-4 rounded border-neutral-300 text-[#FF385C] focus:ring-[#FF385C]" />
                <label htmlFor="offer" className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Offer available</label>
              </div>
            </div>
            {fields.offer ? (
              <div>
                <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">Discount price</label>
                <input type="number" min={0} className={`${inputClass} mt-2 ${errors.discountPrice ? errorInputClass : ''}`} value={fields.discountPrice} onChange={(e) => handleFieldChange('discountPrice', e.target.value)} />
                {errors.discountPrice ? <p className="mt-2 text-sm text-rose-400">{errors.discountPrice}</p> : null}
              </div>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">Bedrooms</label>
                <input type="number" min={1} className={inputClass} value={fields.bedrooms} onChange={(e) => handleFieldChange('bedrooms', Number(e.target.value))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">Bathrooms</label>
                <input type="number" min={1} className={inputClass} value={fields.bathrooms} onChange={(e) => handleFieldChange('bathrooms', Number(e.target.value))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">Parking</label>
                <select className={inputClass} value={fields.parking ? 'yes' : 'no'} onChange={(e) => handleFieldChange('parking', e.target.value === 'yes')}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">Furnished</label>
              <select className={inputClass} value={fields.furnished ? 'yes' : 'no'} onChange={(e) => handleFieldChange('furnished', e.target.value === 'yes')}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white/90 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/90">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <button type="button" onClick={() => navigate(-1)} className="rounded-full px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800">Cancel</button>
          <div className="flex items-center gap-3">
            <button type="button" onClick={handleDelete} disabled={isDeleting} className="rounded-full border border-rose-300 px-4 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-700 dark:text-rose-300 dark:hover:bg-rose-950/50">
              {isDeleting ? 'Deleting...' : 'Delete listing'}
            </button>
            <button type="button" onClick={handleUpdate} disabled={isSubmitting} className="flex items-center gap-2 rounded-full bg-[#FF385C] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#E31C5F] disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
