<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use App\Mail\EventInvitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EventController extends Controller
{
    public function index()
    {
        try {
            // Fetch all events from the database
            $events = Event::all();
            return view('events.index', compact('events'));
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to fetch events: ' . $e->getMessage());
        }
    }

    public function create()
    {
        return view('events.create');
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required',
                'date' => 'required',
                'time' => 'required',
                'duration' => 'required',
                'description' => 'required',
            ]);

            Event::create([
                'title' => $request->title,
                'date' => $request->date,
                'time' => $request->time,
                'duration' => $request->duration,
                'description' => $request->description,
            ]);

            return redirect()->route('events.index')
                ->with('success', 'Event created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to create event: ' . $e->getMessage());
        }
    }

    public function edit(Event $event)
    {
        return view('events.edit', compact('event'));
    }

    public function update(Request $request, Event $event)
    {
        try {
            $request->validate([
                'title' => 'required',
                'date' => 'required',
                'time' => 'required',
                'duration' => 'required',
                'description' => 'required',
            ]);

            $event->update($request->all());

            return redirect()->route('events.index')
                ->with('success', 'Event updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to update event: ' . $e->getMessage());
        }
    }

    public function destroy(Event $event)
    {
        try {
            $event->delete();
            return redirect()->route('events.index')
                ->with('success', 'Event deleted successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete event: ' . $e->getMessage());
        }
    }
    public function inviteUser(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'event_id' => 'required|exists:events,id',
            ]);

            $event = Event::findOrFail($request->event_id);

            // Send the invitation via email using the EventInvitation Mailable
            Mail::to($request->email)->send(new EventInvitation($event));

            return response()->json(['message' => 'Invitation sent successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to send invitation by email: ' . $e->getMessage()], 500);
        }
    }
    public function acceptInvitation(Request $request, Event $event)
    {
        if ($request->user()) {
            return redirect()->route('event.show', $event);
        } else {
            return redirect()->route('login')->with('event_id', $event->id);
        }
    }

    public function getUserEventId(Request $request)
    {
        $user = $request->user();
        if ($user) {
            // Get the ID of the event associated with the user
            $event = $user->events->first(); 

            if ($event) {
                return response()->json(['eventId' => $event->id]);
            } else {
                return response()->json(['error' => 'User is not associated with any event'], 404);
            }
        }
        return response()->json(['error' => 'User not authenticated'], 401);
    }

}
