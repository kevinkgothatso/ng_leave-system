export interface Irequest {
    id?: string,
    name: string,
    surname: string,
    start_date: string,
    end_date: string,
    days_taken?: number,
    days_left?: number,
    leave_type: string,
    reason: string
}

