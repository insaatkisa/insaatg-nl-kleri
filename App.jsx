import React, { useState } from 'react';
import { 
  Building2, 
  UserPlus, 
  History, 
  LogOut, 
  CheckCircle2, 
  AlertCircle,
  Users,
  Lock
} from 'lucide-react';

const INITIAL_USERS = [
  { id: 'u1', username: 'merkez', name: 'Merkez Yönetici', role: 'admin', site: 'Tüm Şantiyeler', pass: '123456' },
  { id: 'u2', username: 'santiye_bostanci', name: 'Ahmet Şef (Bostancı)', role: 'supervisor', site: 'Ebru Apartmanı', pass: '123456' }
];

const INITIAL_AUDIT_LOGS = [
  { id: 'l1', timestamp: new Date().toLocaleString('tr-TR'), user: 'Merkez Yönetici', action: 'KULLANICI_OLUSTURULDU', details: 'Ahmet Şef hesabı açıldı' }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [usersList, setUsersList] = useState(INITIAL_USERS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [newUser, setNewUser] = useState({ name: '', username: '', pass: '', role: 'supervisor', site: '' });
  const [userCreatedSuccess, setUserCreatedSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    const foundUser = usersList.find(
      u => u.username.toLowerCase() === usernameInput.toLowerCase().trim() && u.pass === passwordInput
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      addAuditLog(foundUser.name, 'GIRIS_YAPILDI', 'Sisteme başarıyla giriş yaptı');
    } else {
      setLoginError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  const handleLogout = () => {
    if (currentUser) {
      addAuditLog(currentUser.name, 'CIKIS_YAPILDI', 'Sistemden çıkış yaptı');
    }
    setCurrentUser(null);
    setUsernameInput('');
    setPasswordInput('');
  };

  const addAuditLog = (user, action, details) => {
    const newLog = {
      id: 'l_' + Date.now(),
      timestamp: new Date().toLocaleString('tr-TR'),
      user,
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUser.username || !newUser.pass || !newUser.name) return;

    const created = { id: 'u_' + Date.now(), ...newUser };
    setUsersList([...usersList, created]);
    addAuditLog(currentUser.name, 'YENI_KULLANICI_EKLENDI', `${newUser.name} (${newUser.role}) hesabı tanımlandı.`);
    
    setUserCreatedSuccess(true);
    setNewUser({ name: '', username: '', pass: '', role: 'supervisor', site: '' });
    setTimeout(() => setUserCreatedSuccess(false), 3000);
  };

  if (!currentUser) {
    return (
      <div className="h-screen w-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-600 via-amber-500 to-emerald-600"></div>

          <div className="text-center mb-8">
            <div className="bg-blue-50 w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-4 text-blue-600 border border-blue-100 shadow-inner">
              <Building2 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">KISA İNŞAAT</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">Şantiye Günlükleri & İş Akış Platformu</p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm font-medium">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Kullanıcı Adı</label>
              <input 
                type="text" 
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="merkez veya santiye_bostanci"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Şifre</label>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button 
              type="submit"
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 mt-6"
            >
              <Lock className="w-5 h-5" /> Güvenli Giriş Yap
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Hızlı Test Hesapları:</p>
            <div className="flex justify-center gap-2 text-xs">
              <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-mono">merkez / 123456</span>
              <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-mono">santiye_bostanci / 123456</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-100 flex flex-col font-sans">
      <header className="h-16 bg-slate-900 text-white shrink-0 px-4 md:px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm md:text-base leading-none">Şantiye Günlükleri</h1>
            <p className="text-[11px] text-slate-400 mt-1">{currentUser.site}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-white">{currentUser.name}</div>
            <div className="text-[10px] text-amber-400 font-semibold uppercase">{currentUser.role === 'admin' ? '👑 Merkez Yönetici' : '👷 Şantiye Şefi'}</div>
          </div>
          <button 
            onClick={handleLogout}
            title="Çıkış Yap"
            className="p-2.5 bg-slate-800 hover:bg-red-600/20 hover:text-red-400 text-slate-300 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {currentUser.role === 'admin' && (
        <div className="bg-white border-b border-slate-200 px-4 flex gap-2 shrink-0">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${activeTab === 'dashboard' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
          >
            📊 Ana Panel & Şantiye Takip
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
          >
            👥 Merkez Kullanıcı Yönetimi
          </button>
          <button 
            onClick={() => setActiveTab('logs')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${activeTab === 'logs' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
          >
            📜 Değişiklik İzi (Audit Log)
          </button>
        </div>
      )}

      <main className="flex-1 overflow-hidden p-4">
        {activeTab === 'users' && currentUser.role === 'admin' && (
          <div className="h-full grid grid-cols-1 md:grid-cols-12 gap-4 overflow-hidden">
            <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-y-auto">
              <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" /> Yeni Kullanıcı Tanımla
              </h2>
              <p className="text-xs text-slate-500 mb-6">Şantiye şefleri veya merkez yetkilileri için hesap açın.</p>

              {userCreatedSuccess && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Kullanıcı başarıyla oluşturuldu!
                </div>
              )}

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ad Soyad / Unvan</label>
                  <input 
                    type="text" 
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    placeholder="Mehmet Yılmaz"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kullanıcı Adı</label>
                  <input 
                    type="text" 
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    placeholder="mehmet_santiye"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Şifre</label>
                  <input 
                    type="password" 
                    value={newUser.pass}
                    onChange={(e) => setNewUser({...newUser, pass: e.target.value})}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rol / Yetki</label>
                  <select 
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="supervisor">👷 Şantiye Şefi (Saha Yetkisi)</option>
                    <option value="admin">👑 Merkez Yönetici (Tam Yetki)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Atanan Proje / Şantiye</label>
                  <input 
                    type="text" 
                    value={newUser.site}
                    onChange={(e) => setNewUser({...newUser, site: e.target.value})}
                    placeholder="Ebru Apartmanı"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3.5 rounded-xl text-sm shadow-md mt-2"
                >
                  Kullanıcıyı Kaydet
                </button>
              </form>
            </div>

            <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 shrink-0">
                <Users className="w-5 h-5 text-slate-700" /> Kayıtlı Kullanıcılar ({usersList.length})
              </h2>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {usersList.map((u) => (
                  <div key={u.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        {u.name}
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {u.role === 'admin' ? 'Merkez' : 'Şef'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Kullanıcı Adı: <span className="font-mono font-bold text-slate-700">{u.username}</span></div>
                      <div className="text-xs text-slate-400 mt-0.5">Şantiye: {u.site}</div>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-lg">Aktif</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && currentUser.role === 'admin' && (
          <div className="h-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2 shrink-0">
              <History className="w-5 h-5 text-amber-600" /> Sistem Değişiklik İzi (Audit Log)
            </h2>
            <p className="text-xs text-slate-500 mb-4 shrink-0">Kim, ne zaman, hangi veride değişiklik yaptı kaydı.</p>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{log.user}</span>
                      <span className="bg-slate-200 text-slate-700 font-mono text-[10px] px-2 py-0.5 rounded font-semibold">{log.action}</span>
                    </div>
                    <div className="text-slate-600 font-medium">{log.details}</div>
                  </div>
                  <div className="text-slate-400 text-[11px] font-mono shrink-0">{log.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="bg-emerald-50 p-4 rounded-full text-emerald-600 mb-4">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">1. Faz Kurulumu Başarılı!</h2>
            <p className="text-slate-500 text-sm max-w-md mb-6">
              Giriş ekranı, Merkez Kullanıcı Tanımlama ve Değişiklik İzi (Audit Log) altyapısı hazır.
            </p>
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl">
              Giriş Yapan: {currentUser.name} ({currentUser.site})
            </div>
          </div>
        )}
      </main>
    </div>
  );
}