import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import Event, { IEvent } from "@/database/event.model";
import connectDB from "@/lib/mongodb";
export const dynamic = "force-dynamic";

const Page = async () => {
  await connectDB();

  let events: IEvent[] = [];
  try {
    const docs = await Event.find().sort({ createdAt: -1 }).lean();
    events = docs.map((doc: any) => ({
      ...doc,
      _id: doc._id?.toString(),
      createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
      updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
    })) as IEvent[];
  } catch (error) {
    console.error("Failed to load events", error);
  }

  return (
    <section>
      <h1 className="text-center">The Hub for Every Dev <br/> Event You can't miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups, Conferences, All in one place</p>

      <ExploreBtn />

      <div className="mt-20 space-y-5">
        <h3>Explore Events</h3>

        <ul className="events">
          {events && events.length > 0 && events.map((event: IEvent) => (
              <li key={event.title}>
                <EventCard {...event} />
              </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export default Page;