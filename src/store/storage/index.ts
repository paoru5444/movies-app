import { createMMKV } from 'react-native-mmkv';

const mmkv = createMMKV({
  id: 'secure-storage',
  encryptionKey: process.env.ENCRYPT_STORAGE,
});

export default function storage() {
  const set = (key: string, value: any): void => {
    mmkv.set(key, JSON.stringify(value));
  };

  const get = (key: string) => {
    const value = mmkv.getString(key);
    return value ? JSON.parse(value) : null;
  };

  const remove = (key: string) => {
    mmkv.remove(key);
  };

  return {
    set,
    get,
    remove,
  };
}
