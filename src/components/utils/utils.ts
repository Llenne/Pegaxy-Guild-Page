import moment from 'moment';

export function durationAsString(ms: number, maxPrecision = 3) {
    const duration = moment.duration(ms)

    const items = []
    items.push({ timeUnit: 'd', value: Math.floor(duration.asDays()) })
    items.push({ timeUnit: 'h', value: duration.hours() })
    items.push({ timeUnit: 'm', value: duration.minutes() })
    items.push({ timeUnit: 's', value: duration.seconds() })

    const formattedItems = items.reduce((accumulator, { value, timeUnit }) => {
        if (accumulator.length >= maxPrecision || (accumulator.length === 0 && value === 0)) {
            return accumulator
        }

        // @ts-ignore
        accumulator.push(`${value}${timeUnit}`)
        return accumulator
    }, [])

    return formattedItems.length !== 0 ? formattedItems.join(' ') : '-'
}
