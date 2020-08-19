import React from 'react'
import { AppRouter } from './components/routers/AppRouter'
import { Provider } from 'react-redux'
import { store } from './store/store'

export const CalendarApp = () => {
  return (
    <div>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  )
}
