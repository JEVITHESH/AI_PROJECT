import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { HistoryItem, PredictionResult } from './types';

const HISTORY_COLLECTION = 'prediction_history';

// Save a new history item to Firestore
export const saveHistoryItem = async (
    userId: string,
    chemicals: string[],
    result: PredictionResult
): Promise<HistoryItem> => {
    const docRef = await addDoc(collection(db, HISTORY_COLLECTION), {
        userId,
        chemicals,
        result,
        timestamp: serverTimestamp(),
        createdAt: Date.now() // fallback numeric timestamp
    });

    return {
        id: docRef.id,
        userId,
        chemicals,
        result,
        timestamp: Date.now()
    };
};

// Get history for a specific user from Firestore
export const getHistory = async (userId: string): Promise<HistoryItem[]> => {
    const q = query(
        collection(db, HISTORY_COLLECTION),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(50)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            userId: data.userId,
            chemicals: data.chemicals,
            result: data.result as PredictionResult,
            timestamp: data.createdAt || (data.timestamp instanceof Timestamp ? data.timestamp.toMillis() : Date.now())
        };
    });
};

// Delete a history item from Firestore
export const deleteHistoryItem = async (itemId: string): Promise<void> => {
    await deleteDoc(doc(db, HISTORY_COLLECTION, itemId));
};
