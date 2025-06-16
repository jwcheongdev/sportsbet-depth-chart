import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
    const mockKey = 'testKey';
    const mockInitialValue = { name: 'initial-value' };
    
    beforeEach(() => {
        // Clear localStorage before each test
        window.localStorage.clear();
        // Mock localStorage methods
        jest.spyOn(window.localStorage, 'getItem');
        jest.spyOn(window.localStorage, 'setItem');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return initial value when no value is stored', () => {
        const { result } = renderHook(() => useLocalStorage(mockKey, mockInitialValue));
        expect(result.current[0]).toEqual(mockInitialValue);
    });

    it('should return stored value when it exists in localStorage', () => {
        const storedValue = { name: 'stored-value' };
        window.localStorage.setItem(mockKey, JSON.stringify(storedValue));
        
        const { result } = renderHook(() => useLocalStorage(mockKey, mockInitialValue));
        expect(result.current[0]).toEqual(storedValue);
    });

    it('should update both state and localStorage when setValue is called', () => {
        const { result } = renderHook(() => useLocalStorage(mockKey, mockInitialValue));
        const newValue = { name: 'new-value' };

        act(() => {
            result.current[1](newValue);
        });

        expect(result.current[0]).toEqual(newValue);
    });
}); 