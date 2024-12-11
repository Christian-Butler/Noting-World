export interface NotesType {
    _id: string;
    title: string;
    description: string;
}

export interface NotesTypeID extends NotesType {
    _id: string;
}

export interface TagsType {
    _id: string;
    tag_name: string;
}



export interface IAuthContext {
    signIn: (token:string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}

export type IResponseType = NotesTypeID