"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      guests: 1,
      wishes: "",
    },
  });

  function onSubmit(data: FormData) {
    // In a real application, you would send this data to a backend or API
    console.log(data);
    setSubmitted(true);

    // Reset form after submission
    setTimeout(() => {
      form.reset();
      setAttendance(null);
      setGuestCount(1);
      setSubmitted(false);
    }, 3000);
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
    <section className="py-20 bg-[#10191e]" id="rsvp">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl text-center text-white mb-10">
          Kindly Confirm Your Presence and Share Your Blessings
        </h2>
        <p className="text-center text-white/70 max-w-2xl mx-auto mb-12">
          We'd be honored by your presence and delighted to receive your kind wishes.
          Please confirm your attendance below.
        </p>

        <div className="max-w-xl mx-auto bg-[#0c1419] p-8 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        className="bg-transparent border-white/30 text-white"
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
                <FormLabel className="text-white block mb-2">Attendance</FormLabel>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    className={`flex-1 ${
                      attendance === "attending"
                        ? "bg-white text-[#10191e]"
                        : "bg-transparent border border-white/30 text-white hover:bg-white/10"
                    }`}
                    onClick={() => handleAttendanceChange("attending")}
                  >
                    EXCITED TO ATTEND
                  </Button>
                  <Button
                    type="button"
                    className={`flex-1 ${
                      attendance === "unable"
                        ? "bg-white text-[#10191e]"
                        : "bg-transparent border border-white/30 text-white hover:bg-white/10"
                    }`}
                    onClick={() => handleAttendanceChange("unable")}
                  >
                    UNABLE ATTEND
                  </Button>
                </div>
              </div>

              {/* Number of Guests Field */}
              {attendance === "attending" && (
                <div>
                  <FormLabel className="text-white block mb-2">No of Guest (Max 2)</FormLabel>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      onClick={decreaseGuests}
                      className="bg-transparent border border-white/30 text-white hover:bg-white/10 h-10 w-10 rounded-full p-0"
                    >
                      -
                    </Button>
                    <span className="text-white mx-4 w-8 text-center">{guestCount}</span>
                    <Button
                      type="button"
                      onClick={increaseGuests}
                      className="bg-transparent border border-white/30 text-white hover:bg-white/10 h-10 w-10 rounded-full p-0"
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
                    <FormLabel className="text-white">Wishes</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Your wishes for the couple"
                        className="w-full bg-transparent border border-white/30 rounded-md p-2 text-white h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={!attendance || submitted}
                className="w-full bg-white text-[#10191e] hover:bg-white/90"
              >
                {submitted ? "Thank you for your response!" : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
