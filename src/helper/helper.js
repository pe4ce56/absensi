import styles from '../../styles.json';
import {create} from 'tailwind-rn';

import {JAM_PELAJARAN} from '../config/config';

const {tailwind, getColor} = create(styles);
function addMinutes(time, minsToAdd) {
  function D(J) {
    return (J < 10 ? '0' : '') + J;
  }

  var piece = time.split(':');

  var mins = piece[0] * 60 + +piece[1] + +minsToAdd;

  return D(((mins % (24 * 60)) / 60) | 0) + ':' + D(mins % 60) + ':' + piece[2];
}

function getHoursMinutes(time, mins = 0) {
  time = addMinutes(time, mins);
  return time.split(':').slice(0, -1).join(':');
}

function getMS(time) {
  const timeParts = time.split(':');
  return +timeParts[0] * (60000 * 60) + +timeParts[1] * 60000;
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
  // +5 minutes for absent
  // 40 minutes per jam
  const absentTime = addMinutes(time, JAM_PELAJARAN * totalJam + 5);
  //   absented

  if (absented) {
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

const convertSchedule = absents => {
  let combined = [];
  for (const [i, absen] of absents.entries()) {
    const index = combined.findIndex(
      comb =>
        comb?.mapel.id === absen.mapel.id &&
        comb?.teacher.id === absen.teacher.id,
    );
    if (index > -1) {
      combined[index]['end'] = i + 1;
      combined[index]['total'] += 1;
    } else {
      absen['start'] = i + 1;
      absen['total'] = 1;
      combined.push(absen);
    }
  }
  return combined;
};

module.exports = {
  getHoursMinutes,
  getStatus,
  getTimeNow,
  getBackground,
  convertSchedule,
};
