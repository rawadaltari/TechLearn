import  { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageCircle, BookOpen, Award, Users, HelpCircle } from 'lucide-react';
import intentsData from '../../data/intents.json';
import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../data/translations';
interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface Intent {
  tag: string;
  patterns: string[];
  responses: string[];
}

const quickQuestions = [
  "كيف أسجل في كورس؟",
  "هل الكورسات مجانية؟",
  "كيف أحصل على شهادة؟",
  "هل هناك تطبيق للموبايل؟",
  "ما هي المجالات المتاحة؟",
  "كم مدة الكورس؟"
];

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'مرحباً بك في منصة التعلم! 🎓 كيف يمكنني مساعدتك اليوم؟',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestMatch = (userInput: string): Intent | null => {
    const input = userInput.toLowerCase().trim();
    const intents: Intent[] = intentsData.intents;
    
    // First, try to find exact matches
    for (const intent of intents) {
      for (const pattern of intent.patterns) {
        if (input.includes(pattern.toLowerCase())) {
          return intent;
        }
      }
    }

    // If no exact match, try partial matches with keywords
    let bestMatch: Intent | null = null;
    let maxMatches = 0;

    for (const intent of intents) {
      let matches = 0;
      for (const pattern of intent.patterns) {
        const patternWords = pattern.toLowerCase().split(' ');
        const inputWords = input.split(' ');
        
        for (const patternWord of patternWords) {
          if (inputWords.some(inputWord => 
            inputWord.includes(patternWord) || patternWord.includes(inputWord)
          )) {
            matches++;
          }
        }
      }
      
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = intent;
      }
    }

    return maxMatches > 0 ? bestMatch : null;
  };

  const getRandomResponse = (responses: string[]): string => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const findAnswer = (question: string): string => {
    const matchedIntent = findBestMatch(question);
    
    if (matchedIntent) {
      return getRandomResponse(matchedIntent.responses);
    }

    // Default response
    const defaultIntent = intentsData.intents.find(intent => intent.tag === 'default');
    return defaultIntent ? getRandomResponse(defaultIntent.responses) : 
           "أعتذر، لم أتمكن من فهم سؤالك. يمكنك التواصل مع فريق الدعم للمساعدة.";
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = findAnswer(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };
  const { language,  } = useLanguage();
  const t = translations[language];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{t.chatbot.title}</h1>
              <p className="text-sm text-gray-600">   {t.chatbot.discription}  </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.isBot ? 'justify-start' : 'justify-end'
                } animate-fade-in`}
              >
                {message.isBot && (
                  <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-full flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                  } shadow-sm`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-2 opacity-70 ${
                    message.isBot ? 'text-gray-500' : 'text-blue-100'
                  }`}>
                    {message.timestamp.toLocaleTimeString('ar-EG', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>

                {!message.isBot && (
                  <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-full flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-3 animate-pulse">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-full">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-6 py-4 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-3"> {t.chatbot.QuickQuestions}</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-3 py-2 text-xs bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 rounded-full hover:from-blue-100 hover:to-green-100 transition-all duration-200 border border-blue-200 hover:shadow-md"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                placeholder="اكتب سؤالك هنا..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                dir="rtl"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{t.chatbot.FeaturesSection[0]}</h3>
            <p className="text-gray-600 text-sm">{t.chatbot.info.title3} </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{t.chatbot.FeaturesSection[1]} </h3>
            <p className="text-gray-600 text-sm">{t.chatbot.info.title2}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{t.chatbot.FeaturesSection[2]}</h3>
            <p className="text-gray-600 text-sm">{t.chatbot.info.title3}</p>  
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6" />
            <h3 className="text-lg font-bold">{t.chatbot.SupportSection.title}</h3>
          </div>
          <p className="mb-4 opacity-90">
           {t.chatbot.SupportSection.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              📞 اتصل بنا: 9276400075
            </button>
            <button className="px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium">
              📧 support@TechLearn.com
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}