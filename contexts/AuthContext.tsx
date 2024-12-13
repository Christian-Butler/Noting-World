import { createContext, useContext, PropsWithChildren } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { IAuthContext } from '@/types';


const AuthContext = createContext<IAuthContext | null>(null);

// this hook can be used to access the session info
export function useSession() {
    const value = useContext(AuthContext);

    if(process.env.NODE_ENV !== 'production'){
        if(!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider>');
        }    
    }
    
    return value as IAuthContext;
}

export function SessionProvider(props: PropsWithChildren){
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: (token: string) => {
                    setSession(token);
                },
                signOut: () => {
                    setSession(null);
                },
                getToken: async () => session,
                session,
                isLoading
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

