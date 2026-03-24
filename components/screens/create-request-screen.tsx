'use client';

import { useState } from 'react';
import { useApp } from '@/lib/app-context';
import { categories } from '@/lib/mock-data';
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function CreateRequestScreen() {
  const { t, language, goBack, navigate, createRequest, userName } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const isRu = language === 'ru';
  const isValid = title && description && category && budget && location;

  const handleSubmit = () => {
    if (!isValid) return;

    createRequest({
      title,
      description,
      category,
      budget: parseInt(budget, 10),
      location,
      preferredDate: preferredDate || undefined,
      preferredTime: preferredTime || undefined,
      authorName: userName,
    });

    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f6f6f3] px-4 safe-top safe-bottom">
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 animate-scale-in">
            <CheckCircle2 className="h-7 w-7 text-emerald-600" />
          </div>

          <h1 className="animate-slide-up text-center text-[12px] font-bold text-slate-900">
            {isRu ? 'Заявка опубликована!' : 'Request Published!'}
          </h1>

          <p
            className="animate-slide-up mt-1.5 max-w-sm text-center text-[12px] leading-[1.4] text-slate-500"
            style={{ animationDelay: '0.1s' }}
          >
            {isRu
              ? 'Мастера скоро начнут откликаться на вашу заявку'
              : 'Masters will start responding to your request soon'}
          </p>

          <Button
            className="animate-slide-up mt-5 h-10 w-full max-w-sm rounded-[12px] bg-emerald-500 text-[13px] font-semibold text-white shadow-[0_12px_26px_rgba(16,185,129,0.2)] hover:bg-emerald-600"
            style={{ animationDelay: '0.2s' }}
            onClick={() => navigate('requests')}
          >
            {isRu ? 'Мои заявки' : 'My Requests'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell safe-bottom">
      <header className="sticky top-0 z-40 px-3 pt-3">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[22px] border border-border/70 bg-card p-2.5 shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <div className="flex items-start gap-2.5 px-0.5 pb-1 pt-0.5">
              <button
                onClick={goBack}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-border/70 bg-[#f7f7f5] text-slate-700 transition hover:bg-card"
                aria-label={isRu ? 'Назад' : 'Back'}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <h1 className="truncate text-[12px] font-bold tracking-tight text-slate-900">
                    {t('newRequest')}
                  </h1>
                </div>

                <p className="mt-0.5 text-[12px] leading-[1.4] text-slate-500">
                  {isRu
                    ? 'Опишите задачу, и мастера сами откликнутся'
                    : 'Describe your request and masters will respond'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-2.5 px-3 py-3">
        <div className="rounded-[18px] border border-border/70 bg-card p-2.5 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="title" className="text-[12px] font-medium text-slate-700">
                {t('requestTitle')} *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  isRu
                    ? 'Например: Нужен маникюр на свадьбу'
                    : 'E.g. Need a manicure for wedding'
                }
                className="h-9 rounded-[12px] border-border/70 bg-[#fafaf8] text-[13px] shadow-none"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="description" className="text-[12px] font-medium text-slate-700">
                {t('requestDescription')} *
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  isRu
                    ? 'Опишите подробно, что вам нужно, какие пожелания...'
                    : 'Describe in detail what you need, preferences...'
                }
                className="min-h-20 resize-none rounded-[12px] border-border/70 bg-[#fafaf8] text-[13px] shadow-none"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[12px] font-medium text-slate-700">
                {t('categories')} *
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-9 rounded-[12px] border-border/70 bg-[#fafaf8] text-[13px] shadow-none">
                  <SelectValue
                    placeholder={isRu ? 'Выберите категорию' : 'Select category'}
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.id}
                      value={isRu ? cat.nameRu : cat.name}
                    >
                      {cat.icon} {isRu ? cat.nameRu : cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="budget" className="text-[12px] font-medium text-slate-700">
                {t('budget')} (₽) *
              </Label>
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder={isRu ? 'Ваш бюджет в рублях' : 'Your budget in rubles'}
                className="h-9 rounded-[12px] border-border/70 bg-[#fafaf8] text-[13px] shadow-none"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="location" className="text-[12px] font-medium text-slate-700">
                {t('location')} *
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={isRu ? 'Район, метро или адрес' : 'District, metro or address'}
                className="h-9 rounded-[12px] border-border/70 bg-[#fafaf8] text-[13px] shadow-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <Label htmlFor="date" className="text-[12px] font-medium text-slate-700">
                  {t('preferredDate')}
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="h-9 rounded-[12px] border-border/70 bg-[#fafaf8] text-[13px] shadow-none"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="time" className="text-[12px] font-medium text-slate-700">
                  {t('preferredTime')}
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="h-9 rounded-[12px] border-border/70 bg-[#fafaf8] text-[13px] shadow-none"
                />
              </div>
            </div>

            <div className="rounded-[12px] bg-[#f7f7f5] px-2.5 py-2 text-[13px] leading-[1.4] text-slate-500">
              {isRu
                ? '* Обязательные поля. После публикации заявки мастера смогут откликаться на неё.'
                : '* Required fields. After publishing, masters will be able to respond.'}
            </div>
          </div>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 safe-bottom">
        <div className="rounded-[18px] border border-border/70 bg-card p-2 shadow-[0_8px_26px_rgba(15,23,42,0.08)]">
          <Button
            className="h-10 w-full rounded-[12px] bg-emerald-500 text-[13px] font-semibold text-white shadow-[0_12px_26px_rgba(16,185,129,0.2)] hover:bg-emerald-600"
            disabled={!isValid}
            onClick={handleSubmit}
          >
            {t('publishRequest')}
          </Button>
        </div>
      </div>
    </div>
  );
}
