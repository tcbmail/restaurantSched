/*
  # Add Default Restaurant Data

  1. Changes
    - Ensures a default restaurant exists
    - Adds default meal services
    - Adds default positions and staffing levels
    
  2. Security
    - Maintains existing RLS policies
*/

-- Create a function to ensure restaurant settings exist
CREATE OR REPLACE FUNCTION ensure_default_restaurant()
RETURNS uuid AS $$
DECLARE
  v_restaurant_id uuid;
BEGIN
  -- Try to get existing restaurant ID
  SELECT id INTO v_restaurant_id FROM restaurant_settings LIMIT 1;
  
  -- If no restaurant exists, create one
  IF v_restaurant_id IS NULL THEN
    INSERT INTO restaurant_settings (name, description)
    VALUES ('My Restaurant', 'A great place to eat')
    RETURNING id INTO v_restaurant_id;
  END IF;
  
  RETURN v_restaurant_id;
END;
$$ LANGUAGE plpgsql;

-- Create default restaurant and services
DO $$ 
DECLARE
  v_restaurant_id uuid;
BEGIN
  -- Get or create restaurant
  v_restaurant_id := ensure_default_restaurant();

  -- Insert default meal services
  INSERT INTO meal_services (restaurant_id, service_type, start_time, end_time, expected_traffic)
  VALUES 
    (v_restaurant_id, 'breakfast', '07:00', '11:00', 'medium'),
    (v_restaurant_id, 'lunch', '11:00', '16:00', 'medium'),
    (v_restaurant_id, 'dinner', '16:00', '22:00', 'medium')
  ON CONFLICT (restaurant_id, service_type) DO UPDATE 
  SET 
    start_time = EXCLUDED.start_time,
    end_time = EXCLUDED.end_time,
    expected_traffic = EXCLUDED.expected_traffic;

  -- Insert default positions if they don't exist
  INSERT INTO positions (name, requires_lead, min_employees, max_employees)
  VALUES 
    ('Server', true, 2, 6),
    ('Cook', true, 1, 4),
    ('Host', false, 1, 2),
    ('Bartender', true, 1, 3),
    ('Busser', false, 1, 3)
  ON CONFLICT DO NOTHING;

  -- Insert default staffing levels
  INSERT INTO staffing_levels (
    service_id,
    position_id,
    traffic_level,
    min_staff,
    optimal_staff,
    max_staff
  )
  SELECT
    ms.id,
    p.id,
    t.level::traffic_level,
    t.min_staff,
    t.optimal_staff,
    t.max_staff
  FROM meal_services ms
  CROSS JOIN positions p
  CROSS JOIN (
    VALUES
      ('low', 1, 2, 3),
      ('medium', 2, 3, 4),
      ('high', 3, 4, 6)
  ) as t(level, min_staff, optimal_staff, max_staff)
  WHERE ms.restaurant_id = v_restaurant_id
  ON CONFLICT (service_id, position_id, traffic_level) DO UPDATE
  SET
    min_staff = EXCLUDED.min_staff,
    optimal_staff = EXCLUDED.optimal_staff,
    max_staff = EXCLUDED.max_staff;

END $$;