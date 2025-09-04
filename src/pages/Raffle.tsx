import { useState, useEffect } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function Raffle() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null; text: string }>({ type: null, text: '' });
  const [alreadyEntered, setAlreadyEntered] = useState(false);

  // Check if user already entered
  useEffect(() => {
    const checkExistingEntry = async () => {
      if (!supabase) return; // Skip if no Supabase configured
      
      const savedPhone = localStorage.getItem('rafflePhone');
      if (savedPhone) {
        const { data } = await supabase
          .from('raffle_entries')
          .select('*')
          .eq('phone', savedPhone)
          .single();
        
        if (data) {
          setAlreadyEntered(true);
          setFormData({
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            phone: data.phone
          });
        }
      }
    };
    checkExistingEntry();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (alreadyEntered) {
      setMessage({ type: 'error', text: "You've already entered the raffle!" });
      return;
    }
    
    setLoading(true);
    setMessage({ type: null, text: '' });

    try {
      if (!supabase) {
        // Demo mode - just save to localStorage
        localStorage.setItem('rafflePhone', formData.phone);
        localStorage.setItem('raffleData', JSON.stringify(formData));
        
        setMessage({ 
          type: 'success', 
          text: "You're entered! (Demo mode - configure Supabase for real entries)" 
        });
        setAlreadyEntered(true);
        setLoading(false);
        return;
      }

      // Check for duplicates
      const { data: existing } = await supabase
        .from('raffle_entries')
        .select('*')
        .or(`phone.eq.${formData.phone},email.eq.${formData.email}`)
        .single();

      if (existing) {
        setMessage({ 
          type: 'error', 
          text: existing.phone === formData.phone 
            ? 'This phone number has already been entered!' 
            : 'This email has already been entered!'
        });
        setLoading(false);
        return;
      }

      // Insert new entry
      const { error } = await supabase
        .from('raffle_entries')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email.toLowerCase(),
          phone: formData.phone.replace(/\D/g, ''), // Remove non-digits
          entered_at: new Date().toISOString()
        }]);

      if (error) throw error;

      // Save to localStorage
      localStorage.setItem('rafflePhone', formData.phone);
      
      setMessage({ 
        type: 'success', 
        text: "You're entered! Join our WhatsApp to stay updated. Good luck! 🎉" 
      });
      setAlreadyEntered(true);
    } catch (error) {
      console.error('Error:', error);
      setMessage({ 
        type: 'error', 
        text: 'Something went wrong. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background image with gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/misc/raffle-background.jpg"
          alt="Raffle background"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(255, 255, 255, 0.8) 80%, rgba(255, 255, 255, 0.95) 100%)'
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-generator-darkGreen text-center mb-2">
            Meta Ray-Ban Raffle! 🕶️
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Enter for a chance to win Meta Ray-Bans at tonight's Babson Commons Mixer!
          </p>

          {!supabase && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
              Demo Mode: Configure Supabase in .env to save entries to database
            </div>
          )}

          {!alreadyEntered ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  autoCapitalize="words"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-generator-green focus:border-transparent"
                  placeholder="First name"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  autoCapitalize="words"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-generator-green focus:border-transparent"
                  placeholder="Last name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Babson Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  required
                  pattern=".*@babson\.edu$"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-generator-green focus:border-transparent"
                  placeholder="youremail@babson.edu"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-generator-green focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-generator-green text-white font-medium py-3 px-6 rounded-lg hover:bg-generator-darkGreen transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Entering...
                  </>
                ) : (
                  'Enter Raffle'
                )}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-generator-green mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-generator-darkGreen mb-2">
                You're all set, {formData.firstName}!
              </h2>
              <p className="text-gray-600">
                You've been entered into the raffle. Make sure to join our WhatsApp group to stay updated!
              </p>
            </div>
          )}

          {message.text && (
            <div className={`mt-4 p-4 rounded-lg flex items-start ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Don't forget to join our WhatsApp group for updates and opportunities!
            </p>
            <a
              href="https://chat.whatsapp.com/GdnB3cExacMA5XfqsXh4pO?mode=ems_copy_c"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full bg-generator-gold text-generator-darkGreen font-medium py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center"
            >
              Join WhatsApp Group
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}