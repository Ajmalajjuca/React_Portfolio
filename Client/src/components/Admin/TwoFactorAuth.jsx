import React, { useState, useEffect } from 'react';
import {LoaderCircleIcon, Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, setAuthError, setAuthLoading } from '../../Redux/Slice/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState('');
  const dispatch = useDispatch();
  const {error, loading} = useSelector(state => state.auth);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setAuthError(null));
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpCode.length === 6) {
      axios.post('http://localhost:5000/verify-otp', { otp: otpCode })
        .then(response => {
          localStorage.setItem('token', response.data.token);
          if (response.data.message === "OTP verified successfully") {
            dispatch(setIsAuthenticated(true));
            navigate('/admin/dashboard');
          }
        })
        .catch(error => {
          
          console.error('Error verifying OTP:', error);
          dispatch(setAuthError(error.response.data.message));
          dispatch(setAuthLoading(false));
        });
    }
  };

  const handleSend = () => {
    setLoad(true);
    axios.post('http://localhost:5000/send-otp',)
      .then(response => {
        toast.success('OTP sent successfully');
      })
      .catch(error => {
        console.error('Error sending OTP:', error);
        toast.error('Error sending OTP');
      });
      setLoad(false);
  }



  return (
    <div className="max-w-md mx-auto p-6 flex flex-col items-center justify-center h-screen">
      <div className="w-full text-center space-y-4 mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Two-Factor authentication
        </h1>
        <p className="text-gray-600 text-sm">
          Enter the 6-digit verification code sent to the email address linked to the admin account to confirm this action.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otpCode}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '');
            if (value.length <= 6) {
              setOtpCode(value);
            }
          }}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg tracking-widest"
          maxLength={6}
        />

        <button
          type="submit"
          disabled={otpCode.length !== 6}
          className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <LoaderCircleIcon className="w-4 h-4 animate-spin" /> : 'Verify'}
        </button>
      </form>

      <div className="mt-6 text-center space-y-4 flex flex-col items-center justify-center" >
        <p className="text-sm text-gray-600 flex items-center gap-2 ">
          Can't get the verification code?{' '}
          <button
            disabled={load}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm hover:cursor-pointer "
            onClick={handleSend}
          >
            
            {load ? <LoaderCircleIcon className="w-4 h-4 animate-spin" /> : <Send/>}
          </button>
        </p>

          



      </div>
    </div>
  );
};

export default TwoFactorAuth;
