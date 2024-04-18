import { atomWithStorage } from 'jotai/utils';

export const idAtom = atomWithStorage('id', '');
export const usernameAtom = atomWithStorage('username', '');
export const emailAtom = atomWithStorage('email', '');
export const tokenAtom = atomWithStorage('token', '');
