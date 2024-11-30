import React, { createContext, useContext, useState, useCallback } from 'react';

interface WidgetContextType {
  deleteWidget: (id: string) => void;
  widgets: string[];
}

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

export function WidgetProvider({ children }: { children: React.ReactNode }) {
  const [widgets, setWidgets] = useState<string[]>([]);

  const deleteWidget = useCallback((id: string) => {
    setWidgets((prev) => prev.filter((widgetId) => widgetId !== id));
    // Dispatch a custom event that the widget was deleted
    window.dispatchEvent(new CustomEvent('widgetDeleted', { detail: { id } }));
  }, []);

  return (
    <WidgetContext.Provider value={{ deleteWidget, widgets }}>
      {children}
    </WidgetContext.Provider>
  );
}

export function useWidget() {
  const context = useContext(WidgetContext);
  if (context === undefined) {
    throw new Error('useWidget must be used within a WidgetProvider');
  }
  return context;
}
