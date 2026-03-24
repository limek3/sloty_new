'use client';

import { useApp } from '@/lib/app-context';
import type { Category } from '@/lib/types';

interface CategoryChipProps {
  category: Category;
  onClick?: () => void;
  selected?: boolean;
}

export function CategoryChip({ category, onClick, selected }: CategoryChipProps) {
  const { language } = useApp();
  
  const name = language === 'ru' ? category.nameRu : category.name;

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 rounded-[22px] border transition-all shrink-0 w-[92px] h-[96px] shadow-sm ${
        selected
          ? 'border-primary/40 bg-primary/10 shadow-md shadow-primary/10'
          : 'border-border/80 bg-card hover:border-primary/30 hover:bg-secondary/40 hover:shadow-md'
      }`}
    >
      <span className={`flex items-center justify-center w-11 h-11 rounded-2xl text-2xl ${selected ? 'bg-primary/12' : 'bg-secondary/55'}`}>{category.icon}</span>
      <span className={`text-xs font-semibold text-center leading-tight ${
        selected ? 'text-primary' : 'text-foreground'
      }`}>
        {name}
      </span>
    </button>
  );
}
