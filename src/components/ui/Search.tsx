'use client';

import { useState } from 'react';

interface SearchProps {
  placeholder: string;
  onSearch?: (query: string) => void;
}

export default function Search({ placeholder, onSearch }: SearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg className="h-5 w-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full rounded-xl border border-white-08 bg-bg-elevated py-4 pl-12 pr-4 text-sm text-text-primary placeholder-text-tertiary shadow-lg focus:border-brand-300 focus:ring-4 focus:ring-brand-300/12 focus:outline-none transition-all duration-200"
          placeholder={placeholder}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-4"
        >
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
}