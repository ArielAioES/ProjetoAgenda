<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use App\Mail\EventInvitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class EventController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $events = $user->events;

        return response()->json($events);
    }


    public function create()
    {
        return view('events.create');
    }

    public function store(Request $request)
    {
        try {
            $user = auth()->user();
    
            $validatedData = $request->validate([
                'title' => 'required',
                'date' => 'required',
                'time' => 'required',
                'duration' => 'required',
                'description' => 'required',
            ]);
            
            $event = new Event();
    
            $event->user_id = $user->id;

            $event->fill($validatedData);
    
            $event->save();
    
            return response()->json([
                'message' => 'Event created successfully.',
                'event' => $event,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create event: ' . $e->getMessage(),
            ], 500);
        }
    }
    


    protected function userHasPermission(Event $event)
    {
        if ($event->user_id === Auth::id()) {
            return true;
        }
        return $event->users()->where('user_id', Auth::id())->exists();
    }

    public function show($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        if ($this->userHasPermission($event)) {
            return response()->json($event, 200);
        } else {
            return response()->json(['error' => 'Access denied'], 403);
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

            return response()->json(['message' => 'Event updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update event: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(Event $event)
    {
        try {
            $event->delete();
            return response()->json(['message' => 'Event deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete event: ' . $e->getMessage()], 500);
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
            return response()->json(['redirect_url' => route('event.show', $event)], 200);
        } else {
            return response()->json(['redirect_url' => route('login'), 'event_id' => $event->id], 200);
        }
    }

    public function getUserEventId(Request $request)
    {
        $user = $request->user();
        if ($user) {
            $event = $user->events->first();

            if ($event) {
                return response()->json(['eventId' => $event->id], 200);
            } else {
                return response()->json(['error' => 'User is not associated with any event'], 404);
            }
        }
        return response()->json(['error' => 'User not authenticated'], 401);
    }
}
