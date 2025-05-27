import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiHash, FiCheckCircle } from "react-icons/fi";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        roll_no: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = "Username is required";
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.roll_no.trim()) newErrors.roll_no = "Roll number is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await signupUser(formData);
            toast.success('Signup successful!');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 to-blue-100 py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
                <div className="text-center">
                    <FiCheckCircle className="mx-auto text-green-600 text-4xl" />
                    <h2 className="mt-4 text-2xl font-bold text-gray-800">Sign up</h2>
                    <p className="text-sm text-gray-500">Signup to see upcoming events</p>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

                    <InputField
                        id="username"
                        icon={<FiUser />}
                        placeholder="Username"
                        value={formData.username}
                        error={errors.username}
                        onChange={handleChange}
                    />


                    <InputField
                        id="name"
                        icon={<FiUser />}
                        placeholder="Full Name"
                        value={formData.name}
                        error={errors.name}
                        onChange={handleChange}
                    />


                    <InputField
                        id="roll_no"
                        icon={<FiHash />}
                        placeholder="Roll Number"
                        value={formData.roll_no}
                        error={errors.roll_no}
                        onChange={handleChange}
                    />

                    <InputField
                        id="email"
                        icon={<FiMail />}
                        placeholder="Email"
                        type="email"
                        value={formData.email}
                        error={errors.email}
                        onChange={handleChange}
                    />


                    <InputField
                        id="password"
                        icon={<FiLock />}
                        placeholder="Password"
                        type="password"
                        value={formData.password}
                        error={errors.password}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200 disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Sign up"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-600 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};


const InputField = ({ id, icon, placeholder, type = "text", value, error, onChange }) => (
    <div>
        <label htmlFor={id} className="sr-only">
            {placeholder}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">{icon}</div>
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                className={`pl-10 pr-3 py-2 w-full border ${error ? "border-red-400" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm`}
                placeholder={placeholder}
            />
        </div>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
);

export default Signup;
