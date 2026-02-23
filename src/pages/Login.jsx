import { useState } from 'react';
import { ShieldAlert, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { loginUser } from '../services/firebaseService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', fontFamily: 'Outfit, sans-serif',
            padding: '20px'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '24px', padding: '40px',
                width: '100%', maxWidth: '420px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                display: 'flex', flexDirection: 'column', gap: '24px'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                    <div style={{
                        width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                        boxShadow: '0 10px 15px -3px rgba(220, 38, 38, 0.4)'
                    }}>
                        <ShieldAlert style={{ width: '32px', height: '32px', color: 'white' }} />
                    </div>
                    <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: 'white', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                        Suraksha Setu
                    </h1>
                    <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#94a3b8', fontWeight: 500 }}>
                        Disaster Command Center Login
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {error && (
                        <div style={{
                            padding: '12px', background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.2)',
                            borderRadius: '12px', color: '#fca5a5', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            <AlertCircle style={{ width: '16px', height: '16px' }} />
                            {error}
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Government ID (Email)</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '16px', top: '14px', width: '18px', height: '18px', color: '#64748b' }} />
                            <input
                                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                                style={{
                                    width: '100%', padding: '14px 16px 14px 44px', background: 'rgba(15, 23, 42, 0.6)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white',
                                    fontSize: '15px', outline: 'none', transition: 'border 0.2s ease', boxSizing: 'border-box'
                                }}
                                onFocus={e => e.target.style.borderColor = '#3b82f6'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                                placeholder="official@gov.in"
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Clearance Code (Password)</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '16px', top: '14px', width: '18px', height: '18px', color: '#64748b' }} />
                            <input
                                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                                style={{
                                    width: '100%', padding: '14px 16px 14px 44px', background: 'rgba(15, 23, 42, 0.6)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: 'white',
                                    fontSize: '15px', outline: 'none', transition: 'border 0.2s ease', boxSizing: 'border-box'
                                }}
                                onFocus={e => e.target.style.borderColor = '#3b82f6'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit" disabled={loading}
                        style={{
                            marginTop: '8px', padding: '16px', background: loading ? '#475569' : '#3b82f6', color: 'white',
                            border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 700,
                            cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s ease',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)', textTransform: 'uppercase', letterSpacing: '0.03em'
                        }}
                    >
                        {loading ? <Loader2 style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} /> : 'Authorize Access'}
                    </button>

                    <p style={{ textAlign: 'center', margin: '4px 0 0', fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                        This is a secure gateway. Unauthorized access is strictly prohibited.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
