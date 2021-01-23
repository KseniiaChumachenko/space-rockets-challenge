import { DateTime } from 'luxon'

const DEFAULT_LOCALE = "en-US"

const DATE_OPTIONS = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}

const DATE_TIME_FORMAT_COMMON_OPTIONS = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
}

const USERS_DATE_TIME_FORMAT_OPTIONS = {
    ...DATE_TIME_FORMAT_COMMON_OPTIONS,
  timeZoneName: "short",
}

export function formatDate(timestamp) {
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, DATE_OPTIONS).format(new Date(timestamp));
}

export function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, USERS_DATE_TIME_FORMAT_OPTIONS).format(new Date(timestamp));
}

export function formatLocalDateTime(timestamp) {
  const dateTime = DateTime.fromISO(timestamp, { setZone: true, locale: DEFAULT_LOCALE })
  const offset = dateTime.offsetNameShort
  const dateTimeAsLocaleString = dateTime.toLocaleString(DATE_TIME_FORMAT_COMMON_OPTIONS)

  return dateTimeAsLocaleString + ' ' + offset
}
