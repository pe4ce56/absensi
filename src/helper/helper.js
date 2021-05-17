import styles from '../../styles.json';
import {create} from 'tailwind-rn';
const {tailwind, getColor} = create(styles);

function getHoursMinutes(time) {
  return time.split(':').slice(0, -1).join(':');
}

function getMS(time) {
  const timeParts = time.split(':');
  return +timeParts[0] * (60000 * 60) + +timeParts[1] * 60000;
}

function getAbsentTime(time, totalJam) {
  // +5 minutes for absent
  const minutes = parseInt(time.split(':')[1]) + parseInt(30 * totalJam) + 5;
  return `${time.split(':')[0]}:${minutes}:${time.split(':')[2]}`;
}
function getTimeNow() {
  return (
    new Date().getHours() +
    ':' +
    new Date().getMinutes() +
    ':' +
    new Date().getSeconds()
  );
}
function getStatus(time, absented, totalJam = 1) {
  const now = getTimeNow();

  const absentTime = getAbsentTime(time, totalJam);

  //   absented

  if (absented) {
    console.log(absented.waktu);
    if (getMS(absented.waktu) <= getMS(absentTime)) {
      return 'Sudah Absen';
    }
    if (getMS(absented.waktu) > getMS(absentTime)) {
      return 'Terlambat';
    }
  }

  //   absent not yet

  if (getMS(now) < getMS(time)) {
    return 'Belum Mulai';
  }
  //   schedulle start
  if (getMS(now) >= getMS(time) && getMS(now) <= getMS(absentTime)) {
    return 'Belum Absen';
  }
  if (getMS(now) > getMS(absentTime)) {
    return 'Tidak Absen';
  }
}

const getBackground = status => {
  switch (status) {
    case 'Sudah Absen':
      return getColor('ijo');
    case 'Terlambat':
      return getColor('kuning');
    case 'Tidak Absen':
      return getColor('abang');
    case 'Belum Absen':
      return getColor('biru');
    case 'Belum Mulai':
      return getColor('abu');
  }
};

module.exports = {
  getHoursMinutes,
  getStatus,
  getTimeNow,
  getBackground,
};
