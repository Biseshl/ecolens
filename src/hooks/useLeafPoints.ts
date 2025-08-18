import { useState, useEffect } from 'react';

const LEAF_POINTS_KEY = 'ecolens-leaf-points';
const SAVED_ITEMS_KEY = 'ecolens-saved-items';

export const useLeafPoints = () => {
  const [leafPoints, setLeafPoints] = useState(0);
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const storedPoints = localStorage.getItem(LEAF_POINTS_KEY);
    const storedItems = localStorage.getItem(SAVED_ITEMS_KEY);
    
    if (storedPoints) {
      setLeafPoints(parseInt(storedPoints, 10));
    }
    
    if (storedItems) {
      setSavedItems(new Set(JSON.parse(storedItems)));
    }
  }, []);

  const addLeafPoint = () => {
    const newPoints = leafPoints + 1;
    setLeafPoints(newPoints);
    localStorage.setItem(LEAF_POINTS_KEY, newPoints.toString());
  };

  const saveItem = (itemId: string) => {
    if (!savedItems.has(itemId)) {
      const newSavedItems = new Set(savedItems);
      newSavedItems.add(itemId);
      setSavedItems(newSavedItems);
      localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(Array.from(newSavedItems)));
      addLeafPoint();
      return true;
    }
    return false;
  };

  const unsaveItem = (itemId: string) => {
    if (savedItems.has(itemId)) {
      const newSavedItems = new Set(savedItems);
      newSavedItems.delete(itemId);
      setSavedItems(newSavedItems);
      localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(Array.from(newSavedItems)));
      return true;
    }
    return false;
  };

  const isItemSaved = (itemId: string) => savedItems.has(itemId);

  return {
    leafPoints,
    savedItems: Array.from(savedItems),
    saveItem,
    unsaveItem,
    isItemSaved,
    addLeafPoint
  };
};