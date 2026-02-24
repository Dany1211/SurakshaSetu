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
            backgroundColor: '#eff6ff',
            backgroundImage: 'radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)',
            fontFamily: 'Outfit, sans-serif',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden'
        }}>

            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '24px', padding: '48px 40px',
                width: '100%', maxWidth: '420px',
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(37, 99, 235, 0.05)',
                display: 'flex', flexDirection: 'column', gap: '32px',
                position: 'relative', zIndex: 1
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '64px', height: '64px', borderRadius: '18px', background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                        boxShadow: '0 8px 16px -4px rgba(220, 38, 38, 0.3)'
                    }}>
                        <ShieldAlert style={{ width: '30px', height: '30px', color: 'white' }} />
                    </div>
                    <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
                        Suraksha Setu
                    </h1>
                    <p style={{ margin: '6px 0 0', fontSize: '15px', color: '#64748b', fontWeight: 500 }}>
                        Command Center Access
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {error && (
                        <div style={{
                            padding: '12px', background: '#fef2f2', border: '1px solid #fecaca',
                            borderRadius: '10px', color: '#dc2626', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            <AlertCircle style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                            {error}
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '16px', top: '16px', width: '20px', height: '20px', color: '#94a3b8' }} />
                            <input
                                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                                style={{
                                    width: '100%', padding: '16px 16px 16px 48px', background: '#f8fafc',
                                    border: '1px solid #e2e8f0', borderRadius: '14px', color: '#0f172a',
                                    fontSize: '15px', outline: 'none', transition: 'all 0.2s ease', boxSizing: 'border-box',
                                    fontWeight: 500
                                }}
                                onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; }}
                                onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
                                placeholder="Email Address"
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '16px', top: '16px', width: '20px', height: '20px', color: '#94a3b8' }} />
                            <input
                                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                                style={{
                                    width: '100%', padding: '16px 16px 16px 48px', background: '#f8fafc',
                                    border: '1px solid #e2e8f0', borderRadius: '14px', color: '#0f172a',
                                    fontSize: '15px', outline: 'none', transition: 'all 0.2s ease', boxSizing: 'border-box',
                                    fontWeight: 500
                                }}
                                onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; }}
                                onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit" disabled={loading}
                        style={{
                            marginTop: '8px', padding: '16px', background: loading ? '#94a3b8' : 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white',
                            border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: 600,
                            cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            boxShadow: loading ? 'none' : '0 8px 16px -4px rgba(37, 99, 235, 0.3)'
                        }}
                        onMouseOver={e => { if (!loading) { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 10px 20px -4px rgba(37, 99, 235, 0.4)'; } }}
                        onMouseOut={e => { if (!loading) { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 16px -4px rgba(37, 99, 235, 0.3)'; } }}
                    >
                        {loading ? <Loader2 style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} /> : 'Authorize Access'}
                    </button>

                    {/* Minimal Demo Credentials */}
                    <div style={{
                        display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'center', marginTop: '4px',
                        padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0'
                    }}>
                        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Demo Credentials</span>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>ID: <b style={{ color: '#2563eb' }}>official@gov.in</b></span>
                            <span style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>Code: <b style={{ color: '#0f172a' }}>admin123</b></span>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;
