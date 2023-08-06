import del from 'del';
/* global app */

export const reset = () => del(app.path.clean);
