"use client";

import { useMemo, useRef, useState } from "react";
import {
  BadgeCheck,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  Star,
} from "lucide-react";

type MasterCardProps = {
  master: any;
  variant?: "default" | "compact" | "horizontal" | "nearby" | "search";
  onClick?: () => void;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function toText(value: any): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  if (!value || typeof value !== "object") return "";

  return (
    value.text ||
    value.label ||
    value.name ||
    value.title ||
    value.value ||
    value.displayName ||
    ""
  );
}

function resolveImage(value: any): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    return (
      value.url ||
      value.src ||
      value.image ||
      value.photo ||
      value.avatar ||
      value.thumbnail ||
      null
    );
  }
  return null;
}

function getPortfolio(master: any): string[] {
  const raw = Array.isArray(master?.portfolio)
    ? master.portfolio
    : Array.isArray(master?.images)
      ? master.images
      : Array.isArray(master?.photos)
        ? master.photos
        : Array.isArray(master?.gallery)
          ? master.gallery
          : [];

  const portfolio = raw.map(resolveImage).filter(Boolean) as string[];

  const cover =
    resolveImage(master?.cover) ||
    resolveImage(master?.image) ||
    resolveImage(master?.photo) ||
    resolveImage(master?.avatar);

  if (portfolio.length > 0) return portfolio;
  return cover ? [cover] : [];
}

function getName(master: any) {
  return (
    toText(master?.name) ||
    toText(master?.fullName) ||
    toText(master?.displayName) ||
    "Мастер"
  );
}

function getSubtitle(master: any) {
  return (
    toText(master?.specialty) ||
    toText(master?.profession) ||
    toText(master?.categoryName) ||
    toText(master?.category) ||
    toText(master?.title) ||
    ""
  );
}

function getAvatar(master: any) {
  return (
    resolveImage(master?.avatar) ||
    resolveImage(master?.image) ||
    resolveImage(master?.photo) ||
    resolveImage(master?.cover) ||
    null
  );
}

function getRating(master: any) {
  const rating = master?.rating;
  if (typeof rating === "number") return rating;
  if (typeof rating === "string") {
    const parsed = Number(rating.replace(",", "."));
    if (!Number.isNaN(parsed)) return parsed;
  }
  return 4.9;
}

function getReviewsCount(master: any) {
  if (typeof master?.reviewsCount === "number") return master.reviewsCount;
  if (typeof master?.reviews_count === "number") return master.reviews_count;
  if (Array.isArray(master?.reviews)) return master.reviews.length;
  if (typeof master?.reviews === "number") return master.reviews;
  return 0;
}

function formatDistance(value: any) {
  if (typeof value === "number") {
    return value < 1 ? `${Math.round(value * 1000)} м` : `${value.toFixed(1)} км`;
  }

  if (typeof value === "string" && value.trim()) return value;

  if (value && typeof value === "object") {
    if (typeof value.km === "number") {
      return value.km < 1 ? `${Math.round(value.km * 1000)} м` : `${value.km.toFixed(1)} км`;
    }
    if (typeof value.meters === "number") return `${value.meters} м`;
    if (typeof value.value === "number") return `${value.value} км`;
    if (isNonEmptyString(value.text)) return value.text;
    if (isNonEmptyString(value.label)) return value.label;
  }

  return "";
}

function formatPrice(value: any) {
  if (typeof value === "number") {
    return `от ${value.toLocaleString("ru-RU")} ₽`;
  }

  if (typeof value === "string" && value.trim()) {
    return value;
  }

  if (value && typeof value === "object") {
    if (typeof value.amount === "number") {
      return `от ${value.amount.toLocaleString("ru-RU")} ₽`;
    }
    if (typeof value.from === "number") {
      return `от ${value.from.toLocaleString("ru-RU")} ₽`;
    }
    if (typeof value.min === "number") {
      return `от ${value.min.toLocaleString("ru-RU")} ₽`;
    }
    if (isNonEmptyString(value.text)) return value.text;
    if (isNonEmptyString(value.label)) return value.label;
  }

  return "Цена по запросу";
}

