export interface Way {
    id: number;
    title: string;
    description: string;
}

export interface Differences {
    way: string;
    easy: string;
    program: string;
}

export type MainTabType = 'feedback' | 'main' | 'effect';

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
};

export type Comment = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
};

export interface Pagination {
    page: number;
    limit: number;
    total: number;
}
