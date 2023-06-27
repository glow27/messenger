export const emailPattern = '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'

export const passwordPattern = '^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*[0-9])[a-zа-яёA-ZА-ЯЁ[0-9]]{8,40}$'

export const loginPattern = '^(?=.*[a-zA-Z])([a-zA-Z_0-9]|-){3,20}$'

export const phonePattern = '^[+]?[0-9]{10,15}$'

export const namePattern = '^[A-Z]{1}([a-z]|-)+$'
