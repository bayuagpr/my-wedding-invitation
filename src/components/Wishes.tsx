"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { getWishes } from "@/lib/api";

type Wish = {
  name: string;
  message: string;
  created_at: string;
};

// Global refresh function that can be called from other components
let globalWishesRefresh: (() => void) | null = null;

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState<{[key: number]: boolean}>({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const MESSAGE_LIMIT = 120; // Character limit for messages
  const AUTO_PLAY_INTERVAL = 4000; // 4 seconds
  const PAUSE_AFTER_INTERACTION = 8000; // 8 seconds pause after user interaction

  // Refs for timer management
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);
  const pauseTimer = useRef<NodeJS.Timeout | null>(null);

  // Fetch wishes from Supabase
  const fetchWishes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getWishes();
      setWishes(data || []);
      // Reset current index to 0 when wishes are loaded
      setCurrentWishIndex(0);
    } catch (err) {
      console.error('Error fetching wishes:', err);
      setError('Failed to load wishes');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  // Set up global refresh function
  useEffect(() => {
    globalWishesRefresh = fetchWishes;
    return () => {
      globalWishesRefresh = null;
    };
  }, [fetchWishes]);

  // Clear all timers
  const clearTimers = () => {
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
      autoPlayTimer.current = null;
    }
    if (pauseTimer.current) {
      clearTimeout(pauseTimer.current);
      pauseTimer.current = null;
    }
  };

  // Start auto-play
  const startAutoPlay = () => {
    if (!isAutoPlaying || isPaused || isTransitioning || wishes.length === 0) return;

    clearTimers();
    autoPlayTimer.current = setInterval(() => {
      setCurrentWishIndex((prev) => (prev === wishes.length - 1 ? 0 : prev + 1));
    }, AUTO_PLAY_INTERVAL);
  };

  // Stop auto-play
  const stopAutoPlay = () => {
    clearTimers();
  };

  // Pause auto-play temporarily after user interaction
  const pauseAutoPlayTemporarily = () => {
    setIsPaused(true);
    stopAutoPlay();

    // Clear existing pause timer
    if (pauseTimer.current) {
      clearTimeout(pauseTimer.current);
    }

    // Resume after delay
    pauseTimer.current = setTimeout(() => {
      setIsPaused(false);
    }, PAUSE_AFTER_INTERACTION);
  };

  const nextWish = () => {
    if (wishes.length === 0) return;
    pauseAutoPlayTemporarily();
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentWishIndex((prev) => (prev === wishes.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 150);
  };

  const prevWish = () => {
    if (wishes.length === 0) return;
    pauseAutoPlayTemporarily();
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentWishIndex((prev) => (prev === 0 ? wishes.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 150);
  };

  const toggleExpanded = (index: number) => {
    pauseAutoPlayTemporarily();
    setExpandedMessages(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const truncateMessage = (message: string, limit: number) => {
    if (message.length <= limit) return message;
    return message.substring(0, limit).trim() + "...";
  };

  // Format date from ISO string to readable format
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Handle mouse events for auto-play control
  const handleMouseEnter = () => {
    stopAutoPlay();
  };

  const handleMouseLeave = () => {
    if (!isPaused) {
      startAutoPlay();
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (isAutoPlaying && !isPaused && !isTransitioning && wishes.length > 0) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    // Cleanup on unmount
    return () => {
      clearTimers();
    };
  }, [isAutoPlaying, isPaused, isTransitioning, wishes.length]);

  // Restart auto-play when pause state changes
  useEffect(() => {
    if (!isPaused && isAutoPlaying && !isTransitioning && wishes.length > 0) {
      startAutoPlay();
    }
  }, [isPaused, wishes.length]);

  // Reset currentWishIndex if it's out of bounds
  useEffect(() => {
    if (wishes.length > 0 && currentWishIndex >= wishes.length) {
      setCurrentWishIndex(0);
    }
  }, [wishes.length, currentWishIndex]);

  // Handle loading and empty states
  if (isLoading) {
    return (
      <section className="pb-20 bg-background" id="wishes">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl text-center text-primary mb-4">
            Wishes
          </h2>
          <div className="max-w-2xl mx-auto p-8 bg-card rounded-lg shadow-md">
            <div className="flex-1 min-h-[200px] flex flex-col justify-center">
              <div className="text-center">
                <p className="text-primary/60">Loading wishes...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pb-20 bg-background" id="wishes">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl text-center text-primary mb-4">
            Wishes
          </h2>
          <div className="max-w-2xl mx-auto p-8 bg-card rounded-lg shadow-md">
            <div className="flex-1 min-h-[200px] flex flex-col justify-center">
              <div className="text-center">
                <p className="text-red-400">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (wishes.length === 0) {
    return (
      <section className="pb-20 bg-background" id="wishes">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl text-center text-primary mb-4">
            Wishes
          </h2>
          <div className="max-w-2xl mx-auto p-8 bg-card rounded-lg shadow-md">
            <div className="flex-1 min-h-[200px] flex flex-col justify-center">
              <div className="text-center">
                <p className="text-primary/60">No wishes yet. Be the first to share your blessings!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentWish = wishes[currentWishIndex];

  // Safety check - if no current wish, this shouldn't happen but let's be safe
  if (!currentWish) {
    return (
      <section className="pb-20 bg-background" id="wishes">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl text-center text-primary mb-4">
            Wishes
          </h2>
          <div className="max-w-2xl mx-auto p-8 bg-card rounded-lg shadow-md">
            <div className="flex-1 min-h-[200px] flex flex-col justify-center">
              <div className="text-center">
                <p className="text-primary/60">No wishes available.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isExpanded = expandedMessages[currentWishIndex];
  const needsTruncation = currentWish.message.length > MESSAGE_LIMIT;
  const displayMessage = needsTruncation && !isExpanded
    ? truncateMessage(currentWish.message, MESSAGE_LIMIT)
    : currentWish.message;

  return (
    <section className="pb-20 bg-background" id="wishes">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl text-center text-primary mb-4">
          Wishes
        </h2>

        <div
          className="max-w-2xl mx-auto p-8 bg-card rounded-lg shadow-md"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Flex container for navigation and content */}
          <div className="flex items-center justify-between gap-4">
            {/* Previous button */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevWish}
              className="bg-transparent border-primary/30 text-primary hover:bg-primary/10 h-10 w-10 rounded-full transition-all duration-200 flex-shrink-0"
              disabled={isTransitioning}
            >
              <span className="sr-only">Previous wish</span>
              <ChevronLeftIcon />
            </Button>

            {/* Content area */}
            <div className="flex-1 min-h-[200px] flex flex-col justify-center">
              {/* Wish content with transition */}
              <div
                className={`text-center transition-all duration-300 ease-in-out ${
                  isTransitioning
                    ? 'opacity-0 transform translate-y-2 scale-95'
                    : 'opacity-100 transform translate-y-0 scale-100'
                }`}
              >
                <h3 className="text-xl text-primary font-bold mb-4">{currentWish.name}</h3>
                <div className="mb-6">
                  <p className="text-primary/80 italic mb-2">"{displayMessage}"</p>
                  {needsTruncation && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(currentWishIndex)}
                      className="text-primary/60 hover:text-primary/80 text-sm underline p-0 h-auto font-normal"
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </Button>
                  )}
                </div>
                <p className="text-sm text-primary/60">{formatDate(currentWish.created_at)}</p>
              </div>

              {/* Smart navigation indicator */}
              {wishes.length <= 7 ? (
                // Show dots for smaller numbers
                <div className="flex justify-center space-x-2 mt-6">
                  {wishes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (index !== currentWishIndex && !isTransitioning) {
                          pauseAutoPlayTemporarily();
                          setIsTransitioning(true);
                          setTimeout(() => {
                            setCurrentWishIndex(index);
                            setIsTransitioning(false);
                          }, 150);
                        }
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentWishIndex
                          ? 'bg-primary scale-125'
                          : 'bg-primary/30 hover:bg-primary/50'
                      }`}
                      disabled={isTransitioning}
                    />
                  ))}
                </div>
              ) : (
                // Show progress bar for larger numbers
                <div className="flex justify-center mt-6">
                  <div className="w-24 h-1 bg-primary/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300 ease-out"
                      style={{
                        width: `${((currentWishIndex + 1) / wishes.length) * 100}%`
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Next button */}
            <Button
              variant="outline"
              size="icon"
              onClick={nextWish}
              className="bg-transparent border-primary/30 text-primary hover:bg-primary/10 h-10 w-10 rounded-full transition-all duration-200 flex-shrink-0"
              disabled={isTransitioning}
            >
              <span className="sr-only">Next wish</span>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}



function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}

// Export function to refresh wishes from other components
export function refreshWishes() {
  if (globalWishesRefresh) {
    globalWishesRefresh();
  }
}