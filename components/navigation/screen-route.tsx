'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import type { AppScreen } from '@/lib/types';
import { ROLE_HOME_ROUTES, ROLE_ROUTE_SETS } from '@/lib/routes';

interface ScreenRouteProps {
  screen: AppScreen;
  canAccess?: boolean;
  fallbackHref?: string;
  children: React.ReactNode;
}

/**
 * Compatibility wrapper for legacy screen components while migrating to file-based routes.
 */
export function ScreenRoute({ screen, canAccess = true, fallbackHref, children }: ScreenRouteProps) {
  const router = useRouter();
  const { userRole } = useApp();

  const isRoleAllowed = !userRole || ROLE_ROUTE_SETS[userRole].includes(screen);
  const targetFallback = !isRoleAllowed && userRole ? ROLE_HOME_ROUTES[userRole] : fallbackHref;

  useEffect(() => {
    if ((!canAccess || !isRoleAllowed) && targetFallback) {
      router.replace(targetFallback);
    }
  }, [canAccess, isRoleAllowed, router, targetFallback]);

  if (!canAccess || !isRoleAllowed) {
    return null;
  }

  return <>{children}</>;
}
