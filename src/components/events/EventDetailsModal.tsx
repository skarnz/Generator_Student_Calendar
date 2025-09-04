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
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl my-8 sm:my-0 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
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
          <div className="w-full lg:w-1/2 bg-gray-100 relative flex-shrink-0">
            {event.posterImage || !imageError ? (
              <div className="relative w-full h-48 sm:h-64 lg:h-[500px]">
                <LazyImage
                  src={getEventPosterUrl(event.posterImage, 'mobile')}
                  srcSet={generatePosterSrcSet(event.posterImage)}
                  sizes="(max-width: 768px) 100vw, 50vw"
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
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-generator-darkGreen to-generator-green p-8">
                <div className="text-center text-white">
                  <div className="mb-4 text-6xl font-bold opacity-20">G</div>
                  <h3 className="text-xl font-semibold mb-2">THE GENERATOR</h3>
                  <p className="text-sm opacity-75">{event.eventType}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Event details */}
          <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 max-h-[60vh] lg:max-h-[500px] overflow-y-auto">
            {/* Event type badge */}
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-generator-green bg-generator-green/10 rounded-full">
              {event.eventType}
            </div>

            {/* Title */}
            <h2 className="text-2xl lg:text-3xl font-bold text-generator-darkGreen mb-4">
              {event.title}
            </h2>

            {/* Quick info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="h-5 w-5 text-generator-green flex-shrink-0" />
                <span>{formattedDate}</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="h-5 w-5 text-generator-green flex-shrink-0" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="h-5 w-5 text-generator-green flex-shrink-0" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex items-start gap-3 text-gray-600">
                <Users className="h-5 w-5 text-generator-green flex-shrink-0 mt-0.5" />
                <span>{event.audience.join(', ')}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">About this event</h3>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            {/* Additional details */}
            <div className="space-y-4 mb-6">
              {event.speakerName && (
                <div>
                  <h4 className="font-semibold mb-1">Speaker</h4>
                  <p className="text-gray-600">
                    {event.speakerName}{event.speakerTitle && ` - ${event.speakerTitle}`}
                  </p>
                </div>
              )}

              {(event.food || event.prize) && (
                <div className="flex gap-6">
                  {event.food && (
                    <div className="flex items-center gap-2">
                      <Pizza className="h-5 w-5 text-generator-green" />
                      <span className="text-gray-600">{event.food}</span>
                    </div>
                  )}
                  {event.prize && (
                    <div className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-generator-green" />
                      <span className="text-gray-600">{event.prize}</span>
                    </div>
                  )}
                </div>
              )}

              {event.contactEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-generator-green" />
                  <a 
                    href={`mailto:${event.contactEmail}`}
                    className="text-generator-green hover:underline"
                  >
                    {event.contactEmail}
                  </a>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              {/* Past event notice */}
              {isPast && (
                <div className="p-4 bg-gray-100 text-gray-600 rounded-lg text-center">
                  <p className="text-sm font-medium">This event has already taken place</p>
                </div>
              )}
              
              {/* Add to Calendar button - always show */}
              <div className="relative">
                <AddToCalendarButton 
                  event={event} 
                  variant={isMobile ? 'mobile' : 'default'}
                  className="w-full"
                />
              </div>

              {/* Registration button */}
              {event.registrationUrl && !isPast && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-generator-gold text-generator-darkGreen font-medium rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                  Register for Event
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}