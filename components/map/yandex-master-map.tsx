'use client';

import { useEffect, useRef, useState } from 'react';

type MasterMapItem = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  lat: number;
  lng: number;
  address?: string;
};

type Props = {
  masters: MasterMapItem[];
  selectedMarkerId: string | null;
  onMarkerClick: (id: string) => void;
  showRouting: boolean;
  recenterSignal: number;
  onUserLocationChange?: (coords: [number, number] | null) => void;
};

const FALLBACK_CENTER: [number, number] = [55.751244, 37.618423];

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function buildMasterMarkerHTML(master: MasterMapItem, selected: boolean) {
  const border = selected ? '#14c38e' : '#ffffff';
  const tail = selected ? '#14c38e' : '#ffffff';

  return `
    <div style="position:relative; width:72px; height:88px; transform:translate(-36px,-82px); pointer-events:auto;">
      <div style="
        position:absolute;
        left:50%;
        bottom:6px;
        transform:translateX(-50%);
        width:28px;
        height:10px;
        border-radius:999px;
        background:rgba(0,0,0,0.14);
        filter:blur(8px);
      "></div>

      <div style="position:absolute; left:50%; top:14px; transform:translateX(-50%);">
        <div style="
          width:48px;
          height:48px;
          overflow:hidden;
          border-radius:999px;
          border:3px solid ${border};
          background:#fff;
          box-shadow:${selected ? '0 10px 28px rgba(20,195,142,0.24)' : '0 10px 24px rgba(0,0,0,0.18)'};
          transition:all .18s ease;
        ">
          <img
            src="${escapeHtml(master.avatar)}"
            alt="${escapeHtml(master.name)}"
            draggable="false"
            style="width:100%;height:100%;object-fit:cover;display:block;user-select:none;-webkit-user-drag:none;"
          />
        </div>
        <div style="
          margin:-2px auto 0;
          width:0;
          height:0;
          border-left:8px solid transparent;
          border-right:8px solid transparent;
          border-top:10px solid ${tail};
        "></div>
      </div>

      <div style="
        position:absolute;
        top:4px;
        right:4px;
        display:flex;
        align-items:center;
        gap:2px;
        padding:2px 6px;
        border-radius:999px;
        background:#fff;
        border:1px solid rgba(255,255,255,0.9);
        box-shadow:0 6px 16px rgba(0,0,0,0.12);
        font-family:Inter,Arial,sans-serif;
        font-size:11px;
        font-weight:700;
        color:#111827;
        white-space:nowrap;
      ">
        <span style="color:#f4b63d;">★</span>
        <span>${Number(master.rating).toFixed(1)}</span>
      </div>
    </div>
  `;
}

function buildClusterHTML(count: number | string) {
  const safeCount = typeof count === 'string' ? Number.parseInt(count, 10) || 0 : count;
  return `
    <div style="
      width:48px;
      height:48px;
      border-radius:999px;
      display:flex;
      align-items:center;
      justify-content:center;
      background:linear-gradient(180deg,#19c992 0%, #13b886 100%);
      color:#fff;
      font-family:Inter,Arial,sans-serif;
      font-size:14px;
      font-weight:800;
      box-shadow:0 10px 24px rgba(20,195,142,0.28);
      border:4px solid rgba(255,255,255,0.92);
    ">
      ${safeCount}
    </div>
  `;
}

function buildUserMarkerHTML() {
  return `
    <div style="position:relative; width:28px; height:28px; transform:translate(-14px,-14px);">
      <div style="
        position:absolute;
        inset:-8px;
        border-radius:999px;
        background:rgba(20,184,134,0.18);
      "></div>
      <div style="
        position:absolute;
        inset:0;
        border-radius:999px;
        background:#14b886;
        border:3px solid #ffffff;
        box-shadow:0 8px 20px rgba(20,184,134,0.30);
      "></div>
    </div>
  `;
}

