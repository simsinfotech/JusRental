'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LuSlidersHorizontal, LuArrowUpDown } from 'react-icons/lu';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { PropertyFilters } from '@/components/properties/PropertyFilters';
import { LeadPopup } from '@/components/properties/LeadPopup';
import { Pagination } from '@/components/ui/Pagination';
import type { Property } from '@/types';

const ITEMS_PER_PAGE = 9;

const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Size: Large to Small', value: 'sqft-desc' },
];

interface PropertiesContentProps {
  properties: Property[];
  allAreas: string[];
  allTypes: string[];
  initialFilters: {
    type: string;
    bhk: string;
    budgetMin: string;
    budgetMax: string;
    area: string;
    furnished: string;
  };
  initialSort: string;
  initialPage: number;
}

export function PropertiesContent({
  properties,
  allAreas,
  allTypes,
  initialFilters,
  initialSort,
  initialPage,
}: PropertiesContentProps) {
  const router = useRouter();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showLeadPopup, setShowLeadPopup] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('jusrental_lead_captured')) return;
    const timer = setTimeout(() => setShowLeadPopup(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const filters = initialFilters;
  const sort = initialSort;
  const page = initialPage;

  const updateParams = useCallback((key: string, value: string) => {
    const params = new URLSearchParams();
    const current = { ...filters, sort, page: page.toString() };
    for (const [k, v] of Object.entries(current)) {
      if (v) params.set(k, v);
    }
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== 'page') params.delete('page');
    router.push(`/properties?${params.toString()}`, { scroll: false });
  }, [filters, sort, page, router]);

  const clearFilters = useCallback(() => {
    router.push('/properties', { scroll: false });
  }, [router]);

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const paged = properties.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const startItem = (page - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(page * ITEMS_PER_PAGE, properties.length);

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-glass-border text-sm cursor-pointer"
            >
              <LuSlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            {properties.length > 0 && (
              <p className="text-sm text-[var(--muted)] hidden sm:block">
                Showing {startItem}–{endItem} of {properties.length} properties in North Bangalore
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <LuArrowUpDown className="w-4 h-4 text-[var(--muted)]" />
            <select
              value={sort}
              onChange={(e) => updateParams('sort', e.target.value)}
              className="px-3 py-2 rounded-lg border border-glass-border bg-surface text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#006194]/20"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          <PropertyFilters
            filters={filters}
            onChange={updateParams}
            onClear={clearFilters}
            resultCount={properties.length}
            mobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

          <div className="flex-1">
            {/* Mobile result count */}
            {properties.length > 0 && (
              <p className="text-sm text-[var(--muted)] mb-4 sm:hidden">
                Showing {startItem}–{endItem} of {properties.length} properties
              </p>
            )}

            {paged.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {paged.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(p) => updateParams('page', p.toString())}
                />
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-surface-light flex items-center justify-center">
                  <LuSlidersHorizontal className="w-8 h-8 text-[var(--muted)]" />
                </div>
                <h3 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-2">
                  No properties found
                </h3>
                <p className="text-[var(--muted)] mb-4">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#006194] text-white font-medium cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <LeadPopup
        isOpen={showLeadPopup}
        onClose={() => setShowLeadPopup(false)}
      />
    </section>
  );
}
