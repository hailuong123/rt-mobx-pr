
// import * as moment from 'moment';
import { duration } from 'moment';
import 'moment-duration-format';
import globalStore from '../modules/App/stores/GlobalStore';
import locale from '../resources/translator/locale';

interface Interval {
  label: string;
  seconds: number;
}

const intervals: Interval[] = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 0 } 
];

export const getTimeAge = (time: number) => {
  const dateCreate = new Date(time * 1000);
  const seconds = Math.floor((Date.now() - dateCreate.getTime()) / 1000);

  const interval = intervals.find(i => i.seconds < seconds) as Interval;
  if (!interval) {
    return '';
  }
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
};

const formatTime = (time: number): any => {
  const lang = globalStore.lang;
  var formatT: string;
  const years = duration(time, 'milliseconds').years();
  const months = duration(time, 'milliseconds').months();
  const days = duration(time, 'milliseconds').days();
  const hours = duration(time, 'milliseconds').hours();
  const minutes = duration(time, 'milliseconds').minutes();
  const seconds = duration(time, 'milliseconds').seconds();
  /* tslint:disable:no-string-literal */
  const YY = years > 1 ? `y [${locale.year['s'].en}]` 
                        : years === 1 ? `y [${locale.year[lang]}]` : '';

  const MM = months > 1 ? `M [${locale.month['s'].en}]` 
                        : months === 1 ? `M [${locale.month[lang]}]` : '';

  const DD = days > 1 ? `d [${locale.day['s'].en}]` 
                        : days === 1 ? `d [${locale.day[lang]}]` : '';

  const HH = hours > 1 ? `h [${locale.hour['s'].en}]`  
                        : hours === 1 ? `h [${locale.hour[lang]}]` : '';

  const MMin = minutes > 1 ? `m [${locale.minute['s'].en}]`  
                        : minutes === 1 ? `m [${locale.minute[lang]}]` : '';

  const SS = seconds > 1 ? `s [${locale.second['s'].en}]`  
                        : seconds === 1 ? `s [${locale.second[lang]}]` : '';
  
  if (years >= 1) {
    formatT = `${YY} ${MM} ${DD}`;
  } else if (months >= 1) {
    formatT = `${MM} ${DD} ${HH}`;
  } else if (days >= 1) {
    formatT = `${DD} ${HH} ${MMin}`;
  } else if (hours >= 1) {
    formatT = `${HH} ${MMin} ${locale.ago[lang]}`;
  } else if (minutes >= 1) {
    formatT = `${MMin} ${SS} ${locale.ago[lang]}`;
  } else if (seconds >= 30) {
    formatT = `${SS} ${locale.ago[lang]}`;
  } else {
    formatT = `${SS} ${locale.ago[lang]}`;
  }
  return formatT;
};

export const getTimeMoment = (time: number) => {
  
  const dateCreate = new Date(time);
  const seconds = (Date.now() - dateCreate.getTime());
  
  // const lang = globalStore.lang;
  const formatText = formatTime(seconds);
  const timeNow = duration(seconds, 'milliseconds').format(formatText);
  // const timeNow1 = moment.duration(60, 'milliseconds').format();
  
  return timeNow;
};
