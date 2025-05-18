import { useState, useEffect } from 'react';

/**
 * Hook for detecting if the window matches a media query
 * @param query The media query to match
 * @returns Whether the media query matches
 */
function useMediaQuery(query: string): boolean {
    const getMatches = (query: string): boolean => {
        // Prevents SSR issues
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches;
        }
        return false;
    };

    const [matches, setMatches] = useState<boolean>(getMatches(query));

    useEffect(() => {
        const matchMedia = window.matchMedia(query);

        // Handle change
        const handleChange = () => {
            setMatches(getMatches(query));
        };

        // Listen for changes
        if (matchMedia.addListener) {
            // Deprecated but needed for older browsers
            matchMedia.addListener(handleChange);
        } else {
            matchMedia.addEventListener('change', handleChange);
        }

        // Cleanup
        return () => {
            if (matchMedia.removeListener) {
                // Deprecated but needed for older browsers
                matchMedia.removeListener(handleChange);
            } else {
                matchMedia.removeEventListener('change', handleChange);
            }
        };
    }, [query]);

    return matches;
}

export default useMediaQuery;
