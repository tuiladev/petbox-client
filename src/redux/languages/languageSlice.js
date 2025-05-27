import { createSlice } from '@reduxjs/toolkit'
import i18n from '~/config/i18nConfig'

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    currentLanguage: i18n.language || 'vi'
  },
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload
      i18n.changeLanguage(action.payload)
    }
  }
})

export const { setLanguage } = languageSlice.actions

export const selectLanguage = (state) => state.language.currentLanguage

export default languageSlice.reducer
