import { useState, useEffect } from 'react';
import { X, ExternalLink, MapPin, Clock, Users, Mail, Gift, Pizza, Calendar, FileText } from 'lucide-react';
import { Event } from '@/data/events';
import { getEventPosterUrl, generatePosterSrcSet } from '@/utils/generatePlaceholder';
import { LazyImage } from '@/components/ui/LazyImage';
import { cn } from '@/lib/utils';
import { AddToCalendarButton } from '@/components/ui/AddToCalendarButton';
import { useIsMobile } from '@/hooks/use-mobile';

interface EventDetailsModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailsModal({ event, isOpen, onClose }: EventDetailsModalProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const isMobile = useIsMobile();
  
  // Prevent body scroll when modal is open (mobile optimization)
  useEffect(() => {
    if (isOpen) {
      // Store original body style
      const originalStyle = window.getComputedStyle(document.body).overflow;
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
      // Add class for iOS Safari
      document.body.classList.add('modal-open');
      
      return () => {
        // Restore original style
        document.body.style.overflow = originalStyle;
        document.body.classList.remove('modal-open');
      };
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
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
        // Restore body scroll
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  // Parse date for display - parse as local date to avoid timezone issues
  const [year, month, day] = event.date.split('-').map(Number);
  const eventDate = new Date(year, month - 1, day);
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  // Determine if event is past
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = eventDate < today;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-backdrop fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleBackdropClick}
      style={{ 
        isolation: 'isolate',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)'
      }}
    >
      <div 
        className="modal-content relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto"
        style={{ 
          isolation: 'isolate',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)'
        }}
      >
        {/* Close button with enhanced mobile positioning and accessibility */}
        <button
          onClick={onClose}
          className={cn(
            "modal-close-button absolute z-[10001] transition-all duration-200",
            // Mobile-first positioning - ensure it's above mobile nav
            "top-3 right-3 p-3 min-w-[44px] min-h-[44px]",
            // Tablet and desktop positioning
            "sm:top-4 sm:right-4 sm:p-2 sm:min-w-[36px] sm:min-h-[36px]",
            // Enhanced background for visibility over any content
            "bg-white shadow-xl border border-gray-200",
            "rounded-full hover:bg-gray-50 active:bg-gray-100",
            // Enhanced focus states for accessibility
            "focus:outline-none focus:ring-2 focus:ring-generator-green focus:ring-offset-2",
            // Flex center content
            "flex items-center justify-center"
          )}
          aria-label="Close modal"
          style={{ 
            isolation: 'isolate',
            transform: 'translateZ(1px)',
            WebkitTransform: 'translateZ(1px)',
            zIndex: 10001
          }}
        >
          <X className="h-5 w-5 sm:h-4 sm:w-4 text-generator-darkGreen flex-shrink-0" />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Left side - Event poster */}
          <div className="w-full lg:w-2/5 bg-gray-100 relative flex-shrink-0">
            {event.posterImage || !imageError ? (
              <div className="relative w-full h-48 sm:h-64 lg:h-full lg:min-h-[400px]">
                <LazyImage
                  src={getEventPosterUrl(event.posterImage, 'mobile')}
                  srcSet={generatePosterSrcSet(event.posterImage)}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  alt={event.posterImageAlt || `${event.title} event poster`}
                  className="w-full h-full object-cover"
                  placeholderSrc={getEventPosterUrl(event.posterImage, 'thumbnail')}
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageError(true);
                    setImageLoading(false);
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-full min-h-[200px] lg:min-h-[400px] flex items-center justify-center bg-gradient-to-br from-generator-darkGreen to-generator-green p-8">
                <div className="text-center text-white">
                  <div className="mb-4 text-6xl font-bold opacity-20">G</div>
                  <h3 className="text-xl font-semibold mb-2">THE GENERATOR</h3>
                  <p className="text-sm opacity-75">{event.eventType}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Event details */}
          <div className="w-full lg:w-3/5 p-4 sm:p-6 lg:p-8">
            {/* Event type badge */}
            <div className="inline-block px-3 py-1 text-sm font-medium text-generator-green bg-generator-green/10 rounded-full mb-3">
              {event.eventType}
            </div>

            {/* Title */}
            <h2 className="text-2xl lg:text-3xl font-bold text-generator-darkGreen mb-4">
              {event.title}
            </h2>

            {/* Key details and calendar button at the top */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4 text-generator-green flex-shrink-0" />
                  <span className="text-sm">{formattedDate}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4 text-generator-green flex-shrink-0" />
                  <span className="text-sm">{event.time}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 text-generator-green flex-shrink-0" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>

              {/* Add to Calendar button - prominently placed */}
              <div className="flex flex-col justify-start">
                {!isPast ? (
                  <AddToCalendarButton 
                    event={event} 
                    variant={isMobile ? 'mobile' : 'default'}
                    className="w-full"
                  />
                ) : (
                  <div className="p-3 bg-gray-100 text-gray-600 rounded-lg text-center">
                    <p className="text-sm font-medium">This event has already taken place</p>
                  </div>
                )}
              </div>
            </div>

            {/* Registration button if available */}
            {event.registrationUrl && !isPast && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-generator-gold text-generator-darkGreen font-medium rounded-lg hover:bg-yellow-400 transition-colors mb-4"
              >
                <ExternalLink className="h-4 w-4" />
                Register for Event
              </a>
            )}

            {/* Slides button if available */}
            {event.slidesUrl && (
              <a
                href={event.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-generator-lightGold text-generator-darkGreen font-medium rounded-lg hover:bg-generator-gold transition-colors mb-4 border border-generator-gold/30"
              >
                <FileText className="h-4 w-4" />
                See Event Slides
              </a>
            )}

            {/* Audience */}
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Users className="h-4 w-4 text-generator-green flex-shrink-0" />
              <span className="text-sm">For: {event.audience.join(', ')}</span>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h3 className="font-semibold text-base mb-2">About this event</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
            </div>

            {/* Additional details in a compact format */}
            <div className="space-y-2">
              {event.speakerName && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-sm text-gray-700">Speaker:</span>
                  <span className="text-sm text-gray-600">
                    {event.speakerName}{event.speakerTitle && ` - ${event.speakerTitle}`}
                  </span>
                </div>
              )}

              {(event.food || event.prize) && (
                <div className="flex flex-wrap gap-4">
                  {event.food && (
                    <div className="flex items-center gap-2">
                      <Pizza className="h-4 w-4 text-generator-green" />
                      <span className="text-sm text-gray-600">{event.food}</span>
                    </div>
                  )}
                  {event.prize && (
                    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-green-100 px-3 py-1.5 rounded-full">
                      <span className="text-lg">💰</span>
                      <span className="text-sm font-semibold bg-gradient-to-r from-yellow-600 to-green-600 bg-clip-text text-transparent">
                        {event.prize}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {event.contactEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-generator-green" />
                  <a 
                    href={`mailto:${event.contactEmail}`}
                    className="text-sm text-generator-green hover:underline"
                  >
                    {event.contactEmail}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}