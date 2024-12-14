export interface NotesType {
    _id: string;
    title: string;
    description: string;
}

export interface AuthorType {
    _id: string;
    first_name: string;
    last_name: string;
}

export interface TagsType{
    _id: string;
    tag_name:string;
}

export interface TagsTypeID extends TagsType {
    _id:string;
}

export interface AuthorTypeID extends AuthorType {
    _id: string
}

export interface NotesTypeID extends NotesType {
    _id: string;
}
export interface IAuthContext {
    session: any;
    isLoading: boolean;
    getToken: () => Promise<string | null>;
    signIn: (token:string) => void;
    signOut: () => void;
}

export type IResponseType = NotesTypeID | AuthorTypeID | TagsTypeID;