'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { ROLE_HOME_ROUTES, SCREEN_PATHS } from '@/lib/routes';

export default function Page() {
  const router = useRouter();
  const { userRole } = useApp();

  useEffect(() => {
    if (!userRole) {
      router.replace(SCREEN_PATHS.splash);
      return;
    }

    router.replace(ROLE_HOME_ROUTES[userRole]);
  }, [router, userRole]);

  return null;
}
