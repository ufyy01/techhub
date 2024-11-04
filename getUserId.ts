import { getSession } from './getSession';

export const getUserId = async () => {
  const session = await getSession();
  return session?.id;
};
