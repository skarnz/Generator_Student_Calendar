import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckInModal({ isOpen, onClose }: CheckInModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      
      return () => {
        document.body.style.overflow = originalStyle;
        document.body.classList.remove('modal-open');
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscapeKey);

      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
        const scrollPosition = parseInt(document.body.style.top || '0') * -1;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollPosition);
      };
    }
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Additional phone validation
    const phoneDigits = formData.phoneNumber.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setSubmitMessage('Please enter a valid phone number with at least 10 digits');
      setIsSubmitting(false);
      return;
    }

    try {
      if (!supabase) {
        setSubmitMessage('Database not configured. Please check environment variables.');
        return;
      }

      const { data, error } = await supabase
        .from('event_checkins')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phoneNumber,
          email: formData.email
        });

      if (error) {
        console.error('Supabase error:', error);
        setSubmitMessage('Error submitting form. Please try again.');
      } else {
        setSubmitMessage('Successfully checked in!');
        setFormData({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: ''
        });
        setTimeout(() => {
          onClose();
          setSubmitMessage('');
        }, 2000);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phoneNumber') {
      // Allow only numbers, spaces, hyphens, parentheses, and + at the start
      const cleaned = value.replace(/[^\d\s\-\(\)\+]/g, '');
      
      // Ensure + only appears at the start
      const plusCount = (cleaned.match(/\+/g) || []).length;
      let formatted = cleaned;
      if (plusCount > 1) {
        formatted = '+' + cleaned.replace(/\+/g, '');
      } else if (plusCount === 1 && !cleaned.startsWith('+')) {
        formatted = cleaned.replace(/\+/g, '');
      }
      
      setFormData({
        ...formData,
        phoneNumber: formatted
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div 
        className="min-h-full flex items-center justify-center p-4 text-center cursor-pointer"
        onClick={onClose}
      >
        <div className="fixed inset-0 bg-black/50 transition-opacity backdrop-blur-sm" />
        
        <div 
          className={cn(
            "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all",
            "w-full max-w-md p-6 sm:p-8"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-generator-darkGreen">Event Check-In</h2>
            <p className="mt-2 text-gray-600">Please fill in your details to check in for the event.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-generator-gold focus:border-transparent text-black"
                placeholder="John"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-generator-gold focus:border-transparent text-black"
                placeholder="Doe"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                autoComplete="tel"
                required
                pattern="^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$"
                minLength={10}
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-generator-gold focus:border-transparent text-black"
                placeholder="+1 (555) 123-4567"
                title="Please enter a valid phone number with at least 10 digits"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-generator-gold focus:border-transparent text-black"
                placeholder="john.doe@example.com"
              />
            </div>

            {submitMessage && (
              <div className={cn(
                "p-3 rounded-md text-sm",
                submitMessage.includes('Successfully') 
                  ? "bg-green-50 text-green-800" 
                  : "bg-red-50 text-red-800"
              )}>
                {submitMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full py-3 px-4 rounded-md font-medium transition-all",
                "bg-generator-green text-white hover:bg-generator-darkGreen",
                "border-2 border-white shadow-lg hover:shadow-xl",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isSubmitting ? 'Submitting...' : 'Check In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}