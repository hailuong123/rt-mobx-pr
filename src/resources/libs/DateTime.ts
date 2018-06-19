import globalStore from '../../modules/App/stores/GlobalStore';

// tslint:disable-next-line:max-line-length
const formatTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

export let toLocalDate = (timestamp: number, offset: number): Date => {
  // create Date object for current location
  const date = new Date(timestamp);

  // convert to msec
  // add local time zone offset
  // get UTC time in msec
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);

  // create new Date object for different city
  // using supplied offset
  return new Date(utc + (3600000 * offset));
};

export let format = (timestamp: number, pattern: string): string => {
  const localDate = toLocalDate(timestamp, globalStore.myTZ);
  const tokens = pattern.match(formatTokens);
  if (!tokens) {
    return '';
  }

  let data = '';
  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    data += parse(localDate, token);
  }
  return data;
};

/**
 *
 * @param datetime {string} dd/mm/yyyy hh:mm
 */
export let localDateTimeToUTC = (datetime: string = ''): Number => {
  if (!/^(\d{1,2})\D(\d{1,2})\D(\d{4,})( ?(\d{1,2})\D(\d{1,2}))?$/.test(datetime)) {
    return 0;
  }
  const [DD, MM, YYYY, hh = 0, mm = 0] = datetime.replace(
    /^(\d{1,2})\D(\d{1,2})\D(\d{4})( ?(\d{1,2})\D(\d{1,2}))?$/, '$1 $2 $3 $5 $6'
  ).split(' ').map(Number);

  // tslint:disable-next-line:max-line-length
  return Date.parse(`${YYYY}-${padZero(MM)}-${padZero(DD)}T${padZero(hh)}:${padZero(mm)}:00${toTimezoneString(globalStore.myTZ)}`);
};

function parse(date: Date, pattern: string): string {
  switch (pattern) {
    case 'DD':
      return padZero(date.getDate());
    case 'MM':
      return padZero(date.getMonth());
    case 'YYYY':
      return '' + date.getFullYear();
    case 'hh':
      return padZero(date.getHours());
    case 'mm':
      return padZero(date.getMinutes());
    case 'ss':
      return padZero(date.getSeconds());
    default:
      return pattern;
  }
}

function padZero(num: number): string {
  return String(num < 10 ? '0' + num : num);
}

function toTimezoneString(num: number): string {
  const sign = num > 0 ? '+' : '-';
  const absNum = Math.abs(num);
  const h = Math.floor(absNum);
  const m = (absNum - h) * 60;
  return `${sign}${padZero(h)}:${padZero(m)}`;
}