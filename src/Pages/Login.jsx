import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiEye, FiEyeOff, FiCloud } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8)
            newErrors.password = 'Password must be at least 8 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token, user } = await loginUser(formData);
            toast.success('Login successful!');

            // Save token to localStorage or context
            localStorage.setItem('token', token);

            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="text-center">
                    <FiCloud className="mx-auto text-green-600 text-5xl" />
                    <h2 className="mt-4 text-3xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="mt-2 text-sm text-gray-600">Sign in to access Eco Region AI</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="text-gray-400" />
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-2 border ${errors.username
                                        ? 'border-red-400 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                                        } rounded-md shadow-sm placeholder-gray-400 sm:text-sm`}
                                    placeholder="Username"
                                />
                            </div>
                            {errors.username && (
                                <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-10 py-2 border ${errors.password
                                        ? 'border-red-400 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                                        } rounded-md shadow-sm placeholder-gray-400 sm:text-sm`}
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2 px-4 bg-green-600 text-white rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition disabled:opacity-50"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don’t have an account?{' '}
                    <Link to="/signup" className="text-green-600 hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
