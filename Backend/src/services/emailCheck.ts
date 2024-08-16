import type { Hub } from '../Models/hub';

export const verfyEmail = (email: string, hub: Hub): boolean => {

  const reg = /^([a-z/d-]+)@([^(gmail|yahoo|hotmail|aol|msn|ymail|live|icloud)])\.([a-z]{2,5})(\.[a-z]{2,5})?$/

  const name = hub.name.toLowerCase().replace(/[^a-z\d-]/g, '')

  if(email.includes(name) || reg.test(email) ) {
    return true
  }

  return false
}