function getNextSlot(master: any) {
  return (
    toText(master?.nextSlot) ||
    toText(master?.availableAt) ||
    toText(master?.slot) ||
    "Сегодня, 15:00"
  );
}

function getTags(master: any): string[] {
  const raw = Array.isArray(master?.tags)
    ? master.tags
    : Array.isArray(master?.services)
      ? master.services
      : Array.isArray(master?.categories)
        ? master.categories
        : [];

  return raw
    .map((item: any) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        return (
          item.title ||
          item.name ||
          item.label ||
          item.text ||
          item.serviceName ||
          item.categoryName ||
          ""
        );
      }
      return "";
    })
    .filter(Boolean)
    .slice(0, 3);
}

function FavoriteButton({
  initial,
}: {
  initial?: boolean;
}) {
  const [liked, setLiked] = useState(Boolean(initial));

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setLiked((prev) => !prev);
      }}
      className={[
        "absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-200 hover:scale-105",
        liked
          ? "border-rose-200 bg-rose-500 text-white shadow-[0_8px_20px_rgba(244,63,94,0.30)]"
          : "border-white/30 bg-white/90 text-muted-foreground shadow-premium-sm hover:text-foreground",
      ].join(" ")}
      aria-label="Добавить в избранное"
    >
      <Heart className={`h-[18px] w-[18px] ${liked ? "fill-current" : ""}`} />
    </button>
  );
}

