'use client';

import { X } from 'lucide-react';
import { ALL_AREAS, ALL_TYPES } from '@/data/properties';

interface PropertyFiltersProps {
  filters: {
    type: string;
    bhk: string;
    budgetMin: string;
    budgetMax: string;
    area: string;
    furnished: string;
  };
  onChange: (key: string, value: string) => void;
  onClear: () => void;
  resultCount: number;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const bhkOptions = ['1', '2', '3', '4'];
const furnishOptions = ['Furnished', 'Semi-Furnished', 'Unfurnished'];
const budgetRanges = [
  { label: '₹25K - ₹35K', min: '25000', max: '35000' },
  { label: '₹35K - ₹45K', min: '35000', max: '45000' },
  { label: '₹45K - ₹55K', min: '45000', max: '55000' },
  { label: '₹55K - ₹65K', min: '55000', max: '65000' },
  { label: '₹65K - ₹75K', min: '65000', max: '75000' },
  { label: '₹75K+', min: '75000', max: '' },
];

export function PropertyFilters({
  filters,
  onChange,
  onClear,
  resultCount,
  mobileOpen,
  onMobileClose,
}: PropertyFiltersProps) {
  const hasFilters = Object.values(filters).some(Boolean);

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)]">Filters</h3>
        {hasFilters && (
          <button
            onClick={onClear}
            className="text-sm text-[#006194] hover:underline cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      <p className="text-sm text-[var(--muted)]">{resultCount} properties found</p>

      {/* Property Type */}
      <div>
        <label className="text-sm font-medium mb-2 block">Property Type</label>
        <div className="flex flex-wrap gap-2">
          {ALL_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => onChange('type', filters.type === t ? '' : t)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
                filters.type === t
                  ? 'bg-[#006194] text-white'
                  : 'bg-surface-light text-[var(--muted)] hover:bg-surface-lighter'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* BHK */}
      <div>
        <label className="text-sm font-medium mb-2 block">BHK</label>
        <div className="flex flex-wrap gap-2">
          {bhkOptions.map((b) => (
            <button
              key={b}
              onClick={() => onChange('bhk', filters.bhk === b ? '' : b)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
                filters.bhk === b
                  ? 'bg-[#006194] text-white'
                  : 'bg-surface-light text-[var(--muted)] hover:bg-surface-lighter'
              }`}
            >
              {b === '4' ? '4+' : b} BHK
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="text-sm font-medium mb-2 block">Budget Range</label>
        <div className="flex flex-col gap-2">
          {budgetRanges.map((range) => {
            const isActive = filters.budgetMin === range.min && filters.budgetMax === range.max;
            return (
              <button
                key={range.label}
                onClick={() => {
                  if (isActive) {
                    onChange('budgetMin', '');
                    onChange('budgetMax', '');
                  } else {
                    onChange('budgetMin', range.min);
                    onChange('budgetMax', range.max);
                  }
                }}
                className={`px-3 py-2 rounded-lg text-sm text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#006194] text-white'
                    : 'bg-surface-light text-[var(--muted)] hover:bg-surface-lighter'
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="text-sm font-medium mb-2 block">Location</label>
        <div className="flex flex-wrap gap-2">
          {ALL_AREAS.map((area) => (
            <button
              key={area}
              onClick={() => onChange('area', filters.area === area ? '' : area)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
                filters.area === area
                  ? 'bg-[#006194] text-white'
                  : 'bg-surface-light text-[var(--muted)] hover:bg-surface-lighter'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Furnishing */}
      <div>
        <label className="text-sm font-medium mb-2 block">Furnishing</label>
        <div className="flex flex-wrap gap-2">
          {furnishOptions.map((f) => (
            <button
              key={f}
              onClick={() => onChange('furnished', filters.furnished === f ? '' : f)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
                filters.furnished === f
                  ? 'bg-[#006194] text-white'
                  : 'bg-surface-light text-[var(--muted)] hover:bg-surface-lighter'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[280px] shrink-0">
        <div className="glass-card p-5 sticky top-24">{content}</div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onMobileClose}
          />
          <div className="fixed left-0 top-0 bottom-0 w-[300px] bg-surface z-50 p-5 overflow-y-auto lg:hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={onMobileClose} className="p-2 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
          </div>
        </>
      )}
    </>
  );
}
