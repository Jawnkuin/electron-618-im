import { remote } from 'electron';

export const closeCurrentWindow = () => {
  const curWind = remote.getCurrentWindow();
  curWind.close();
};
