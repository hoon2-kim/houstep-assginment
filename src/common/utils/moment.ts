import * as moment from 'moment-timezone';

/** 한국시간대로 변경해주는 함수 */
export function convertToKST(date: Date | string) {
  return moment(date).tz('Asia/Seoul').format('YYYY-MM-DD');
}
