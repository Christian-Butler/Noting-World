export interface NotesType {
    _id: string;
    title: string;
    description: string;
}


export interface IAuthContext {
    signIn: (token:string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}