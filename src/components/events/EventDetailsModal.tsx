import { useState } from 'react';
import { X, ExternalLink, MapPin, Clock, Users, Mail, Gift, Pizza, Calendar } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
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
                    <div className="flex items-center gap-2">
                      <Gift className="h-4 w-4 text-generator-green" />
                      <span className="text-sm text-gray-600">{event.prize}</span>
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