function HeroSlider({
  master,
  heightClass = "h-[220px]",
  showOverlayMeta = true,
}: {
  master: any;
  heightClass?: string;
  showOverlayMeta?: boolean;
}) {
  const portfolio = useMemo(() => getPortfolio(master), [master]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const name = getName(master);
  const subtitle = getSubtitle(master);
  const avatar = getAvatar(master);
  const verified = Boolean(master?.verified ?? master?.isVerified ?? true);

  const handleScroll = () => {
    const node = scrollerRef.current;
    if (!node) return;
    const index = Math.round(node.scrollLeft / node.clientWidth);
    setActiveIndex(index);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className={`flex ${heightClass} snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {(portfolio.length ? portfolio : [null]).map((src, index) => (
          <div key={index} className="relative min-w-full snap-start">
            {src ? (
              <img
                src={src}
                alt={name}
                className="h-full w-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-accent via-muted to-secondary" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* Verified Badge */}
      <div className="absolute left-3 top-3 flex items-center gap-2">
        {verified && (
          <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-success/90 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
            <BadgeCheck className="h-3.5 w-3.5" />
            Проверен
          </div>
        )}
      </div>

      <FavoriteButton initial={master?.isFavorite || master?.favorite || master?.liked} />

      {showOverlayMeta && (
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border-2 border-white/30 bg-white/20 shadow-lg backdrop-blur-sm">
                  {avatar ? (
                    <img src={avatar} alt={name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/20 text-sm font-bold text-white">
                      {name.slice(0, 1)}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="truncate text-base font-bold leading-tight text-white">
                    {name}
                  </div>
                  <div className="truncate text-sm text-white/80">{subtitle}</div>
                </div>
              </div>
            </div>

            {portfolio.length > 1 && (
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/30 px-2.5 py-1.5 backdrop-blur-sm">
                {portfolio.map((_: unknown, index: number) => (
                  <span
                    key={index}
                    className={[
                      "block h-1.5 rounded-full transition-all duration-300",
                      index === activeIndex ? "w-4 bg-white" : "w-1.5 bg-white/50",
                    ].join(" ")}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DefaultCard({ master, onClick }: { master: any; onClick?: () => void }) {
  const tags = getTags(master);
  const rating = getRating(master);
  const reviews = getReviewsCount(master);
  const distance = formatDistance(master?.distance);
  const price = formatPrice(master?.priceFrom ?? master?.price ?? master?.fromPrice);
  const nextSlot = getNextSlot(master);

  return (
    <article
      onClick={onClick}
      className={[
        "premium-card overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm",
        onClick ? "cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium" : "",
      ].join(" ")}
    >
      <HeroSlider master={master} heightClass="h-[210px]" />

      <div className="p-4">
        {tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span>{rating}</span>
            <span className="font-medium text-muted-foreground">({reviews})</span>
          </div>

          {distance && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{distance}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="text-lg font-bold tracking-tight text-success">
            {price}
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock3 className="h-4 w-4" />
            <span>{nextSlot}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function NearbyCard({ master, onClick }: { master: any; onClick?: () => void }) {
  const name = getName(master);
  const subtitle = getSubtitle(master);
  const avatar = getAvatar(master);
  const tags = getTags(master);
  const rating = getRating(master);
  const reviews = getReviewsCount(master);
  const distance = formatDistance(master?.distance);
  const price = formatPrice(master?.priceFrom ?? master?.price ?? master?.fromPrice);

  return (
    <article
      onClick={onClick}
      className={[
        "premium-card overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm",
        onClick ? "cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium" : "",
      ].join(" ")}
    >
      <div className="relative">
        <HeroSlider master={master} heightClass="h-[180px]" showOverlayMeta={false} />

        <div className="absolute inset-x-0 bottom-0 p-3.5">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border-2 border-white/30 bg-white/20 shadow-lg backdrop-blur-sm">
                  {avatar ? (
                    <img src={avatar} alt={name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/20 text-sm font-bold text-white">
                      {name.slice(0, 1)}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="truncate text-[15px] font-bold leading-tight text-white">
                    {name}
                  </div>
                  <div className="truncate text-sm text-white/80">{subtitle}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span>{rating}</span>
            <span className="font-medium text-muted-foreground">({reviews})</span>
          </div>

          {distance && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{distance}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="text-base font-bold tracking-tight text-success">
            {price}
          </div>

          <div className="flex items-center text-muted-foreground">
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </article>
  );
}

function CompactCard({ master, onClick }: { master: any; onClick?: () => void }) {
  const image =
    getPortfolio(master)[0] || getAvatar(master) || "https://placehold.co/400x400/png";
  const name = getName(master);
  const subtitle = getSubtitle(master);
  const rating = getRating(master);
  const price = formatPrice(master?.priceFrom ?? master?.price ?? master?.fromPrice);
  const [liked, setLiked] = useState(Boolean(master?.isFavorite || master?.favorite || master?.liked));

  return (
    <article
      onClick={onClick}
      className={[
        "w-[176px] overflow-hidden rounded-[22px] border border-border bg-card shadow-premium-sm",
        onClick ? "cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium" : "",
      ].join(" ")}
    >
      <div className="relative h-[124px]">
        <img src={image} alt={name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked((prev) => !prev);
          }}
          className={[
            "absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
            liked
              ? "bg-rose-500 text-white shadow-lg"
              : "bg-white/90 text-muted-foreground backdrop-blur-sm hover:text-foreground",
          ].join(" ")}
          aria-label="Like"
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-3">
        <div className="truncate text-[13px] font-bold text-foreground">{name}</div>
        <div className="truncate text-[11px] text-muted-foreground">{subtitle}</div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            {rating}
          </div>
          <div className="text-sm font-semibold text-success">
            {price}
          </div>
        </div>
      </div>
    </article>
  );
}


function SearchCard({ master, onClick }: { master: any; onClick?: () => void }) {
  const avatar = getAvatar(master) || "https://placehold.co/120x120/png";
  const name = getName(master);
  const subtitle = getSubtitle(master);
  const rating = getRating(master);
  const reviews = getReviewsCount(master);
  const distance = formatDistance(master?.distance);
  const price = formatPrice(master?.priceFrom ?? master?.price ?? master?.fromPrice);
  const nextSlot = getNextSlot(master);
  const verified = Boolean(master?.verified ?? master?.isVerified ?? true);
  const tags = getTags(master).slice(0, 2);
  const [liked, setLiked] = useState(Boolean(master?.isFavorite || master?.favorite || master?.liked));

  return (
    <article
      onClick={onClick}
      className={[
        "premium-card overflow-hidden rounded-[24px] border border-border bg-card p-3 shadow-premium-sm",
        onClick ? "cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium" : "",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div className="h-[76px] w-[76px] shrink-0 overflow-hidden rounded-[18px] bg-secondary">
          <img src={avatar} alt={name} className="h-full w-full object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <div className="truncate text-[16px] font-bold leading-tight text-foreground">{name}</div>
                {verified && <BadgeCheck className="h-4 w-4 shrink-0 text-success" />}
              </div>
              <div className="mt-0.5 truncate text-[13px] text-muted-foreground">{subtitle}</div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLiked((prev) => !prev);
              }}
              className={[
                "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                liked
                  ? "border-rose-200 bg-rose-500 text-white shadow-lg"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground",
              ].join(" ")}
              aria-label="Like"
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            </button>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[12px]">
            <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 font-semibold text-amber-700">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>{rating}</span>
              <span className="font-medium text-amber-700/70">({reviews})</span>
            </div>

            {distance && (
              <div className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{distance}</span>
              </div>
            )}

            <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
              <Clock3 className="h-3.5 w-3.5" />
              <span className="truncate max-w-[110px]">{nextSlot}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 rounded-[18px] bg-secondary/55 px-3 py-2.5">
        <div className="min-w-0 flex flex-wrap items-center gap-1.5">
          {tags.length > 0 ? tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="inline-flex items-center rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
            >
              {tag}
            </span>
          )) : (
            <span className="text-[12px] text-muted-foreground">Свободные слоты сегодня</span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-[13px] font-bold text-success">{price}</div>
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white text-muted-foreground shadow-premium-sm">
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </article>
  );
}

function HorizontalCard({ master, onClick }: { master: any; onClick?: () => void }) {
  const avatar = getAvatar(master) || "https://placehold.co/120x120/png";
  const name = getName(master);
  const subtitle = getSubtitle(master);
  const rating = getRating(master);
  const reviews = getReviewsCount(master);
  const distance = formatDistance(master?.distance);
  const price = formatPrice(master?.priceFrom ?? master?.price ?? master?.fromPrice);
  const verified = Boolean(master?.verified ?? master?.isVerified ?? true);
  const [liked, setLiked] = useState(Boolean(master?.isFavorite || master?.favorite || master?.liked));

  return (
    <article
      onClick={onClick}
      className={[
        "premium-card flex items-center gap-4 rounded-2xl border border-border bg-card p-3.5 shadow-premium-sm",
        onClick ? "cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium" : "",
      ].join(" ")}
    >
      <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl">
        <img src={avatar} alt={name} className="h-full w-full object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <div className="truncate text-base font-bold text-foreground">
                {name}
              </div>
              {verified && <BadgeCheck className="h-4 w-4 shrink-0 text-success" />}
            </div>

            <div className="truncate text-sm text-muted-foreground">
              {subtitle}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiked((prev) => !prev);
            }}
            className={[
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
              liked
                ? "bg-rose-500 text-white shadow-lg"
                : "bg-secondary text-muted-foreground hover:text-foreground",
            ].join(" ")}
            aria-label="Like"
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-1 text-foreground">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <span className="font-semibold">{rating}</span>
            <span className="text-muted-foreground">({reviews})</span>
          </div>

          {distance && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{distance}</span>
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 text-right">
        <div className="text-sm font-bold text-success">{price}</div>
        <div className="mt-2 flex items-center justify-end text-muted-foreground">
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </article>
  );
}

export function MasterCard({
  master,
  variant = "default",
  onClick,
}: MasterCardProps) {
  if (variant === "compact") return <CompactCard master={master} onClick={onClick} />;
  if (variant === "horizontal") return <HorizontalCard master={master} onClick={onClick} />;
  if (variant === "nearby") return <NearbyCard master={master} onClick={onClick} />;
  if (variant === "search") return <SearchCard master={master} onClick={onClick} />;
  return <DefaultCard master={master} onClick={onClick} />;
}
