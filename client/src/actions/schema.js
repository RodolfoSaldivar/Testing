import { schema } from 'normalizr';

export const user = new schema.Entity('users', {}, { idAttribute: '_id' });
export const userArray = [user];
