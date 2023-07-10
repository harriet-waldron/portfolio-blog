import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import formatISO from 'date-fns/formatISO';
import parseISO from 'date-fns/parseISO';

export function normalizeCalendarDays(days) {
    const daysMap = days.reduce((map, day) => {
        map.set(day.date, day);
        return map;
    }, new Map());

    return eachDayOfInterval({
        start: parseISO(days[0].date),
        end: parseISO(days[days.length - 1].date),
    }).map((day) => {
        const date = formatISO(day, { representation: 'date' });

        if (daysMap.has(date)) {
            return daysMap.get(date);
        }

        return {
            date,
            count: 0,
            level: 0,
        };
    });
}