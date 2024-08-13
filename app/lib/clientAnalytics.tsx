'use client';

import { useEffect } from 'react';
import { analytics, logEvent } from '@/lib/firebase';

export default function ClientAnalytics() {
    useEffect(() => {
        if (analytics) {
            const handleRouteChange = (url: string) => {
                if (analytics) {
                    logEvent(analytics, 'page_view', { page_path: url });
                }
            };

            handleRouteChange(window.location.pathname);

            const handlePopState = () => handleRouteChange(window.location.pathname);
            window.addEventListener('popstate', handlePopState);

            return () => {
                window.removeEventListener('popstate', handlePopState);
            };
        }
    }, []);

    return null;
}
