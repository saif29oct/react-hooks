// __tests__/useDebounce.test.tsx
import { renderHook, act } from '@testing-library/react';
import useDebounce from '../src/hooks/useDebounce';

describe('useDebounce', () => {
    jest.useFakeTimers();

    it('should return the initial value without delay', () => {
        const { result } = renderHook(() => useDebounce('hello', 500));
        expect(result.current).toBe('hello');
    });

    it('should debounce the value after delay', () => {
        const { rerender, result } = renderHook(({ value }) => useDebounce(value, 500), {
            initialProps: { value: 'hello' },
        });

        // Still the initial value before timer finishes
        expect(result.current).toBe('hello');

        // Update input value
        rerender({ value: 'world' });

        // Debounced value should still be old one before timeout
        expect(result.current).toBe('hello');

        // Fast-forward time
        act(() => {
            jest.advanceTimersByTime(500);
        });

        // Now debounced value should update
        expect(result.current).toBe('world');
    });

    it('should cancel previous timeout when value updates', () => {
        const { rerender, result } = renderHook(({ value }) => useDebounce(value, 500), {
            initialProps: { value: 'first' },
        });

        // Update twice quickly without waiting for delay
        rerender({ value: 'second' });
        rerender({ value: 'third' });

        // Should still be original value
        expect(result.current).toBe('first');

        // Advance past delay
        act(() => {
            jest.advanceTimersByTime(500);
        });

        // Only the last value should remain
        expect(result.current).toBe('third');
    });
});
