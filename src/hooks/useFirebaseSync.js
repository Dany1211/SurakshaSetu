import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { COLLECTIONS } from '../services/firebaseService';
import { collection, query, orderBy, onSnapshot, doc, limit } from 'firebase/firestore';

/**
 * Hook to synchronize UI state directly from Firebase Firestore
 */
export const useFirebaseSync = () => {
    const [sosTickets, setSosTickets] = useState([]);
    const [globalAlerts, setGlobalAlerts] = useState([]);
    const [telemetry, setTelemetry] = useState({ wards: [], systemRisk: 'LOW' });
    const [resources, setResources] = useState(null);
    const [rescuers, setRescuers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Listen to SOS Tickets
        const qSos = query(collection(db, COLLECTIONS.SOS), orderBy('createdAt', 'desc'));
        const unsubSos = onSnapshot(qSos, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSosTickets(data);
        });

        // 2. Listen to Global Alerts
        const unsubAlerts = onSnapshot(doc(db, COLLECTIONS.ALERTS, 'global'), (docSnap) => {
            if (docSnap.exists()) {
                setGlobalAlerts(docSnap.data().alerts || []);
            }
        });

        // 3. Listen to latest telemetry (Dashboard state)
        const qTelemetry = query(collection(db, COLLECTIONS.TELEMETRY), orderBy('timestamp', 'desc'), limit(1));
        const unsubTelemetry = onSnapshot(qTelemetry, (snapshot) => {
            if (!snapshot.empty) {
                const latest = snapshot.docs[0].data();
                setTelemetry({
                    wards: latest.wards || [],
                    systemRisk: latest.systemRisk || 'LOW'
                });
            }
        });

        // 4. Listen to resources
        const unsubResources = onSnapshot(doc(db, COLLECTIONS.RESOURCES, 'global'), (docSnap) => {
            if (docSnap.exists()) {
                setResources(docSnap.data());
            }
        });

        // 5. Listen to rescuers (Mobile App)
        const unsubRescuers = onSnapshot(collection(db, COLLECTIONS.RESCUERS), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRescuers(data);
        });

        // Set initial loading complete after attaching listeners
        // (In a real app, might wait for first snapshots, but this is fine)
        setTimeout(() => setLoading(false), 500);

        return () => {
            unsubSos();
            unsubAlerts();
            unsubTelemetry();
            unsubResources();
            unsubRescuers();
        };
    }, []);

    return {
        sosTickets,
        globalAlerts,
        telemetry,
        systemRisk: telemetry.systemRisk,
        resources,
        rescuers,
        loading
    };
};
