<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProfileRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $profiles = $request->user()
            ->profiles()
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('profiles/index', [
            'profiles' => $profiles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('profiles/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProfileRequest $request): RedirectResponse
    {
        $request->user()->profiles()->create($request->validated());

        return redirect()->route('profiles.index')
            ->with('success', 'Profile created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Profile $profile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Profile $profile): Response
    {
        $this->authorize('view', $profile);

        return Inertia::render('profiles/edit', [
            'profile' => $profile,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProfileRequest $request, Profile $profile): RedirectResponse
    {
        $this->authorize('update', $profile);

        $profile->update($request->validated());

        return redirect()->route('profiles.index')
            ->with('success', 'Profile updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Profile $profile): RedirectResponse
    {
        $this->authorize('delete', $profile);

        $profile->delete();

        return redirect()->route('profiles.index')
            ->with('success', 'Profile deleted.');
    }
}
