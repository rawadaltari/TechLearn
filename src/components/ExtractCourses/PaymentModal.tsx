import React, { useState } from 'react';
import { X, CreditCard, Wallet, Building2, Shield, CheckCircle, Clock, Users, Star, ArrowRight, ArrowLeft } from 'lucide-react';

interface Course {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  duration: {
    ar: string;
    en: string;
  };
  level: {
    ar: string;
    en: string;
  };
  learners: number;
  rating: number;
  price: {
    original: number;
    discounted: number;
    currency: {
      ar: 'ر.س';
      en: '$';
    };
  };
  image: string;
  features: {
    ar: string[];
    en: string[];
  };
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  language: 'ar' | 'en';
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, course, language }) => {
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'wallet' | 'bank'>('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');

  const isArabic = language === 'ar';

  const texts = {
    ar: {
      courseDetails: 'تفاصيل الدورة',
      paymentMethod: 'طريقة الدفع',
      creditCard: 'بطاقة ائتمانية',
      digitalWallet: 'محفظة رقمية',
      bankTransfer: 'تحويل بنكي',
      cardNumber: 'رقم البطاقة',
      expiryDate: 'تاريخ الانتهاء',
      cvv: 'رمز الأمان',
      cardName: 'اسم حامل البطاقة',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      totalPrice: 'المبلغ الإجمالي',
      discount: 'خصم',
      finalPrice: 'السعر النهائي',
      proceedPayment: 'متابعة الدفع',
      processing: 'جاري المعالجة...',
      payNow: 'ادفع الآن',
      back: 'رجوع',
      close: 'إغلاق',
      paymentSuccess: 'تم الدفع بنجاح!',
      enrollmentConfirmed: 'تم تأكيد التسجيل في الدورة',
      accessCourse: 'الوصول للدورة',
      downloadReceipt: 'تحميل الإيصال',
      securePayment: 'دفع آمن ومشفر',
      moneyBackGuarantee: 'ضمان استرداد الأموال',
      instantAccess: 'وصول فوري للمحتوى',
      courseIncludes: 'تشمل الدورة:',
      learners: 'متعلم',
      rating: 'التقييم',
      whatYouGet: 'ما ستحصل عليه:'
    },
    en: {
      courseDetails: 'Course Details',
      paymentMethod: 'Payment Method',
      creditCard: 'Credit Card',
      digitalWallet: 'Digital Wallet',
      bankTransfer: 'Bank Transfer',
      cardNumber: 'Card Number',
      expiryDate: 'Expiry Date',
      cvv: 'CVV',
      cardName: 'Cardholder Name',
      email: 'Email Address',
      phone: 'Phone Number',
      totalPrice: 'Total Price',
      discount: 'Discount',
      finalPrice: 'Final Price',
      proceedPayment: 'Proceed to Payment',
      processing: 'Processing...',
      payNow: 'Pay Now',
      back: 'Back',
      close: 'Close',
      paymentSuccess: 'Payment Successful!',
      enrollmentConfirmed: 'Your enrollment has been confirmed',
      accessCourse: 'Access Course',
      downloadReceipt: 'Download Receipt',
      securePayment: 'Secure & Encrypted Payment',
      moneyBackGuarantee: '30-Day Money Back Guarantee',
      instantAccess: 'Instant Access to Content',
      courseIncludes: 'Course Includes:',
      learners: 'learners',
      rating: 'Rating',
      whatYouGet: 'What you\'ll get:'
    }
  };

  const paymentMethods = [
    {
      id: 'card' as const,
      name: texts[language].creditCard,
      icon: CreditCard,
      description: isArabic ? 'فيزا، ماستركارد، أمريكان إكسبريس' : 'Visa, Mastercard, American Express'
    },
    {
      id: 'wallet' as const,
      name: texts[language].digitalWallet,
      icon: Wallet,
      description: isArabic ? 'آبل باي، جوجل باي، سامسونج باي' : 'Apple Pay, Google Pay, Samsung Pay'
    },
    {
      id: 'bank' as const,
      name: texts[language].bankTransfer,
      icon: Building2,
      description: isArabic ? 'تحويل مصرفي مباشر' : 'Direct bank transfer'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setStep('success');
  };

  const formatPrice = (price: number) => {
    return isArabic ? `${price} ${course.price.currency.ar}` : `${course.price.currency.en}${price}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}${isArabic ? 'ألف' : 'K'}`;
    }
    return num.toString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className={`absolute ${isArabic ? 'left-6' : 'right-6'} top-6 text-white/80 hover:text-white transition-colors`}
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold mb-2">
            {step === 'details' && texts[language].courseDetails}
            {step === 'payment' && texts[language].paymentMethod}
            {step === 'success' && texts[language].paymentSuccess}
          </h2>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
          {step === 'details' && (
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Course Info */}
                <div>
                  <div className="relative rounded-2xl overflow-hidden mb-6">
                    <img
                      src={course.image}
                      alt={course.title[language]}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-bold mb-2">
                        {course.title[language]}
                      </h3>
                      <div className="flex items-center gap-4 text-white/90 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration[language]}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {formatNumber(course.learners)}+ {texts[language].learners}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          {course.rating}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {course.description[language]}
                  </p>

                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      {texts[language].whatYouGet}
                    </h4>
                    <ul className="space-y-3">
                      {course.features[language].map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 mb-6">
                    <div className="text-center mb-6">
                      <div className="text-gray-500 line-through text-lg mb-2">
                        {formatPrice(course.price.original)}
                      </div>
                      <div className="text-3xl font-bold text-teal-600 mb-2">
                        {formatPrice(course.price.discounted)}
                      </div>
                      <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                        {texts[language].discount} {Math.round((1 - course.price.discounted / course.price.original) * 100)}%
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3 text-gray-700">
                        <Shield className="w-5 h-5 text-teal-600" />
                        <span className="text-sm">{texts[language].securePayment}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-teal-600" />
                        <span className="text-sm">{texts[language].moneyBackGuarantee}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Clock className="w-5 h-5 text-teal-600" />
                        <span className="text-sm">{texts[language].instantAccess}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep('payment')}
                      className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      {texts[language].proceedPayment}
                      {isArabic ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Payment Methods */}
                <div>
                  <h3 className="text-xl font-semibold mb-6">{texts[language].paymentMethod}</h3>
                  
                  <div className="space-y-4 mb-8">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 ${
                          selectedPayment === method.id
                            ? 'border-teal-600 bg-teal-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`flex items-center gap-4 ${isArabic ? 'text-right' : 'text-left'}`}>
                          <div className={`p-3 rounded-xl ${
                            selectedPayment === method.id ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            <method.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{method.name}</div>
                            <div className="text-sm text-gray-500">{method.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedPayment === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                          {texts[language].cardNumber}
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent ${isArabic ? 'text-right' : 'text-left'}`}
                          dir={isArabic ? 'rtl' : 'ltr'}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                            {texts[language].expiryDate}
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent ${isArabic ? 'text-right' : 'text-left'}`}
                            dir={isArabic ? 'rtl' : 'ltr'}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                            {texts[language].cvv}
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent ${isArabic ? 'text-right' : 'text-left'}`}
                            dir={isArabic ? 'rtl' : 'ltr'}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                          {texts[language].cardName}
                        </label>
                        <input
                          type="text"
                          placeholder={isArabic ? "أحمد محمد" : "John Doe"}
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent ${isArabic ? 'text-right' : 'text-left'}`}
                          dir={isArabic ? 'rtl' : 'ltr'}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                        {texts[language].email}
                      </label>
                      <input
                        type="email"
                        placeholder={isArabic ? "ahmed@example.com" : "john@example.com"}
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent ${isArabic ? 'text-right' : 'text-left'}`}
                        dir={isArabic ? 'rtl' : 'ltr'}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                        {texts[language].phone}
                      </label>
                      <input
                        type="tel"
                        placeholder={isArabic ? "+966 50 123 4567" : "+1 (555) 123-4567"}
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent ${isArabic ? 'text-right' : 'text-left'}`}
                        dir={isArabic ? 'rtl' : 'ltr'}
                      />
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <div className="bg-gray-50 rounded-2xl p-6 sticky top-4">
                    <h3 className="text-xl font-semibold mb-6">{texts[language].courseDetails}</h3>
                    
                    <div className="flex gap-4 mb-6">
                      <img
                        src={course.image}
                        alt={course.title[language]}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      <div className={isArabic ? 'text-right' : 'text-left'}>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {course.title[language]}
                        </h4>
                        <div className="text-sm text-gray-500">
                          {course.duration[language]} • {course.level[language]}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{texts[language].totalPrice}</span>
                        <span className="line-through text-gray-400">
                          {formatPrice(course.price.original)}
                        </span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>{texts[language].discount}</span>
                        <span>-{formatPrice(course.price.original - course.price.discounted)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-xl font-bold mb-6">
                      <span>{texts[language].finalPrice}</span>
                      <span className="text-teal-600">{formatPrice(course.price.discounted)}</span>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => setStep('details')}
                        className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        {texts[language].back}
                      </button>
                      <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isProcessing ? texts[language].processing : texts[language].payNow}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {texts[language].paymentSuccess}
                </h3>
                
                <p className="text-gray-600 mb-8">
                  {texts[language].enrollmentConfirmed}
                </p>

                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <div className="flex gap-4">
                    <img
                      src={course.image}
                      alt={course.title[language]}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <div className={isArabic ? 'text-right' : 'text-left'}>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {course.title[language]}
                      </h4>
                      <div className="text-sm text-gray-500 mb-2">
                        {formatPrice(course.price.discounted)}
                      </div>
                      <div className="text-xs text-green-600 font-semibold">
                        ✓ {texts[language].enrollmentConfirmed}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    {texts[language].accessCourse}
                  </button>
                  <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                    {texts[language].downloadReceipt}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;