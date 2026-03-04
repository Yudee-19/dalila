'use client';

import React from 'react';
import Link from 'next/link';
import { Marcellus } from 'next/font/google';

const marcellus = Marcellus({
  variable: '--font-marcellus',
  subsets: ['latin'],
  weight: '400',
});

interface ResourceSidebarProps {
  currentPage: 'premium-b2b' | 'sell-diamond';
}

const ResourceSidebar = React.memo(({ currentPage }: ResourceSidebarProps) => {
  const otherPage = currentPage === 'premium-b2b' 
    ? {
        title: 'Sell Your Diamond Safely',
        href: '/sell-your-diamond-safely',
        description: 'Professional diamond buyback service for B2B sellers and estate liquidation needs'
      }
    : {
        title: 'Premium B2B Diamond Supplier Belgium',
        href: '/premium-b2b-diamond-supplier-belgium',
        description: 'Certified quality, reliable service, and trusted sourcing for global businesses'
      };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-linear-to-r from-slate-900 to-slate-800 px-6 py-4">
            <h2 className={`${marcellus.className} text-xl text-white`}>
              Our Resources
            </h2>
          </div>
          
          <div className="p-6">
            <Link
              href={otherPage.href}
              className="block group hover:bg-slate-50 -mx-2 px-2 py-3 rounded-lg transition-all duration-300"
              scroll={false}
            >
              <h3 className={`${marcellus.className} text-lg text-slate-900 group-hover:text-[#c89e3a] transition-colors duration-300`}>
                {otherPage.title}
              </h3>
            </Link>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
            <Link 
              href="/inventory"
              className="inline-flex items-center text-sm font-medium text-slate-900 hover:text-[#c89e3a] transition-colors duration-300"
            >
              Browse Our Inventory
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

ResourceSidebar.displayName = 'ResourceSidebar';

export default ResourceSidebar;
