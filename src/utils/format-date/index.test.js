import { formatDate, formatDateTime, formatLocalDateTime } from './'

const ISO_TIMESTAMP = '2020-03-18T08:16:00-04:00'
const FORMATTED_DATE='Wednesday, March 18, 2020'
const FORMATTED_USERS_DATE_TIME = 'March 18, 2020, 1:16:00 PM GMT+1'
const FORMATTED_PROVIDED_DATE_TIME = 'March 18, 2020, 8:16:00 AM UTC-4'

it('Formats date', () => { expect(formatDate(ISO_TIMESTAMP)).toEqual(FORMATTED_DATE) })

it('Formats date-time in users timezone ', () => { expect(formatDateTime(ISO_TIMESTAMP)).toEqual(FORMATTED_USERS_DATE_TIME) })

it('Formats date-time in provided in timestamp timezone', () => { expect(formatLocalDateTime(ISO_TIMESTAMP)).toEqual(FORMATTED_PROVIDED_DATE_TIME) })
