import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle, Users, Shield, Zap, ArrowRight, Menu, X } from 'lucide-react';

// Main App Component
export default function SubscriptionManagementApp() {
  const [currentPath, setCurrentPath] = useState('/');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = (path) => {
    setCurrentPath(path);
  };

  const login = async (email, password, role) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    
    // Accept any email/password combination
    const loggedInUser = {
      email: email,
      role: role,
      name: email.split('@')[0] // Use email prefix as name
    };
    
    setUser(loggedInUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  // Protected route logic
  const isProtected = (path, requiredRole = null) => {
    if (path.includes('/dashboard')) {
      if (!user) return false;
      if (requiredRole && user.role !== requiredRole) return false;
    }
    return true;
  };

  // Route rendering with proper centering
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <LandingPage user={user} navigate={navigate} />;
      case '/login':
        return user ? (
          user.role === 'admin' ? 
            <AdminDashboard user={user} logout={logout} navigate={navigate} /> : 
            <UserDashboard user={user} logout={logout} navigate={navigate} />
        ) : <LoginPage login={login} loading={loading} navigate={navigate} />;
      case '/user/dashboard':
        return isProtected(currentPath, 'user') ? 
          <UserDashboard user={user} logout={logout} navigate={navigate} /> : 
          <LandingPage user={user} navigate={navigate} />;
      case '/admin/dashboard':
        return isProtected(currentPath, 'admin') ? 
          <AdminDashboard user={user} logout={logout} navigate={navigate} /> : 
          <LandingPage user={user} navigate={navigate} />;
      default:
        return <LandingPage user={user} navigate={navigate} />;
    }
  };

  return (
    <div className="w-full min-h-screen">
      {renderPage()}
    </div>
  );
}

// Landing Page Component
function LandingPage({ user, navigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SubManager
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                Features
              </a>
              <a href="#about" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                About
              </a>
              {user ? (
                <button 
                  onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard')}
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Go to Dashboard
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Login
                </button>
              )}
            </nav>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 z-50">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                Features
              </a>
              <a href="#about" className="block text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                About
              </a>
              {user ? (
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
                  }}
                  className="block w-full bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-center"
                >
                  Go to Dashboard
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="block w-full bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-center"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Manage Your
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block">
                Subscriptions
              </span>
              Like a Pro
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed">
              Take control of your recurring payments with our powerful subscription management platform. 
              Track, optimize, and never miss a payment again.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {user ? (
                <button 
                  onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard')}
                  className="group bg-indigo-600 text-white px-10 py-4 rounded-xl hover:bg-indigo-700 transition-all duration-300 font-semibold text-lg flex items-center space-x-3 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/login')}
                  className="group bg-indigo-600 text-white px-10 py-4 rounded-xl hover:bg-indigo-700 transition-all duration-300 font-semibold text-lg flex items-center space-x-3 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
              
              <button className="text-gray-600 hover:text-indigo-600 transition-colors font-semibold text-lg flex items-center space-x-2">
                <span>Watch Demo</span>
                <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Why Choose SubManager?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to stay on top of your subscriptions in one beautiful, intuitive platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 hover:from-indigo-100 hover:to-indigo-200/50 transition-all duration-300 border border-indigo-200/50">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically track all your subscriptions and get intelligent insights about your spending patterns.
              </p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 hover:from-purple-100 hover:to-purple-200/50 transition-all duration-300 border border-purple-200/50">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Team Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Collaborate with team members and manage company-wide subscriptions with role-based access.
              </p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100/50 hover:from-pink-100 hover:to-pink-200/50 transition-all duration-300 border border-pink-200/50">
              <div className="w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-time Alerts</h3>
              <p className="text-gray-600 leading-relaxed">
                Never miss a payment or renewal with smart notifications and proactive spending alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-8">
            Ready to Take Control?
          </h2>
          <p className="text-xl text-indigo-100 mb-10">
            Join thousands of users who have already simplified their subscription management.
          </p>
          {!user && (
            <button 
              onClick={() => navigate('/login')}
              className="inline-flex items-center space-x-3 bg-white text-indigo-600 px-10 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg transform hover:scale-105 shadow-xl"
            >
              <span>Start Managing Today</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">SubManager</span>
            </div>
            <p className="text-gray-400">
              © 2025 SubManager. All rights reserved. Built with ❤ for better subscription management.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Login Page Component
function LoginPage({ login, loading, navigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!validateForm()) return;
    
    const result = await login(formData.email, formData.password, formData.role);
    
    if (result.success) {
      if (formData.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } else {
      setLoginError(result.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (loginError) setLoginError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button onClick={() => navigate('/')} className="inline-flex items-center space-x-3 mb-8 group">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              SubManager
            </span>
          </button>
          
          <h1 className="text-4xl font-black text-gray-900 mb-3">Welcome Back</h1>
          <p className="text-gray-600 text-lg">Sign in to manage your subscriptions</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8">
          <div className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Login as
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'user' }))}
                  className={`p-3 rounded-lg border-2 transition-all font-medium ${
                    formData.role === 'user'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <Users className="w-5 h-5 mx-auto mb-1" />
                  User
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'admin' }))}
                  className={`p-3 rounded-lg border-2 transition-all font-medium ${
                    formData.role === 'admin'
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <Shield className="w-5 h-5 mx-auto mb-1" />
                  Admin
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                  errors.email 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-indigo-500'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.password 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-indigo-500'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Login Error */}
            {loginError && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600 flex items-center space-x-2">
                  <span>❌</span>
                  <span>{loginError}</span>
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                formData.role === 'admin'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                  : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800'
              } text-white shadow-lg hover:shadow-xl ${
                loading ? 'opacity-75 cursor-not-allowed transform-none' : ''
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                Sign In as ${formData.role === 'admin' ? 'Admin' : 'User'}
              )}
            </button>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('/')} 
              className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Components
function UserDashboard({ user, logout, navigate }) {
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Users className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">User Dashboard</h2>
          <p className="text-gray-600 mb-6">
            This is where users would manage their personal subscriptions, view spending analytics, and manage payment methods.
          </p>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <p className="text-sm text-indigo-800">
              🚧 Coming Soon: Subscription management, spending analytics, payment methods, and more!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function AdminDashboard({ user, logout, navigate }) {
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Shield className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h2>
          <p className="text-gray-600 mb-6">
            This is where administrators would manage users, view system analytics, configure settings, and oversee the entire platform.
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-800">
              🚧 Coming Soon: User management, system analytics, billing oversight, and advanced admin tools!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}