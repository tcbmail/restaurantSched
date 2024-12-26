/*
  # Fix Restaurant Settings and Add Default Data

  1. Changes
    - Add default restaurant settings with proper UUID
    - Add default positions
    - Add default staffing levels
    
  2. Security
    - Maintain existing RLS policies
*/

-- Create default restaurant if none exists
DO $$ 
DECLARE
  restaurant_id uuid;
BEGIN
  -- Insert default restaurant if none exists
  INSERT INTO restaurant_settings (name, description)
  SELECT 'My Restaurant', 'A great place to eat'
  WHERE NOT EXISTS (SELECT 1 FROM restaurant_settings LIMIT 1)
  RETURNING id INTO restaurant_id;

  -- If we inserted a new restaurant, set up default data
  IF restaurant_id IS NOT NULL THEN
    -- Insert default positions
    INSERT INTO positions (name, requires_lead, min_employees, max_employees)
    VALUES 
      ('Server', true, 2, 6),
      ('Cook', true, 1, 4),
      ('Host', false, 1, 2),
      ('Bartender', true, 1, 3),
      ('Busser', false, 1, 3);

    -- Insert default meal services
    INSERT INTO meal_services (restaurant_id, service_type, start_time, end_time, expected_traffic)
    VALUES 
      (restaurant_id, 'breakfast', '07:00', '11:00', 'medium'),
      (restaurant_id, 'lunch', '11:00', '16:00', 'medium'),
      (restaurant_id, 'dinner', '16:00', '22:00', 'medium');

    -- Insert default staffing levels for each position and service
    WITH service_positions AS (
      SELECT 
        ms.id as service_id,
        p.id as position_id,
        ms.service_type
      FROM meal_services ms
      CROSS JOIN positions p
      WHERE ms.restaurant_id = restaurant_id
    )
    INSERT INTO staffing_levels 
      (service_id, position_id, traffic_level, min_staff, optimal_staff, max_staff)
    SELECT 
      sp.service_id,
      sp.position_id,
      level.traffic::traffic_level,
      level.min,
      level.optimal,
      level.max
    FROM service_positions sp
    CROSS JOIN (
      VALUES 
        ('low', 1, 2, 3),
        ('medium', 2, 3, 4),
        ('high', 3, 4, 6)
    ) as level(traffic, min, optimal, max);
  END IF;
END $$;