import { useState } from 'react';
import { ShieldAlert, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { loginUser } from '../services/firebaseService';

const Login = () => {
    const [email, setEmail] = useState('official@gov.in');
    const [password, setPassword] = useState('admin123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await loginUser(email, password);
        } catch (err) {
            setError('Invalid credentials. Access denied by Suraksha Setu protocol.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#0f172a', /* Fallback */
            backgroundImage: 'radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 70%)',
            fontFamily: 'Outfit, sans-serif',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient background glow */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '800px', height: '800px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(0,0,0,0) 70%)',
                pointerEvents: 'none', zIndex: 0
            }} />

            <div style={{
                background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '28px', padding: '48px',
                width: '100%', maxWidth: '440px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.05)',
                display: 'flex', flexDirection: 'column', gap: '32px', zIndex: 1,
                position: 'relative'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                    <div style={{
                        width: '72px', height: '72px', borderRadius: '20px', background: 'linear-gradient(135deg, #ef4444, #991b1b)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
                        boxShadow: '0 10px 25px -5px rgba(220, 38, 38, 0.5), inset 0 2px 4px rgba(255,255,255,0.2)'
                    }}>
                        <ShieldAlert style={{ width: '36px', height: '36px', color: 'white' }} />
                    </div>
                    <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                        Suraksha Setu
                    </h1>
                    <p style={{ margin: '8px 0 0', fontSize: '15px', color: '#94a3b8', fontWeight: 500 }}>
                        Disaster Command Center Login
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {error && (
                        <div style={{
                            padding: '14px', background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.2)',
                            borderRadius: '12px', color: '#fca5a5', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px'
                        }}>
                            <AlertCircle style={{ width: '18px', height: '18px', flexShrink: 0 }} />
                            {error}
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Government ID (Email)</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '16px', top: '16px', width: '20px', height: '20px', color: '#64748b' }} />
                            <input
                                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                                style={{
                                    width: '100%', padding: '16px 16px 16px 48px', background: 'rgba(15, 23, 42, 0.8)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', color: '#f8fafc',
                                    fontSize: '16px', outline: 'none', transition: 'all 0.2s ease', boxSizing: 'border-box',
                                    fontWeight: 500
                                }}
                                onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.2)'; }}
                                onBlur={e => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.target.style.boxShadow = 'none'; }}
                                placeholder="official@gov.in"
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Clearance Code (Password)</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '16px', top: '16px', width: '20px', height: '20px', color: '#64748b' }} />
                            <input
                                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                                style={{
                                    width: '100%', padding: '16px 16px 16px 48px', background: 'rgba(15, 23, 42, 0.8)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', color: '#f8fafc',
                                    fontSize: '16px', outline: 'none', transition: 'all 0.2s ease', boxSizing: 'border-box',
                                    fontWeight: 500
                                }}
                                onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.2)'; }}
                                onBlur={e => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.target.style.boxShadow = 'none'; }}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit" disabled={loading}
                        style={{
                            marginTop: '12px', padding: '18px', background: loading ? '#475569' : 'linear-gradient(to right, #2563eb, #3b82f6)', color: 'white',
                            border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: 700,
                            cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                            boxShadow: loading ? 'none' : '0 10px 20px -5px rgba(37, 99, 235, 0.4)', textTransform: 'uppercase', letterSpacing: '0.03em'
                        }}
                    >
                        {loading ? <Loader2 style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} /> : 'Authorize Access'}
                    </button>

                    {/* Demo Credentials Box */}
                    <div style={{
                        marginTop: '16px', padding: '16px', background: 'rgba(59, 130, 246, 0.05)',
                        border: '1px dashed rgba(59, 130, 246, 0.3)', borderRadius: '12px', textAlign: 'center'
                    }}>
                        <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Authorized Demo Credentials
                        </p>
                        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px', color: '#cbd5e1', fontWeight: 500 }}>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                <span style={{ color: '#64748b' }}>ID:</span> <span style={{ color: '#60a5fa', fontWeight: 600 }}>official@gov.in</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                <span style={{ color: '#64748b' }}>Code:</span> <span style={{ color: '#e2e8f0', fontWeight: 600 }}>admin123</span>
                            </div>
                        </div>
                    </div>

                    <p style={{ textAlign: 'center', margin: '8px 0 0', fontSize: '13px', color: '#475569', fontWeight: 500 }}>
                        This is a secure gateway. Unauthorized access is strictly prohibited.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
