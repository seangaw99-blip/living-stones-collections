'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  origins: string[];
}

const priceRanges = [
  { value: 'under-5000', label: 'Under ₱5,000' },
  { value: '5000-15000', label: '₱5,000 \u2013 ₱15,000' },
  { value: 'over-15000', label: 'Over ₱15,000' },
];

const availabilityOptions = [
  { value: 'available', label: 'Available' },
  { value: 'sold', label: 'Sold' },
];

const sortOptions = [
  { value: '', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
];

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-6 label-text text-outline hairline-bottom pb-2">
        {label}
      </h3>
      <ul className="space-y-4 text-[14px] leading-[1.7] text-on-surface-variant">
        {children}
      </ul>
    </div>
  );
}

function CheckOption({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      <label className="group flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 cursor-pointer rounded-sm border-[0.5px] border-outline-variant bg-surface-container-lowest text-primary focus:ring-secondary"
        />
        <span
          className={cn(
            'transition-colors',
            checked ? 'text-primary' : 'group-hover:text-primary'
          )}
        >
          {children}
        </span>
      </label>
    </li>
  );
}

export function FilterSidebar({ origins }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const currentOrigin = searchParams.get('origin') || '';
  const currentSort = searchParams.get('sort') || '';
  const currentPrice = searchParams.get('price') || '';
  const currentAvailability = searchParams.get('availability') || 'available';

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const hasFilters = currentOrigin || currentPrice || currentSort;
  const activeCount = [currentOrigin, currentPrice, currentSort].filter(Boolean).length;

  return (
    <aside>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mb-6 flex w-full items-center justify-between hairline rounded-lg px-5 py-3 lg:hidden"
      >
        <span className="font-body text-[13px] text-on-surface">
          Filters{activeCount > 0 && <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-[11px] text-on-primary">{activeCount}</span>}
        </span>
        <span className="material-symbols-outlined text-[18px] text-outline transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>
          expand_more
        </span>
      </button>

      <div className={cn('space-y-12', !open && 'hidden lg:block')}>
      <FilterGroup label="Origin">
        {origins.map((origin) => (
          <CheckOption
            key={origin}
            checked={currentOrigin === origin}
            onChange={() =>
              updateParam('origin', currentOrigin === origin ? '' : origin)
            }
          >
            {origin}
          </CheckOption>
        ))}
      </FilterGroup>

      <FilterGroup label="Price">
        {priceRanges.map((range) => (
          <CheckOption
            key={range.value}
            checked={currentPrice === range.value}
            onChange={() =>
              updateParam('price', currentPrice === range.value ? '' : range.value)
            }
          >
            {range.label}
          </CheckOption>
        ))}
      </FilterGroup>

      <FilterGroup label="Availability">
        {availabilityOptions.map((opt) => (
          <CheckOption
            key={opt.value}
            checked={currentAvailability === opt.value}
            onChange={() => updateParam('availability', opt.value)}
          >
            {opt.label}
          </CheckOption>
        ))}
      </FilterGroup>

      <FilterGroup label="Sort by">
        {sortOptions.map((opt) => (
          <CheckOption
            key={opt.value || 'newest'}
            checked={currentSort === opt.value}
            onChange={() => updateParam('sort', opt.value)}
          >
            {opt.label}
          </CheckOption>
        ))}
      </FilterGroup>

      {hasFilters && (
        <button
          onClick={() => router.push(pathname, { scroll: false })}
          className="font-body text-[13px] text-outline underline underline-offset-4 decoration-[0.5px] transition-colors hover:text-primary"
        >
          Clear all filters
        </button>
      )}
      </div>
    </aside>
  );
}
