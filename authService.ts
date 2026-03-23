import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    User as FirebaseUser,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { auth } from './firebaseConfig';
import { User } from './types';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Convert Firebase User to our app User type
const mapFirebaseUser = (fbUser: FirebaseUser): User => ({
    id: fbUser.uid,
    email: fbUser.email || '',
    name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User'
});

// Register with Email & Password
export const register = async (email: string, password: string, name: string): Promise<User> => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: name });
    return mapFirebaseUser(credential.user);
};

// Login with Email & Password
export const login = async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const token = await credential.user.getIdToken();
    return {
        user: mapFirebaseUser(credential.user),
        token
    };
};

// Google Sign-In
export const signInWithGoogle = async (): Promise<{ user: User; token: string }> => {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();
    return {
        user: mapFirebaseUser(result.user),
        token
    };
};

// Logout
export const logout = async (): Promise<void> => {
    await signOut(auth);
    localStorage.removeItem('auth_token');
};

// Auth State Listener
export const onAuthChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, (fbUser) => {
        callback(fbUser ? mapFirebaseUser(fbUser) : null);
    });
};

// Get current user
export const getCurrentUser = (): User | null => {
    const fbUser = auth.currentUser;
    return fbUser ? mapFirebaseUser(fbUser) : null;
};
