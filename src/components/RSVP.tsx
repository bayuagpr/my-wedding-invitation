"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitRSVP } from "@/lib/api";
import { refreshWishes } from "@/components/Wishes";

type Attendance = "attending" | "unable";

type FormData = {
  name: string;
  attendance: Attendance;
  guests: number;
  wishes: string;
};

export default function RSVP() {
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      guests: 1,
      wishes: "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setError(null);

    try {
      // Submit to Supabase
      await submitRSVP({
        name: data.name,
        attendance: data.attendance,
        guest_count: data.guests,
        message: data.wishes,
      });

      setSubmitted(true);

      // Refresh wishes to show the new submission
      refreshWishes();

      // Reset form after successful submission
      setTimeout(() => {
        form.reset();
        setAttendance(null);
        setGuestCount(1);
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error('Error submitting RSVP:', err);
      setError('Failed to submit RSVP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleAttendanceChange(value: Attendance) {
    setAttendance(value);
    form.setValue("attendance", value);
  }

  function increaseGuests() {
    if (guestCount < 2) {
      const newCount = guestCount + 1;
      setGuestCount(newCount);
      form.setValue("guests", newCount);
    }
  }

  function decreaseGuests() {
    if (guestCount > 1) {
      const newCount = guestCount - 1;
      setGuestCount(newCount);
      form.setValue("guests", newCount);
    }
  }

  return (
    <section className="pt-20 pb-10 bg-background relative" id="rsvp">
      <div
        className="absolute inset-0 bg-[50%_40%] bg-cover opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(https://res.cloudinary.com/dizje8tlf/image/upload/v1748923783/OSM-15_pyp3gu.jpg)`, filter: 'brightness(0.9)' }}
      />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl text-center text-primary mb-10">
          Kindly Confirm Your Presence and Share Your Blessings
        </h2>
        <p className="text-center text-primary/70 max-w-2xl mx-auto mb-12">
          We'd be honored by your presence and delighted to receive your kind wishes.<br/>
          Please confirm your attendance below.
        </p>

        <div className="max-w-xl mx-auto bg-card p-8 rounded-lg shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        className="bg-transparent border-primary/30 text-white placeholder:text-white/70"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Attendance Field */}
              <div>
                <FormLabel className="text-primary block mb-2">Attendance</FormLabel>
                <div className="flex flex-col gap-3">
                  <Button
                    type="button"
                    className={`w-full ${
                      attendance === "attending"
                        ? "bg-primary text-primary-foreground"
                        : "bg-transparent border border-primary/30 text-primary hover:bg-primary/10"
                    }`}
                    onClick={() => handleAttendanceChange("attending")}
                  >
                    EXCITED TO ATTEND
                  </Button>
                  <Button
                    type="button"
                    className={`w-full ${
                      attendance === "unable"
                        ? "bg-primary text-primary-foreground"
                        : "bg-transparent border border-primary/30 text-primary hover:bg-primary/10"
                    }`}
                    onClick={() => handleAttendanceChange("unable")}
                  >
                    UNABLE TO ATTEND
                  </Button>
                </div>
              </div>

              {/* Number of Guests Field */}
              {attendance === "attending" && (
                <div>
                  <FormLabel className="text-primary block mb-2">No of Guest (Max 2)</FormLabel>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      onClick={decreaseGuests}
                      className="bg-transparent border border-primary/30 text-primary hover:bg-primary/10 h-10 w-10 rounded-full p-0"
                    >
                      -
                    </Button>
                    <span className="text-white mx-4 w-8 text-center">{guestCount}</span>
                    <Button
                      type="button"
                      onClick={increaseGuests}
                      className="bg-transparent border border-primary/30 text-primary hover:bg-primary/10 h-10 w-10 rounded-full p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>
              )}

              {/* Wishes Field */}
              <FormField
                control={form.control}
                name="wishes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Wishes</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Your wishes for the couple"
                        className="w-full bg-transparent border border-primary/30 rounded-md p-2 text-white placeholder:text-white/70 h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={!attendance || submitted || isLoading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {isLoading
                  ? "Submitting..."
                  : submitted
                  ? "Thank you for your response!"
                  : "Submit"
                }
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
