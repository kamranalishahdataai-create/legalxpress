

## Add 500-Spot Limit Counter to Accessible Legal Solutions

### Overview
Add a real-time spot counter to the "Accessible Legal Solutions" section, showing that these promotional prices are limited to the first 500 clients. This creates urgency and exclusivity similar to the existing subscriber countdown banner.

### Database Changes
1. **Create a new `promo_spots_counter` table** with:
   - `id` (UUID, primary key)
   - `spots_remaining` (integer, default 500)
   - `total_spots` (integer, default 500)
   - `updated_at` (timestamp)
   - Seed it with one row: 500 spots remaining
   - Enable realtime so the counter updates live
   - Add RLS policy: public read access (anyone can see the count)

### Frontend Changes
2. **Update `src/components/home/DoorCrashers.tsx`**:
   - Fetch `spots_remaining` from the new `promo_spots_counter` table on mount
   - Subscribe to realtime updates for live changes
   - Add a visually prominent counter banner below the section header showing "X / 500 spots remaining" with a progress bar (styled consistently with the existing subscriber countdown)
   - When spots are low (e.g., below 50), add urgency styling (pulsing icon, color shift)
   - Update the existing "Offer available while spots last" text at the bottom of each card to show the actual remaining count

### Visual Design
The counter will sit between the section header ("Accessible Legal Solutions") and the services grid. It will include:
- A compact bar with a gradient background matching the section theme
- Large, bold number for spots remaining
- A progress bar showing percentage claimed
- Dynamic urgency indicators as spots decrease

### Technical Details
- Follows the same pattern as the existing `SubscriberCountdown` component (Supabase query + realtime channel subscription)
- Uses `maybeSingle()` for the initial fetch with graceful fallback to 500
- Cleans up the realtime channel on unmount
- Progress bar is clamped between 0-100%
