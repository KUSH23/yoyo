export class Ticket {
    constructor(
        public id:number,
        public project: string,
        public order: string,
        public ticket_id: string,
        public comments: string,
        public t_expense: string,
        public status: string,
        public request_type: string,
        public source: string,
        public sales_manager: string,
        public engineer: string,
        public scheduled_date: string,
        public start_date: string,
        public stop_date: string,
    ){}
}

