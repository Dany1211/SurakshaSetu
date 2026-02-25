import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    User, Mail, Phone, MapPin, Shield,
    Bell, Globe, Moon, Lock, LogOut,
    Camera, ChevronRight, Edit3
} from 'lucide-react';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

const Profile = () => {
    const { language, setLanguage } = useLanguage();
    const [notifications, setNotifications] = useState({
        email: true,
        sms: true,
        push: true,
        criticalAlerts: true
    });

    const user = auth.currentUser;

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-[calc(100vh-72px)] bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-['Outfit']">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">Profile Settings</h1>
                        <p className="text-slate-500 mt-1 uppercase tracking-wider text-sm font-semibold">Manage your account and preferences</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                    {/* Left Column - User Info Card */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Identity Card */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 opacity-90 transition-transform duration-500 group-hover:scale-105" />

                            <div className="relative mt-12 flex flex-col items-center">
                                {/* Avatar */}
                                <div className="relative group/avatar">
                                    <div className="w-28 h-28 bg-white p-1.5 rounded-2xl shadow-xl rotate-3 transition-transform duration-300 group-hover/avatar:rotate-0">
                                        <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
                                            {user?.photoURL ? (
                                                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-12 h-12 text-slate-300" />
                                            )}
                                        </div>
                                    </div>
                                    <button className="absolute -bottom-3 -right-3 p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-transform active:scale-90 hover:-translate-y-1">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* User Details */}
                                <div className="text-center mt-6">
                                    <h2 className="text-2xl font-bold text-slate-800 mb-1">{user?.displayName || 'System Admin'}</h2>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-100 mb-4">
                                        <Shield className="w-3.5 h-3.5" /> Superuser
                                    </div>
                                    <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
                                        <Mail className="w-4 h-4" /> {user?.email || 'admin@surakshasetu.org'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info Card */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-800">Contact Information</h3>
                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                                    <Edit3 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">Phone Number</p>
                                        <p className="font-semibold text-slate-700">+91 98765 43210</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-0.5">Location Base</p>
                                        <p className="font-semibold text-slate-700">HQ - Mumbai Control Room</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Preferences */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Settings Blocks */}
                        <div className="grid sm:grid-cols-2 gap-6">

                            {/* App Preferences */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-blue-500" /> Preferences
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <label className="text-sm font-semibold text-slate-600 block mb-2">Display Language</label>
                                        <div className="relative">
                                            <select
                                                value={language}
                                                onChange={(e) => setLanguage(e.target.value)}
                                                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 font-medium py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                                            >
                                                <option value="en">English (EN)</option>
                                                <option value="hi">Hindi (HI)</option>
                                                <option value="mr">Marathi (MR)</option>
                                            </select>
                                            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-slate-600 block mb-2">Theme</label>
                                        <div className="flex p-1 bg-slate-100 rounded-xl">
                                            <button className="flex-1 py-2 text-sm font-bold bg-white text-slate-800 rounded-lg shadow-sm">Light</button>
                                            <button className="flex-1 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">Dark (Soon)</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-amber-500" /> Notifications
                                </h3>

                                <div className="space-y-4">
                                    {[
                                        { id: 'criticalAlerts', label: 'CRITICAL Status Alerts', color: 'red' },
                                        { id: 'push', label: 'Push Notifications', color: 'blue' },
                                        { id: 'email', label: 'Email Recap Reports', color: 'slate' },
                                        { id: 'sms', label: 'SMS Alerts (Field Only)', color: 'slate' },
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50 hover:bg-slate-50 transition-colors">
                                            <span className={`text-sm font-semibold ${item.color === 'red' ? 'text-red-600' : 'text-slate-700'}`}>{item.label}</span>
                                            <button
                                                onClick={() => toggleNotification(item.id)}
                                                className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none ${notifications[item.id] ? (item.color === 'red' ? 'bg-red-500' : 'bg-blue-500') : 'bg-slate-300'}`}
                                            >
                                                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${notifications[item.id] ? 'translate-x-5' : 'translate-x-0'}`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Security & Danger Zone */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-slate-400" /> Security
                            </h3>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <button className="flex-1 py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 transition-all active:scale-[0.98]">
                                    Change Password
                                </button>
                                <button className="flex-1 py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 transition-all active:scale-[0.98]">
                                    Two-Factor Auth (2FA)
                                </button>
                            </div>

                            <div className="pt-6 border-t border-slate-100">
                                <button
                                    onClick={handleLogout}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-all active:scale-[0.98] group"
                                >
                                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    Secure Logout
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
