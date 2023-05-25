import { format, parseISO } from 'date-fns/esm'
import { id } from 'date-fns/esm/locale'

export function formatISODateString(
	isoDate: string | null,
	stringFormat: string
): string {
	return formatDateString(
		isoDate ? parseISO(isoDate) : new Date(),
		stringFormat
	)
}

export function formatDateString(date: Date, stringFormat: string) {
	return format(date, stringFormat, {
		locale: id,
	})
}
