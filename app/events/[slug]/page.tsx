import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import { IEvent } from "@/database";
import EventCard from "@/components/EventCard";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({ icon,alt,label} : { icon: string; alt: string; label: string }) => (
    <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)
const EventTagsItem = ({ tags } : { tags: string[] }) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
            {tags.map((tag) => (
                <div className="pill" key={tag}>{tag}</div>
            ))}
    </div>
)

const EventAgendaItem = ({ agendaItems } : { agendaItems: string[] }) => (
    <div className="agenda">
        <h2>Agenda</h2>
            {agendaItems.map((item) => (
                <li key={item}>{item}</li>
            ))}
    </div>
)

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const request = await fetch(`${BASE_URL}/api/events/${slug}`);
    const { data: event } = await request.json();

    if(!event) return notFound();
    const bookings = 10;
    const rawSimilarEvents: IEvent[] = await getSimilarEventsBySlug(slug);
    const similarEvents = JSON.parse(JSON.stringify(rawSimilarEvents));
    return (
        <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p>{event.description}</p>
            </div>

            <div className="details">
                <div className="content">
                    <Image src={event.image} alt="Event Banner" width={800} height={800} className="banner"/>

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{event.overview}</p>
                    </section>
                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>
                        <EventDetailItem icon="/icons/calendar.svg" alt="Calendar" label={event.date} />
                        <EventDetailItem icon="/icons/clock.svg" alt="Clock" label={event.time} />
                        <EventDetailItem icon="/icons/pin.svg" alt="Location" label={event.location} />
                        <EventDetailItem icon="/icons/mode.svg" alt="Mode" label={event.mode} />
                        <EventDetailItem icon="/icons/audience.svg" alt="Audience" label={event.audience} />
                    </section>

                    <EventAgendaItem agendaItems={event.agenda} />

                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{event.organizer}</p>
                    </section>

                    <EventTagsItem tags={event.tags} />

                </div>

                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">
                                Join {bookings} others who have booked their spot.
                            </p>
                        ): (
                            <p className="text-sm">
                                Be the first to book your spot for this event!
                            </p>
                        )}

                        <BookEvent />
                    </div>
                </aside>
            </div>
            <div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents && similarEvents.length > 0 ? (similarEvents.map((similarEvent) => (
                        <EventCard key={similarEvent.title} {...similarEvent} />
                    ))) : (<p>No similar events found.</p>)}
                </div>
            </div>
        </section>
    );
}
 
export default EventDetailsPage;