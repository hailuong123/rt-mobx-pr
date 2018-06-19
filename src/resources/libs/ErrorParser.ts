import { runInAction } from 'mobx';
import globalStore from '../../modules/App/stores/GlobalStore';

export let doCatch = (error: Error, store: any, locale: any) => {
  runInAction(() => {
    try {
      if (store.errors === undefined) {
        throw new Error(`plz define msg key 'errors' in your store`);
      }
      const errors = JSON.parse(error.message) as any;
      for (let key in errors) {
        if (!errors.hasOwnProperty(key)) {
          continue;
        }
        
        if (store.errors[key] === undefined) {
          throw new Error(`plz define msg key '${key}' in your 'errors' object of your store`);
        }
        const msgKeys = errors[key];
        
        if (!Array.isArray(msgKeys)) {
          if (!locale.errors[msgKeys]) {
            throw new Error(`plz define msg key '${msgKeys}' in locale`);
          }
          store.errors[key].push(locale.errors[msgKeys][globalStore.lang]);
        } else {
          msgKeys.forEach(msgKey => {
            if (!locale.errors[msgKey]) {
              throw new Error(`plz define msg key '${msgKey}' in locale`);
            }
            store.errors[key].push(locale.errors[msgKey][globalStore.lang]);
          });
        }
      }
    } catch (internalError) {
      console.error('internalError', internalError);
      console.error('error', error);
    }
  });
};
