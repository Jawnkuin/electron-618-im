import { remote } from 'electron';

export const closeCurrentWindow = () => {
  const curWind = remote.getCurrentWindow();
  curWind.close();
};

export const minimizeCurrentWindow = () => {
  const curWind = remote.getCurrentWindow();
  curWind.minimize();
};
