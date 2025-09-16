import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ExternalLink, Mail, ImageIcon, Eye, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Event } from '@/data/events';
import { EventDetailsModal } from './EventDetailsModal';
import { getEventPosterUrl } from '@/utils/generatePlaceholder';

interface EventCardProps {
  event: Event;
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  const [showModal, setShowModal] = useState(false);
  const delay = `${index * 0.05}s`;
  
  // Format date - parse as local date to avoid timezone issues
  const [year, month, day] = event.date.split('-').map(Number);
  const eventDate = new Date(year, month - 1, day);
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  // Determine if event is past
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = eventDate < today;
  
  return (
    <>
      <div
        className={cn(
          "bg-white border rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group flex flex-col h-full",
          isPast ? "opacity-60 border-gray-200" : "border-gray-100"
        )}
        style={{
          animationDelay: delay,
        }}
      >
      <div className="p-4 sm:p-6 relative flex flex-col h-full">
        {/* Content section that will grow */}
        <div className="flex-grow">
          <div className="flex items-start justify-between mb-3 gap-3">
            <h3 className="font-semibold text-lg sm:text-xl text-generator-darkGreen flex-1 group-hover:text-generator-green transition-colors">
              {event.title}
            </h3>
            {isPast && (
              <span className="text-xs font-medium bg-gray-200 text-gray-600 rounded-full px-2.5 py-1">
                Past Event
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3 leading-relaxed">{event.description}</p>

          <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-generator-green" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-generator-green" />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-generator-green" />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4 text-generator-green" />
              <span>{event.audience.join(", ")}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
            <span className="inline-block text-xs font-medium bg-generator-lightGreen text-generator-darkGreen rounded-full px-2.5 py-1">
              {event.eventType}
            </span>
            {event.posterImage && (
              <span className="inline-block text-xs font-medium bg-gray-100 text-gray-600 rounded-full px-2.5 py-1 flex items-center gap-1">
                <ImageIcon className="h-3 w-3" />
                Poster
              </span>
            )}
          </div>

          {event.speakerName && (
            <div className="mb-3 p-2 sm:p-3 bg-generator-lightGold rounded-lg">
              <p className="text-sm font-medium text-generator-darkGreen">
                Speaker: {event.speakerName}
                {event.speakerTitle && <span className="text-xs text-gray-600 block">{event.speakerTitle}</span>}
              </p>
            </div>
          )}
        </div>

        {/* Action buttons section - always at bottom */}
        <div className="mt-auto space-y-3">
          {/* Contact and Registration row */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            {event.contactEmail ? (
              <a
                href={`mailto:${event.contactEmail}`}
                className="flex items-center gap-1 text-sm text-generator-green hover:text-generator-darkGreen transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Contact {event.contactName || "Organizer"}</span>
              </a>
            ) : (
              <span className="text-sm text-gray-500">
                Contact: {event.contactName || "The Generator"}
              </span>
            )}

            {event.registrationUrl && !isPast && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium text-generator-green hover:text-generator-darkGreen transition-colors"
              >
                <span>Register</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* Slides button if available */}
          {event.slidesUrl && (
            <a
              href={event.slidesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-generator-gold text-generator-darkGreen font-medium rounded-lg hover:bg-generator-lightGold transition-all duration-300 overflow-hidden group/btn"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out">
                <div className="h-full w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </div>

              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">See Event Slides</span>
            </a>
          )}

          {/* Details button */}
          <button
            onClick={() => setShowModal(true)}
            className="relative w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-generator-green text-white font-medium rounded-lg hover:bg-generator-darkGreen transition-all duration-300 overflow-hidden group/btn"
            type="button"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out">
              <div className="h-full w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            </div>

            <Eye className="h-4 w-4" />
            <span className="text-sm font-medium">
              <span className="sm:hidden">Details & Calendar</span>
              <span className="hidden sm:inline">Details & Add to Calendar</span>
            </span>
          </button>
        </div>
      </div>
    </div>
    
    {/* Event Details Modal */}
    <EventDetailsModal 
      event={event} 
      isOpen={showModal} 
      onClose={() => setShowModal(false)} 
    />
    </>
  );
}