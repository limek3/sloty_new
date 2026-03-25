"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/lib/app-context";
import { categories } from "@/lib/mock-data";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { StateCard } from "@/components/ui/state-card";
import {
  Search,
  Bell,
  ChevronRight,
  Crown,
  Sparkles,
  Scissors,
  Hand,
  Flower2,
  Wand2,
  ArrowRight,
  Palette,
  Droplet,
  Eye,
  Heart,
  TicketPercent,
  CalendarClock,
  Zap,
  Clock3,
  MapPin,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

type CategoryLike = {
  id?: string;
  slug?: string;
  key?: string;
  name?: string;
  title?: string;
  label?: string;
  nameRu?: string;
  nameEn?: string;
  count?: number;
};

export function HomeScreen() {
  const { t, navigate, masters, userName, language, userRole, setLanguage, setSelectedCategory } = useApp();
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const isRu = language === "ru";

  const availableTodayMasters = useMemo(
    () =>
      [...masters]
        .filter((master) => {
          const slot = master?.nextAvailable?.toLowerCase?.() ?? "";
          return slot.includes("сегодня") || slot.includes("today");
        })
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
        .slice(0, 6),
    [masters],
  );

  const promoCards = useMemo(
    () => [
      {
        id: "first",
        badge: "-15%",
        title: isRu ? "Скидка на первый визит" : "First visit discount",
        description:
          isRu
            ? "Лучшие мастера с выгодным первым посещением"
            : "Top masters with a great first-booking offer",
        icon: TicketPercent,
        classes:
          "from-emerald-50 via-white to-emerald-100 border-emerald-200/70 text-emerald-700 dark:from-emerald-200/18 dark:via-teal-100/8 dark:to-cyan-200/14 dark:border-emerald-200/28 dark:text-emerald-100",
      },
      {
        id: "today",
        badge: isRu ? "Сегодня" : "Today",
        title: isRu ? "Горящие окна сегодня" : "Hot slots today",
        description:
          isRu
            ? "Свободные слоты на ближайшие часы"
            : "Available slots in the next few hours",
        icon: Zap,
        classes:
          "from-amber-50 via-white to-orange-100 border-amber-200/70 text-amber-700 dark:from-amber-200/16 dark:via-rose-100/8 dark:to-orange-200/14 dark:border-amber-200/28 dark:text-amber-100",
      },
      {
        id: "week",
        badge: isRu ? "ТОП" : "TOP",
        title: isRu ? "Спецпредложения недели" : "Weekly specials",
        description:
          isRu
            ? "Подборка выгодных beauty-услуг"
            : "Curated beauty deals for this week",
        icon: Sparkles,
        classes:
          "from-violet-50 via-white to-fuchsia-100 border-violet-200/70 text-violet-700 dark:from-violet-200/16 dark:via-indigo-100/8 dark:to-fuchsia-200/14 dark:border-violet-200/28 dark:text-violet-100",
      },
    ],
    [isRu],
  );

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setSelectedCategory(categoryId);
    navigate("search");
  };

  const getCategoryKey = (category: CategoryLike) =>
    `${category?.id ?? ""} ${category?.slug ?? ""} ${category?.key ?? ""} ${category?.name ?? ""} ${
      category?.title ?? ""
    } ${category?.label ?? ""}`.toLowerCase();

  const getCategoryLabel = (category: CategoryLike) => {
    if (isRu) {
      return category?.nameRu || category?.name || category?.title || category?.label || "Категория";
    }
    return category?.nameEn || category?.name || category?.title || category?.label || "Category";
  };

  const getCategoryIcon = (category: CategoryLike): LucideIcon => {
    const key = getCategoryKey(category);
    if (key.includes("manicure") || key.includes("маник")) return Hand;
    if (key.includes("pedicure") || key.includes("педик")) return Sparkles;
    if (key.includes("hair") || key.includes("парикмах") || key.includes("barber") || key.includes("барбер")) return Scissors;
    if (key.includes("makeup") || key.includes("макияж")) return Palette;
    if (key.includes("massage") || key.includes("массаж")) return Heart;
    if (key.includes("cosmet") || key.includes("космет")) return Droplet;
    if (key.includes("brow") || key.includes("бров")) return Eye;
    if (key.includes("lash") || key.includes("ресниц")) return Sparkles;
    if (key.includes("flower") || key.includes("beauty") || key.includes("уход")) return Flower2;
    return Wand2;
  };

  const getCategoryTone = (category: CategoryLike) => {
    const key = getCategoryKey(category);
    if (key.includes("manicure") || key.includes("маник")) {
      return {
        bg: "bg-gradient-to-br from-rose-50 via-pink-50/90 to-red-50 dark:from-rose-200/18 dark:via-pink-200/14 dark:to-red-200/16",
        text: "text-rose-500 dark:text-rose-100",
        border: "border-rose-200/75 dark:border-rose-200/30",
      };
    }
    if (key.includes("pedicure") || key.includes("педик")) {
      return {
        bg: "bg-gradient-to-br from-sky-50 via-blue-50/85 to-cyan-50 dark:from-sky-200/18 dark:via-blue-200/14 dark:to-cyan-200/16",
        text: "text-blue-500 dark:text-blue-100",
        border: "border-sky-200/75 dark:border-sky-200/30",
      };
    }
    if (key.includes("hair") || key.includes("парикмах") || key.includes("barber") || key.includes("барбер")) {
      return {
        bg: "bg-gradient-to-br from-emerald-50 via-green-50/90 to-teal-50 dark:from-emerald-200/18 dark:via-green-200/14 dark:to-teal-200/16",
        text: "text-green-600 dark:text-green-100",
        border: "border-emerald-200/75 dark:border-emerald-200/30",
      };
    }
    if (key.includes("makeup") || key.includes("макияж")) {
      return {
        bg: "bg-gradient-to-br from-violet-50 via-purple-50/90 to-fuchsia-50 dark:from-violet-200/18 dark:via-purple-200/14 dark:to-fuchsia-200/16",
        text: "text-violet-500 dark:text-violet-100",
        border: "border-violet-200/75 dark:border-violet-200/30",
      };
    }
    if (key.includes("massage") || key.includes("массаж")) {
      return {
        bg: "bg-gradient-to-br from-cyan-50 via-sky-50/85 to-blue-50 dark:from-cyan-200/18 dark:via-sky-200/14 dark:to-blue-200/16",
        text: "text-cyan-600 dark:text-cyan-100",
        border: "border-cyan-200/75 dark:border-cyan-200/30",
      };
    }
    if (key.includes("cosmet") || key.includes("космет")) {
      return {
        bg: "bg-gradient-to-br from-amber-50 via-orange-50/90 to-rose-50 dark:from-amber-200/18 dark:via-orange-200/14 dark:to-rose-200/16",
        text: "text-orange-500 dark:text-orange-100",
        border: "border-orange-200/75 dark:border-orange-200/30",
      };
    }
    if (key.includes("brow") || key.includes("бров")) {
      return {
        bg: "bg-gradient-to-br from-lime-50 via-emerald-50/90 to-teal-50 dark:from-lime-200/18 dark:via-emerald-200/14 dark:to-teal-200/16",
        text: "text-emerald-600 dark:text-emerald-100",
        border: "border-lime-200/75 dark:border-lime-200/30",
      };
    }
    if (key.includes("lash") || key.includes("ресниц")) {
      return {
        bg: "bg-gradient-to-br from-teal-50 via-cyan-50/85 to-emerald-50 dark:from-teal-200/18 dark:via-cyan-200/14 dark:to-emerald-200/16",
        text: "text-teal-600 dark:text-teal-100",
        border: "border-teal-200/75 dark:border-teal-200/30",
      };
    }
    return {
      bg: "bg-gradient-to-br from-slate-50 via-zinc-50 to-stone-100 dark:from-slate-200/18 dark:via-zinc-200/14 dark:to-stone-200/18",
      text: "text-slate-500 dark:text-slate-100",
      border: "border-slate-200/80 dark:border-slate-200/30",
    };
  };

  const sectionHeaderClass = "text-[12px] font-semibold tracking-tight text-foreground";
  const sectionActionClass =
    "inline-flex items-center gap-1 rounded-full border border-border/70 bg-card px-2.5 py-1 text-[13px] font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800";

  return (
    <div className="app-shell">
      <header className="sticky top-0 z-40 px-3 pt-3">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[28px] border border-border/70 bg-card p-2 shadow-[0_10px_34px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-3 px-1 pb-2 pt-1">
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-slate-500">{t("greeting")},</p>
                <h1 className="truncate text-[12px] font-bold tracking-tight text-slate-900">
                  {userName}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLanguage(language === "ru" ? "en" : "ru")}
                  aria-label="Toggle language"
                  className="flex h-10 w-10 items-center justify-center rounded-[16px] border border-border/70 bg-[#f7f7f5] text-[12px] font-bold text-slate-600 transition hover:bg-card"
                >
                  {language.toUpperCase()}
                </button>

                <button
                  onClick={() => navigate("notifications")}
                  aria-label="View notifications"
                  className="relative flex h-10 w-10 items-center justify-center rounded-[16px] border border-border/70 bg-[#f7f7f5] text-slate-500 transition hover:bg-card"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[13px] font-bold text-white">
                    2
                  </span>
                </button>
              </div>
            </div>

            <button
              onClick={() => navigate("search")}
              className="group flex h-10 w-full items-center gap-3 rounded-[18px] border border-border/70 bg-[#f7f7f5] px-3 text-left transition hover:bg-card"
            >
              <Search className="h-4 w-4 text-slate-400 transition-colors group-hover:text-emerald-600" />
              <span className="text-[12px] text-slate-400">{t("searchPlaceholder")}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-5 px-4 py-4">
        <section>
          <button
            onClick={() => navigate("create-request")}
            className="group relative w-full overflow-hidden rounded-[24px] border border-amber-200/70 bg-gradient-to-r from-amber-50 via-white to-orange-50 p-3 text-left shadow-[0_8px_26px_rgba(15,23,42,0.05)] dark:border-amber-200/28 dark:from-amber-200/15 dark:via-rose-100/7 dark:to-orange-200/13"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[16px] border border-amber-200 bg-card shadow-sm dark:border-amber-200/25 dark:bg-slate-800/65">
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-1.5 py-0.5 text-[7px] font-bold text-white shadow-sm">
                    VIP
                  </span>
                  <Crown className="h-4 w-4 text-amber-600" />
                </div>

                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-slate-900 dark:text-slate-100">{t("createRequest")}</p>
                  <p className="mt-0.5 text-[13px] leading-4 text-slate-500 dark:text-slate-300">
                    {isRu ? "Получите отклики от лучших мастеров" : "Get responses from top masters"}
                  </p>
                </div>
              </div>

              <div className="shrink-0 rounded-full border border-amber-200 bg-card p-1.5 shadow-sm transition-transform group-hover:translate-x-0.5 dark:border-amber-200/25 dark:bg-slate-800/65">
                <ArrowRight className="h-3.5 w-3.5 text-amber-600" />
              </div>
            </div>
          </button>
        </section>

        <section>
          <div className="mb-2.5 flex items-center justify-between">
            <h2 className={sectionHeaderClass}>{t("categories")}</h2>
            <button onClick={() => navigate("search")} className={sectionActionClass}>
              {t("viewAll")}
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-x-3 gap-y-4">
            {categories.slice(0, 8).map((category: CategoryLike, index: number) => {
              const categoryId = category?.id || category?.slug || category?.key || `category-${index}`;
              const Icon = getCategoryIcon(category);
              const tone = getCategoryTone(category);
              const isActive = activeCategoryId === categoryId;

              return (
                <button
                  key={categoryId}
                  onClick={() => handleCategoryClick(categoryId)}
                  className="group flex flex-col items-center text-center"
                >
                  <div
                    className={[
                      "relative flex h-[52px] w-[52px] items-center justify-center rounded-[18px] border transition-all duration-200 group-hover:-translate-y-[1px]",
                      tone.bg,
                      tone.border,
                      isActive
                        ? "scale-[1.02] shadow-[0_10px_22px_rgba(15,23,42,0.12)]"
                        : "shadow-[0_4px_14px_rgba(15,23,42,0.05)] group-hover:shadow-[0_8px_18px_rgba(15,23,42,0.08)]",
                    ].join(" ")}
                  >
                    <Icon className={`h-5 w-5 ${tone.text}`} strokeWidth={1.9} />
                    {typeof category.count === "number" && (
                      <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full border border-white/70 bg-white/85 px-1 text-[13px] font-bold text-slate-500 shadow-[0_2px_6px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-slate-700/70 dark:bg-slate-900/85 dark:text-slate-200">
                        {category.count}
                      </span>
                    )}
                  </div>

                  <span className="mt-1.5 text-[12px] font-medium leading-3 text-slate-700 dark:text-slate-200">
                    {getCategoryLabel(category)}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-emerald-600" />
              <h2 className={sectionHeaderClass}>
                {isRu ? "Быстрая запись сегодня" : "Quick booking today"}
              </h2>
            </div>

            <button onClick={() => navigate("search")} className={sectionActionClass}>
              {t("viewAll")}
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {availableTodayMasters.length === 0 ? (
            <StateCard
              icon={CalendarClock}
              className="rounded-[20px] p-4"
              title={isRu ? "Свободных слотов на сегодня нет" : "No available slots today"}
              description={
                isRu
                  ? "Попробуйте изменить категорию или посмотреть мастеров рядом."
                  : "Try changing category or browsing nearby masters."
              }
              primaryAction={{
                label: isRu ? "Сменить категорию" : "Change category",
                onClick: () => setActiveCategoryId(null),
              }}
              secondaryAction={{
                label:
                  userRole === "master"
                    ? isRu
                      ? "Панель мастера"
                      : "Master dashboard"
                    : isRu
                      ? "Открыть поиск"
                      : "Open search",
                onClick: () => navigate(userRole === "master" ? "master-dashboard" : "search"),
              }}
            />
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
              {availableTodayMasters.map((master) => (
                <button
                  key={master.id}
                  onClick={() => navigate("search")}
                  className="w-[220px] shrink-0 rounded-[22px] border border-border/70 bg-card p-3 text-left shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition hover:-translate-y-[1px] hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={master.avatar}
                      alt={master.name}
                      className="h-[52px] w-[52px] rounded-[16px] object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <div className="truncate text-[12px] font-semibold leading-tight text-slate-900">
                          {master.name}
                        </div>
                        {master.verified && (
                          <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        )}
                      </div>

                      <div className="mt-0.5 truncate text-[12px] text-slate-500">
                        {master.specialization}
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[13px] font-medium text-emerald-700">
                          <Clock3 className="h-2.5 w-2.5" />
                          {master.nextAvailable || (isRu ? "Сегодня" : "Today")}
                        </span>

                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[13px] font-medium text-slate-600">
                          <MapPin className="h-2.5 w-2.5" />
                          {typeof master.distance === "number"
                            ? master.distance < 1
                              ? `${Math.round(master.distance * 1000)} ${isRu ? "м" : "m"}`
                              : `${master.distance} ${isRu ? "км" : "km"}`
                            : isRu
                              ? "Рядом"
                              : "Nearby"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3">
                    <div className="text-[13px] font-bold text-emerald-600">
                      {isRu ? "от " : "from "}
                      {master.priceFrom.toLocaleString("ru-RU")} ₽
                    </div>

                    <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1.5 text-[12px] font-semibold text-white shadow-[0_10px_20px_rgba(16,185,129,0.22)]">
                      {isRu ? "Запись" : "Book"}
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TicketPercent className="h-4 w-4 text-emerald-600" />
              <h2 className={sectionHeaderClass}>
                {isRu ? "Акции и спецпредложения" : "Promotions & special offers"}
              </h2>
            </div>

            <button onClick={() => navigate("search")} className={sectionActionClass}>
              {t("viewAll")}
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            {promoCards.map((promo) => {
              const Icon = promo.icon;
              return (
                <button
                  key={promo.id}
                  onClick={() => navigate("search")}
                  className={`group w-full overflow-hidden rounded-[24px] border bg-gradient-to-r p-4 text-left shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)] ${promo.classes}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="inline-flex rounded-full border border-current/10 bg-card/75 px-2.5 py-1 text-[12px] font-semibold dark:bg-slate-800/80">
                        {promo.badge}
                      </div>
                      <h3 className="mt-3 text-[12px] font-semibold leading-tight text-slate-900 dark:text-slate-100">
                        {promo.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-4 text-slate-500 dark:text-slate-300">{promo.description}</p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-card/80 shadow-sm dark:bg-slate-800/85">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-slate-900 dark:text-slate-100">
                    {isRu ? "Смотреть предложения" : "View offers"}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