export function YandexMasterMap({
  masters,
  selectedMarkerId,
  onMarkerClick,
  showRouting,
  recenterSignal,
  onUserLocationChange,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const clustererRef = useRef<any>(null);
  const userPlacemarkRef = useRef<any>(null);
  const routeRef = useRef<any>(null);
  const placemarksRef = useRef<Map<string, any>>(new Map());
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);

  useEffect(() => {
    let destroyed = false;
    let initTimer: number | null = null;

    const waitAndInit = () => {
      if (destroyed) return;
      if (!containerRef.current) {
        initTimer = window.setTimeout(waitAndInit, 80);
        return;
      }
      if (!window.ymaps) {
        initTimer = window.setTimeout(waitAndInit, 80);
        return;
      }

      window.ymaps.ready(() => {
        if (destroyed || !containerRef.current || mapRef.current) return;

        const map = new window.ymaps.Map(
          containerRef.current,
          {
            center: FALLBACK_CENTER,
            zoom: 12,
            controls: [],
          },
          {
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true,
          }
        );

        map.behaviors.enable('drag');
        map.behaviors.enable('multiTouch');
        map.behaviors.enable('dblClickZoom');
        map.behaviors.enable('pinchZoom');

        const clusterer = new window.ymaps.Clusterer({
          groupByCoordinates: false,
          clusterDisableClickZoom: false,
          clusterOpenBalloonOnClick: false,
          clusterHideIconOnBalloonOpen: false,
          geoObjectHideIconOnBalloonOpen: false,
          preset: 'islands#invertedGreenClusterIcons',
          clusterIconLayout: window.ymaps.templateLayoutFactory.createClass(
            '<div>' + buildClusterHTML('{{ properties.geoObjects.length }}') + '</div>'
          ),
          clusterIconShape: {
            type: 'Circle',
            coordinates: [24, 24],
            radius: 24,
          },
        });

        map.geoObjects.add(clusterer);

        mapRef.current = map;
        clustererRef.current = clusterer;

        const createUserPlacemark = (coords: [number, number]) => {
          const userPlacemark = new window.ymaps.Placemark(
            coords,
            {},
            {
              iconLayout: 'default#imageWithContent',
              iconImageHref:
                'data:image/svg+xml;charset=UTF-8,' +
                encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"></svg>`
                ),
              iconImageSize: [28, 28],
              iconImageOffset: [-14, -14],
              iconContentOffset: [0, 0],
              iconContentLayout: window.ymaps.templateLayoutFactory.createClass(
                buildUserMarkerHTML()
              ),
              iconShape: {
                type: 'Circle',
                coordinates: [0, 0],
                radius: 14,
              },
              zIndex: 3000,
            }
          );

          map.geoObjects.add(userPlacemark);
          userPlacemarkRef.current = userPlacemark;
        };

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const coords: [number, number] = [
                pos.coords.latitude,
                pos.coords.longitude,
              ];

              setUserCoords(coords);
              onUserLocationChange?.(coords);
              map.setCenter(coords, 14, { duration: 300 });
              createUserPlacemark(coords);
            },
            () => {
              setUserCoords(FALLBACK_CENTER);
              onUserLocationChange?.(FALLBACK_CENTER);
              createUserPlacemark(FALLBACK_CENTER);
            },
            {
              enableHighAccuracy: true,
              timeout: 12000,
              maximumAge: 15000,
            }
          );
        } else {
          setUserCoords(FALLBACK_CENTER);
          onUserLocationChange?.(FALLBACK_CENTER);
          createUserPlacemark(FALLBACK_CENTER);
        }
      });
    };

    waitAndInit();

    return () => {
      destroyed = true;
      if (initTimer) window.clearTimeout(initTimer);
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
      clustererRef.current = null;
      userPlacemarkRef.current = null;
      routeRef.current = null;
      placemarksRef.current.clear();
    };
  }, [onUserLocationChange]);

  useEffect(() => {
    const map = mapRef.current;
    const clusterer = clustererRef.current;
    if (!map || !clusterer || !window.ymaps) return;

    clusterer.removeAll();
    placemarksRef.current.clear();

    const nextPlacemarks = masters.map((master) => {
      const placemark = new window.ymaps.Placemark(
        [master.lat, master.lng],
        {
          hintContent: master.name,
        },
        {
          iconLayout: 'default#imageWithContent',
          iconImageHref:
            'data:image/svg+xml;charset=UTF-8,' +
            encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="88"></svg>`
            ),
          iconImageSize: [72, 88],
          iconImageOffset: [-36, -82],
          iconContentOffset: [0, 0],
          iconContentLayout: window.ymaps.templateLayoutFactory.createClass(
            buildMasterMarkerHTML(master, selectedMarkerId === master.id)
          ),
          iconShape: {
            type: 'Rectangle',
            coordinates: [
              [-36, -82],
              [36, 6],
            ],
          },
          zIndex: selectedMarkerId === master.id ? 2500 : 1500,
          cursor: 'pointer',
          hideIconOnBalloonOpen: false,
          openEmptyBalloon: false,
          openEmptyHint: false,
        }
      );

      placemark.events.add('click', (e: any) => {
        e?.originalEvent?.domEvent?.stopPropagation?.();
        onMarkerClick(master.id);
      });

      placemarksRef.current.set(master.id, placemark);
      return placemark;
    });

    clusterer.add(nextPlacemarks);

    if (masters.length > 0 && !selectedMarkerId) {
      const bounds = clusterer.getBounds?.();
      if (bounds) {
        map.setBounds(bounds, {
          checkZoomRange: true,
          zoomMargin: [120, 18, 120, 18],
          duration: 250,
        });
      }
    }
  }, [masters, selectedMarkerId, onMarkerClick]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedMarkerId) return;

    const selected = masters.find((m) => m.id === selectedMarkerId);
    if (!selected) return;

    const currentZoom = map.getZoom?.() ?? 14;
    map.setCenter([selected.lat - 0.0025, selected.lng], Math.max(currentZoom, 15), {
      duration: 250,
    });
  }, [selectedMarkerId, masters]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !window.ymaps) return;

    if (routeRef.current) {
      map.geoObjects.remove(routeRef.current);
      routeRef.current = null;
    }

    const selected = masters.find((m) => m.id === selectedMarkerId);
    if (!showRouting || !selected || !userCoords) return;

    const multiRoute = new window.ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [userCoords, [selected.lat, selected.lng]],
        params: {
          routingMode: 'pedestrian',
        },
      },
      {
        boundsAutoApply: false,
        routeActiveStrokeColor: '#14c38e',
        routeActiveStrokeWidth: 6,
        routeStrokeColor: '#9adfca',
        routeStrokeWidth: 5,
        pinVisible: false,
        wayPointVisible: false,
        viaPointVisible: false,
      }
    );

    map.geoObjects.add(multiRoute);
    routeRef.current = multiRoute;
  }, [showRouting, selectedMarkerId, masters, userCoords]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !userCoords) return;
    map.setCenter(userCoords, 15, { duration: 250 });
  }, [recenterSignal, userCoords]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.10),rgba(255,255,255,0.02),rgba(255,255,255,0.04))]" />
    </div>
  );
}