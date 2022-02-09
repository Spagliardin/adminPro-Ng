import { User } from './../models/user.model';

export interface LoadingUsers {
    total: number;
    users: User[];
}