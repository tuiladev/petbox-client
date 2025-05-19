import { createSlice } from '@reduxjs/toolkit'
import i18n from '~/config/i18n'

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    currentLanguage: i18n.language || 'en'
  },
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload
      i18n.changeLanguage(action.payload)
    }
  }
})

export const { setLanguage } = languageSlice.actions

export const selectCurrentLanguage = (state) => state.language.currentLanguage

export default languageSlice.reducer
