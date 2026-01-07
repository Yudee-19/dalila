import { useState, useCallback, useRef } from 'react';

interface SelectableItem {
  _id: string;
}

interface UseDiamondSelectionProps<T extends SelectableItem = SelectableItem> {
  onSelectionChange?: (ids: string[], diamonds: T[]) => void;
}

export const useDiamondSelection = <T extends SelectableItem = SelectableItem>({ 
  onSelectionChange 
}: UseDiamondSelectionProps<T> = {}) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const onSelectionChangeRef = useRef(onSelectionChange);
  
  // Keep ref updated
  onSelectionChangeRef.current = onSelectionChange;

  const handleSelectAll = useCallback((checked: boolean, data: T[]) => {
    if (checked) {
      const allIds = new Set(data.map((row) => row._id));
      setSelectedRows(allIds);
      setSelectAll(true);
      if (onSelectionChangeRef.current) {
        onSelectionChangeRef.current(Array.from(allIds), data);
      }
    } else {
      setSelectedRows(new Set());
      setSelectAll(false);
      if (onSelectionChangeRef.current) {
        onSelectionChangeRef.current([], []);
      }
    }
  }, []);

  const handleRowSelect = useCallback((id: string, checked: boolean, allData: T[]) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelected = new Set(prevSelectedRows);
      if (checked) {
        newSelected.add(id);
      } else {
        newSelected.delete(id);
      }

      // Calculate selectAll state
      const allSelected = allData.length > 0 && newSelected.size === allData.length;
      
      // Use queueMicrotask to avoid nested state updates
      queueMicrotask(() => {
        setSelectAll(allSelected);
      });

      const selected = allData.filter((d) => newSelected.has(d._id));
      if (onSelectionChangeRef.current) {
        onSelectionChangeRef.current(Array.from(newSelected), selected);
      }

      return newSelected;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedRows(new Set());
    setSelectAll(false);
    if (onSelectionChangeRef.current) {
      onSelectionChangeRef.current([], []);
    }
  }, []);

  return {
    selectedRows,
    selectAll,
    handleSelectAll,
    handleRowSelect,
    clearSelection
  };
};


