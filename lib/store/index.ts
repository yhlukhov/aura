import { atomWithStorage } from 'jotai/utils'
import { getDefaultLocation } from './utils'

export const locationAtom = atomWithStorage('location', getDefaultLocation())
export const languageAtom = atomWithStorage('language', '')
export const countryAtom = atomWithStorage('country', '')