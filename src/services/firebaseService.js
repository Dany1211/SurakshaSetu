import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp, setDoc, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export const COLLECTIONS = {
    TELEMETRY: 'telemetry_logs',
    ALERTS: 'active_alerts',
    SOS: 'sos_dispatch',
    RESOURCES: 'resources'
};

/**
 * Log a new telemetry reading to Firestore
 */
export const logTelemetry = async (wardsData, systemRisk) => {
    try {
        await addDoc(collection(db, COLLECTIONS.TELEMETRY), {
            timestamp: serverTimestamp(),
            wards: wardsData,
            systemRisk: systemRisk
        });
    } catch (error) {
        console.error("Error logging telemetry:", error);
    }
};

/**
 * Update the active global alerts
 */
export const updateActiveAlerts = async (alerts) => {
    try {
        // Just store the latest active alerts in a single standard document for simplicity
        await setDoc(doc(db, COLLECTIONS.ALERTS, 'global'), {
            alerts,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error updating alerts:", error);
    }
};

/**
 * Create a new SOS Dispatch ticket
 */
export const createSOSTicket = async (sosData) => {
    try {
        await addDoc(collection(db, COLLECTIONS.SOS), {
            ...sosData,
            status: "Pending", // Pending, Assigned, Resolved
            createdAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error creating SOS ticket:", error);
    }
};

/**
 * Update SOS status (assign, resolve, etc)
 */
export const updateSOSStatus = async (ticketId, newStatus) => {
    try {
        const ticketRef = doc(db, COLLECTIONS.SOS, ticketId);
        await updateDoc(ticketRef, {
            status: newStatus,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error updating SOS status:", error);
    }
};

/**
 * Initialize resources if not exists
 */
export const initializeResources = async (resourcesData) => {
    try {
        await setDoc(doc(db, COLLECTIONS.RESOURCES, 'global'), {
            buses: resourcesData.buses || { total: 450, active: 112 },
            boats: resourcesData.boats || { total: 45, active: 18 },
            ambulances: resourcesData.ambulances || { total: 110, active: 40 },
            updatedAt: serverTimestamp()
        }, { merge: true });
    } catch (error) {
        console.error("Error initializing resources:", error);
    }
};

/**
 * Real-time listener generic hook helper (used in useFirebaseSync)
 */
export const subscribeToCollection = (collectionName, callback) => {
    const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(data);
    });
};
