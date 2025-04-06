
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, Lock } from 'lucide-react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('Weak');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const calculatePasswordStrength = (value) => {
    // This is a simple password strength calculator
    // In a real app, you would use a more sophisticated approach
    if (!value) return 'Weak';
    
    let strength = 0;
    
    // Length check
    if (value.length >= 8) strength += 1;
    
    // Contains uppercase
    if (/[A-Z]/.test(value)) strength += 1;
    
    // Contains number
    if (/\d/.test(value)) strength += 1;
    
    // Contains special char
    if (/[^A-Za-z0-9]/.test(value)) strength += 1;
    
    if (strength <= 1) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would validate and submit the new password
    
    // Navigate to the success page
    navigate('/reset-success');
  };

  return (
    <div className="min-h-screen bg-agritech-paleGreen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
        {/* Left side - Reset Password form */}
        <div className="p-8 md:p-12 w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h2>
          <p className="text-gray-600 mb-6">Create a new password for your farm account</p>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-agritech-green focus:border-agritech-green" 
                  placeholder="Create new password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="flex justify-between mt-1">
                <p className={`text-xs ${
                  passwordStrength === 'Weak' ? 'text-red-500' : 
                  passwordStrength === 'Medium' ? 'text-amber-500' : 
                  'text-green-500'
                }`}>{passwordStrength}</p>
                <p className="text-xs">Password Strength</p>
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  id="confirmPassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-agritech-green focus:border-agritech-green" 
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <div className="rounded-md p-4 bg-agritech-paleGreen">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Password Requirements</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-agritech-green mr-2" />
                  Minimum 8 characters
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-agritech-green mr-2" />
                  At least one uppercase letter
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-agritech-green mr-2" />
                  At least one number
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-agritech-green mr-2" />
                  At least one special character
                </li>
              </ul>
            </div>
            
            <button
              type="submit"
              className="w-full bg-agritech-green text-white py-3 px-4 rounded-md hover:bg-agritech-darkGreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-agritech-green"
              disabled={!password || !confirmPassword || password !== confirmPassword}
            >
              Reset Password
            </button>
          </form>
        </div>
        
        {/* Right side - Image and info */}
        <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/lovable-uploads/9e65a4cf-0605-4a02-81c7-8d19826077a5.png')" }}>
          <div className="h-full flex flex-col justify-between p-12 bg-gradient-to-b from-black/30 to-black/50">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 self-end">
              <div className="flex items-center mb-2">
                <Lock className="h-6 w-6 text-white" />
                <h3 className="ml-2 text-sm font-medium text-white">Security First</h3>
              </div>
              <p className="text-xs text-white/80">Your data is important to us</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mt-auto">
              <h3 className="text-xl font-bold text-white mb-2">Keep Your Account Safe</h3>
              <p className="text-white/80">Protect your farming data with a strong password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
