"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DAYS,
  MONTHS,
  NATIONAL_HOLIDAYS,
  getDaysInMonth,
  getFirstDayOfMonth,
  formatDate,
} from "@/app/utils/date-utils";

interface Event {
  id: string;
  date: string;
  title: string;
  time: string;
  attendees?: Array<{
    name: string;
    avatar: string;
  }>;
}

const CLG_EVENTS: Event[] = [
  {
    id: "1",
    date: "2025-01-02",
    title: "Devz BootCamp",
    time: "11:00 AM",
  },
  {
    id: "2",
    date: "2025-01-06",
    title: "Accenture Assesment",
    time: "11:45 AM",
  },
  {
    id: "3",
    date: "2025-01-10",
    title: "TCS Codevita",
    time: "02:30 PM",
  },
  {
    id: "4",
    date: "2025-01-15",
    title: "Ethnic Day",
    time: "10:45 AM",
  },
];

export function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [events, setEvents] = React.useState<Event[]>(CLG_EVENTS);
  const [editingEvent, setEditingEvent] = React.useState<Event | null>(null);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDate(null);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isHoliday = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    return NATIONAL_HOLIDAYS.some((holiday) => holiday.date === dateString);
  };

  const getHolidayName = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    const holiday = NATIONAL_HOLIDAYS.find((h) => h.date === dateString);
    return holiday ? holiday.name : null;
  };

  const getEventsForDate = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateString);
  };

  const addEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setEditingEvent(null);
  };

  const deleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleDateClick = (day: number) => {
    const clickedDate = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    setSelectedDate((prevDate) =>
      prevDate === clickedDate ? null : clickedDate
    );
  };

  const sortedEvents = React.useMemo(() => {
    return [...events].sort((a, b) => {
      if (a.date === selectedDate && b.date !== selectedDate) return -1;
      if (a.date !== selectedDate && b.date === selectedDate) return 1;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [events, selectedDate]);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">
              {MONTHS[currentMonth]} {currentYear}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <AddEventDialog onAddEvent={addEvent} />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-4">
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
          {Array.from({ length: 42 }).map((_, i) => {
            const day = i - firstDayOfMonth + 1;
            const isValidDay = day > 0 && day <= daysInMonth;
            const dayEvents = isValidDay ? getEventsForDate(day) : [];
            const holidayName = isValidDay ? getHolidayName(day) : null;
            const dateString = isValidDay
              ? `${currentYear}-${String(currentMonth + 1).padStart(
                  2,
                  "0"
                )}-${String(day).padStart(2, "0")}`
              : "";

            return (
              <Card
                key={i}
                className={`min-h-[100px] p-2 transition-all duration-200 ease-in-out ${
                  isValidDay
                    ? "hover:bg-accent hover:scale-105 cursor-pointer"
                    : "bg-muted"
                } ${
                  dateString === selectedDate
                    ? "bg-white text-black" // Selected date styling
                    : isToday(day)
                    ? "bg-black text-white" // Today's date styling
                    : ""
                }`}
                onClick={() => isValidDay && handleDateClick(day)}
              >
                {isValidDay && (
                  <>
                    <div className="font-medium">{day}</div>
                    {holidayName && (
                      <div className="mt-1 text-xs font-medium uppercase text-lime-500">
                        {holidayName}
                      </div>
                    )}
                    {dayEvents.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {dayEvents.map((event, index) => (
                          <TooltipProvider key={event.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center space-x-1">
                                  <Avatar className="h-4 w-4">
                                    <AvatarFallback>
                                      {event.title[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs truncate">
                                    {event.title}
                                  </span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{event.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {event.time}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </Card>
            );
          })}
        </div>
      </div>
      <div className="w-80 border-l p-6">
        <h2 className="mb-4 text-lg font-semibold">Event List</h2>
        {selectedDate ? (
          <p className="mb-4 text-sm text-muted-foreground">
            Events for {formatDate(new Date(selectedDate))}
          </p>
        ) : (
          <p className="mb-4 text-sm text-muted-foreground">All events</p>
        )}
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-4">
            {sortedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={() => setEditingEvent(event)}
                onDelete={() => deleteEvent(event.id)}
                isHighlighted={event.date === selectedDate}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
      {editingEvent && (
        <EditEventDialog
          event={editingEvent}
          onUpdateEvent={updateEvent}
          onClose={() => setEditingEvent(null)}
        />
      )}
    </div>
  );
}

function EventCard({
  event,
  onEdit,
  onDelete,
  isHighlighted,
}: {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
  isHighlighted: boolean;
}) {
  return (
    <Card key={event.id} className={`p-4 ${isHighlighted ? "bg-accent" : ""}`}>
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {formatDate(new Date(event.date))}
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <h3 className="font-semibold">{event.title}</h3>
      <div className="mt-2 flex items-center text-sm text-muted-foreground">
        <div className="flex items-center">
          <div className="mr-2">{event.time}</div>
        </div>
      </div>
      {event.attendees && (
        <div className="mt-3 flex -space-x-2">
          {event.attendees.map((attendee, i) => (
            <Avatar key={i} className="border-2 border-background">
              <AvatarImage src={attendee.avatar} alt={attendee.name} />
              <AvatarFallback>U{i + 1}</AvatarFallback>
            </Avatar>
          ))}
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
            7+
          </div>
        </div>
      )}
    </Card>
  );
}

function AddEventDialog({
  onAddEvent,
}: {
  onAddEvent: (event: Event) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [newEvent, setNewEvent] = React.useState<Partial<Event>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.title && newEvent.date) {
      onAddEvent({
        id: Math.random().toString(36).substr(2, 9),
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time || "",
      });
      setOpen(false);
      setNewEvent({});
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newEvent.title || ""}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={newEvent.date || ""}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              value={newEvent.time || ""}
              onChange={(e) =>
                setNewEvent({ ...newEvent, time: e.target.value })
              }
            />
          </div>
          <Button type="submit">Add Event</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditEventDialog({
  event,
  onUpdateEvent,
  onClose,
}: {
  event: Event;
  onUpdateEvent: (event: Event) => void;
  onClose: () => void;
}) {
  const [editedEvent, setEditedEvent] = React.useState<Event>(event);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateEvent(editedEvent);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={editedEvent.title}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={editedEvent.date}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, date: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              value={editedEvent.time}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, time: e.target.value })
              }
            />
          </div>
          <Button type="submit">Update Event</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
