import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import translations from "../data/translations";
import axios from "axios";

const Signup: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    mobileNumber: "",
    birthDate: "",
    type: "Student",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobileNumber: formData.mobileNumber,
      birthDate: formData.birthDate,
      type: formData.type,
      roles: [formData.type],
    };

    try {
      setLoading(true);
      setMessage("");
      setFieldErrors({});

      const response = await axios.post(
        "https://raghadsvu-001-site1.jtempurl.com/api/Users/signup",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.id);
      setMessage(t.signupPage.successMessage || "تم التسجيل بنجاح");
      navigate("/login");
    } catch (error: any) {
      if (error.response) {
        const data = error.response.data;
        if (data.errors) {
          // مثال: { Email: ["هذا الحقل مطلوب"] }
          const newErrors: { [key: string]: string } = {};
          Object.keys(data.errors).forEach((field) => {
            newErrors[field] = data.errors[field].join(", ");
          });
          setFieldErrors(newErrors);
        }
        const backendMessage =
          data.message || data.title || "فشل في التسجيل.";
        setMessage(backendMessage);
      } else {
        setMessage("تعذر الاتصال بالخادم. حاول لاحقًا.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t.signupPage.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t.signupPage.description}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  {t.signupPage.firstName}
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                  placeholder={t.signupPage.firstNamePlaceholder}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {fieldErrors.FirstName && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.FirstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  {t.signupPage.lastName}
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                  placeholder={t.signupPage.lastNamePlaceholder}
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {fieldErrors.LastName && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.LastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t.signupPage.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                  isRTL ? "text-right" : "text-left"
                }`}
                placeholder={t.signupPage.emailPlaceholder}
                value={formData.email}
                onChange={handleChange}
              />
              {fieldErrors.Email && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.Email}</p>
              )}
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                {t.signupPage.username}
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                  isRTL ? "text-right" : "text-left"
                }`}
                placeholder={t.signupPage.usernamePlaceholder}
                value={formData.username}
                onChange={handleChange}
              />
              {fieldErrors.Username && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.Username}</p>
              )}
            </div>

            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
                {t.signupPage.mobile}
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="text"
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                  isRTL ? "text-right" : "text-left"
                }`}
                placeholder={t.signupPage.mobilePlaceholder}
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              {fieldErrors.MobileNumber && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.MobileNumber}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t.signupPage.password}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                  isRTL ? "text-right" : "text-left"
                }`}
                placeholder={t.signupPage.passwordPlaceholder}
                value={formData.password}
                onChange={handleChange}
              />
              {fieldErrors.Password && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.Password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                {t.signupPage.confirmPassword}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                  isRTL ? "text-right" : "text-left"
                }`}
                placeholder={t.signupPage.confirmPasswordPlaceholder}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {fieldErrors.ConfirmPassword && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.ConfirmPassword}</p>
              )}
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                {t.signupPage.birthDate}
              </label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                  isRTL ? "text-right" : "text-left"
                }`}
                value={formData.birthDate}
                onChange={handleChange}
              />
              {fieldErrors.BirthDate && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.BirthDate}</p>
              )}
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                {t.signupPage.role}
              </label>
              <select
                id="type"
                name="type"
                required
                className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                  isRTL ? "text-right" : "text-left"
                }`}
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Student">{t.signupPage.student}</option>
                <option value="Teacher">{t.signupPage.teacher}</option>
                <option value="Admin">{t.signupPage.admin}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label
              htmlFor="terms"
              className={`${isRTL ? "mr-2" : "ml-2"} block text-sm text-gray-900`}
            >
              {t.signupPage.terms}
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {loading ? "جاري الإرسال..." : t.signupPage.signUp}
            </button>
          </div>

          {message && (
            <div className="text-center text-red-600 text-sm">{message}</div>
          )}

          <div className="text-center text-sm">
            <span className="text-gray-600">{t.signupPage.alreadyHaveAccount}</span>{" "}
            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
              {t.signupPage.login}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
