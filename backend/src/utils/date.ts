
export class TimeUtils {

    static readonly ONE_DAY_MS = 24 * 60 * 60 * 1000

    static get oneYearFromNow() {
        return new Date(
            Date.now() + 365 * TimeUtils.ONE_DAY_MS
        )
    }

    static get thirtyDaysFromNow() {
        return new Date(
            Date.now() + 30 *  TimeUtils.ONE_DAY_MS
        )
    }

    static get fifteenMinutesFromNow() {
        return new Date(
            Date.now() + 15 * 60 * 1000
        )
    } 

}
