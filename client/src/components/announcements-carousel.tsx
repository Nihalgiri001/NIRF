import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Announcement } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MegaphoneIcon } from "lucide-react";

const AnnouncementsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const { data: announcements, isLoading, error } = useQuery<Announcement[]>({
    queryKey: ['/api/announcements'],
  });
  
  useEffect(() => {
    if (!announcements || announcements.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % announcements.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [announcements]);
  
  if (isLoading) {
    return (
      <section className="bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="border border-neutral-200 rounded overflow-hidden">
            <div className="bg-primary-dark text-white px-4 py-2 font-semibold flex items-center">
              <MegaphoneIcon className="h-4 w-4 mr-2" />
              <span>Important Announcements</span>
            </div>
            <div className="px-4 py-3 border-b border-neutral-200">
              <Skeleton className="h-6 w-full" />
            </div>
            <div className="bg-neutral-100 flex justify-center py-1">
              <Skeleton className="h-2 w-2 rounded-full mx-1" />
              <Skeleton className="h-2 w-2 rounded-full mx-1" />
              <Skeleton className="h-2 w-2 rounded-full mx-1" />
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  if (error || !announcements || announcements.length === 0) {
    return null;
  }
  
  return (
    <section className="bg-white py-4">
      <div className="container mx-auto px-4">
        <div className="border border-neutral-200 rounded overflow-hidden">
          <div className="bg-primary-dark text-white px-4 py-2 font-semibold flex items-center">
            <MegaphoneIcon className="h-4 w-4 mr-2" />
            <span>Important Announcements</span>
          </div>
          
          <div className="relative overflow-hidden h-16 md:h-12">
            {announcements.map((announcement, index) => (
              <div
                key={announcement.id}
                className={`absolute w-full transition-transform duration-500 ${
                  index === currentSlide ? 'translate-y-0' : 'translate-y-full'
                }`}
              >
                <div className="px-4 py-3 border-b border-neutral-200">
                  <p>{announcement.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-neutral-100 flex justify-center py-1">
            {announcements.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className={`w-2 h-2 rounded-full mx-1 p-0 min-w-0 ${
                  index === currentSlide ? 'bg-primary' : 'bg-neutral-300'
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Announcement ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsCarousel;
