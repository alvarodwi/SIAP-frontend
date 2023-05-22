import { format, parseISO } from 'date-fns/esm'
import { id } from 'date-fns/esm/locale'

export function formatISODateString(
	isoDate: string,
	stringFormat: string
): string {
	return formatDateString(parseISO(isoDate), stringFormat)
}

export function formatDateString(date: Date, stringFormat: string) {
	return format(date, stringFormat, {
		locale: id,
	})
}
