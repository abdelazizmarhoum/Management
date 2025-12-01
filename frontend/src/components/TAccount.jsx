import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

// This component will display a single T-account
export function TAccount({ account }) {
  const { name, type, debit, credit } = account;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-medium border border-neutral-200 hover:shadow-large transition-all duration-300 transform hover:-translate-y-1">
      <div className="text-center mb-5">
        <h3 className="text-xl font-bold text-neutral-800 mb-1">{name}</h3>
        <div className="text-sm text-neutral-500 font-medium bg-neutral-100 inline-block px-3 py-1 rounded-full">
          {type}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-center">
        {/* Debit Side */}
        <div className="border-r border-neutral-200 pr-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-accent-600" />
            <h4 className="font-semibold text-neutral-700">Débit</h4>
          </div>
          <p className="text-2xl font-bold text-accent-600">
            {debit > 0 ? `${debit.toFixed(2)} DH` : '---'}
          </p>
        </div>
        
        {/* Credit Side */}
        <div className="pl-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-primary-600" />
            <h4 className="font-semibold text-neutral-700">Crédit</h4>
          </div>
          <p className="text-2xl font-bold text-primary-600">
            {credit > 0 ? `${credit.toFixed(2)} DH` : '---'}
          </p>
        </div>
      </div>
      
      <div className="mt-5 pt-4 border-t border-neutral-100 text-center">
        <span className="text-xs text-neutral-500">T-Compte</span>
      </div>
    </div>
  );
}