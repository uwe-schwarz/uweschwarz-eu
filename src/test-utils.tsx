import React from 'react'
import { render } from '@testing-library/react'
import { SettingsContext, type SettingsContextType } from './contexts/settings-hook'

export function renderWithSettings(ui: React.ReactElement, ctx?: Partial<SettingsContextType>) {
  const contextValue: SettingsContextType = {
    language: 'en',
    theme: 'light',
    setLanguage: () => {},
    setTheme: () => {},
    t: (text) => text['en'],
    ...ctx,
  }

  return render(
    <SettingsContext.Provider value={contextValue}>
      {ui}
    </SettingsContext.Provider>
  )
}
