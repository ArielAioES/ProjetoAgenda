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
            $events = Event::all();

            return $events;
            
        } catch (\Exception $e) {
            return $e->getMessage();
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
    
            $user = $request->user();
    
            $eventData = [
                'title' => $request->title, 
                'date' => $request->date,
                'time' => $request->time,
                'duration' => $request->duration,
                'description' => $request->description,
            ];
    
            $eventCreated = Event::create($eventData);
            
            $eventCreated->users()->attach($user->id);
            
            return response()->json([
                'message' => 'Event created successfully.',
                'event' => $eventCreated,
            ]);
                
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create event: ' . $e->getMessage(),
            ], 500);
        }
    }
    
    public function show($id)
    {
        try {
            $event = Event::findOrFail($id);
            return response()->json($event);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch event: ' . $e->getMessage()], 404);
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

            // Sending the invitation via email
            Mail::to($request->email)->send(new EventInvitation($event));

            // Returning a success response
            return response()->json(['message' => 'Invitation sent successfully'], 200);
        } catch (\Exception $e) {
            // Returning an error response in case of an exception
            return response()->json(['error' => 'Failed to send invitation by email: ' . $e->getMessage()], 500);
        }
    }

}
