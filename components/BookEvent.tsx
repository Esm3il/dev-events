'use client';

import { set } from "mongoose";
import { useState } from "react";
import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const {success} = await createBooking(eventId, slug, email);
        if(success){
            posthog.capture('event_booked', { eventId, slug, email });
            setSubmitted(true);
        }else{
            console.error('Booking Creation Failed');
            posthog.captureException('Booking Creation Failed');
        }

    }

    return (
        <div id="book-event">
            {submitted ? (
                <p className="text-sm">Thank You for Signing Up!</p>
            ):(
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter your email"
                        />
                    </div>

                    <button type="submit" className="button-submit">Submit</button>
                </form>
            )}
        </div>
    );
}
 
export default BookEvent;