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
            // Return the events index view with the events data
            return view('events.index', compact('events'));
        } catch (\Exception $e) {
            // If an exception occurs while fetching events, redirect back with an error message
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
            // Validating the received data
            $request->validate([
                'email' => 'required|email',
                'event_id' => 'required|exists:events,id',
            ]);

            // Finding the event by its ID
            $event = Event::findOrFail($request->event_id);

            // Send the invitation via email using the EventInvitation Mailable
            Mail::to($request->email)->send(new EventInvitation($event));

            // Return a success response if the invitation is sent successfully
            return response()->json(['message' => 'Invitation sent successfully'], 200);
        } catch (\Exception $e) {
            // Return an error response if an exception occurs while sending the invitation
            return response()->json(['error' => 'Failed to send invitation by email: ' . $e->getMessage()], 500);
        }
    }
    public function acceptInvitation(Request $request, Event $event)
    {
        // Check if the user is authenticated
        if ($request->user()) {
            // If the user is authenticated, redirect them to the event page
            return redirect()->route('event.show', $event);
        } else {
            // If the user is not authenticated, redirect them to the login page with the event ID in session
            return redirect()->route('login')->with('event_id', $event->id);
        }
    }

    public function getUserEventId(Request $request)
    {
         // Check if the user is authenticated
        $user = $request->user();
        if ($user) {
            // Get the ID of the event associated with the user
            $event = $user->events->first(); // Retrieve the first event associated with the user

            if ($event) {
                // If an event is found, return its ID
                $eventId = $event->id;
                return response()->json(['eventId' => $eventId]);
            } else {
                // If the user is not associated with any event, return an error
                return response()->json(['error' => 'User is not associated with any event'], 404);
            }
        }
        // Return an error if the user is not authenticated
        return response()->json(['error' => 'User not authenticated'], 401);
    }

}
