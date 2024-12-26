/*
  # Add Default Restaurant Data

  1. Changes
    - Add unique constraint on positions name
    - Add default positions
    - Add default meal services
    - Add default staffing levels
    
  2. Security
    - Maintains existing RLS policies
*/

-- Add unique constraint to positions name
ALTER TABLE positions
ADD CONSTRAINT positions_name_key UNIQUE (name);

-- Create function to ensure default data exists
DO $$ 
DECLARE
  v_restaurant_id uuid;
  v_server_id uuid;
  v_cook_id uuid;
  v_host_id uuid;
  v_bartender_id uuid;
  v_busser_id uuid;
  v_breakfast_id uuid;
  v_lunch_id uuid;
  v_dinner_id uuid;
BEGIN
  -- Get or create restaurant
  SELECT id INTO v_restaurant_id FROM restaurant_settings LIMIT 1;
  
  IF v_restaurant_id IS NULL THEN
    INSERT INTO restaurant_settings (name, description)
    VALUES ('My Restaurant', 'A great place to eat')
    RETURNING id INTO v_restaurant_id;
  END IF;

  -- Insert default positions
  WITH position_data AS (
    INSERT INTO positions (name, requires_lead, min_employees, max_employees)
    VALUES 
      ('Server', true, 2, 6),
      ('Cook', true, 1, 4),
      ('Host', false, 1, 2),
      ('Bartender', true, 1, 3),
      ('Busser', false, 1, 3)
    ON CONFLICT (name) DO UPDATE 
    SET 
      requires_lead = EXCLUDED.requires_lead,
      min_employees = EXCLUDED.min_employees,
      max_employees = EXCLUDED.max_employees
    RETURNING id, name
  )
  SELECT 
    id INTO v_server_id 
  FROM position_data 
  WHERE name = 'Server';

  SELECT id INTO v_cook_id FROM positions WHERE name = 'Cook';
  SELECT id INTO v_host_id FROM positions WHERE name = 'Host';
  SELECT id INTO v_bartender_id FROM positions WHERE name = 'Bartender';
  SELECT id INTO v_busser_id FROM positions WHERE name = 'Busser';

  -- Insert default meal services
  WITH service_data AS (
    INSERT INTO meal_services (restaurant_id, service_type, start_time, end_time, expected_traffic)
    VALUES 
      (v_restaurant_id, 'breakfast', '07:00', '11:00', 'medium'),
      (v_restaurant_id, 'lunch', '11:00', '16:00', 'medium'),
      (v_restaurant_id, 'dinner', '16:00', '22:00', 'medium')
    ON CONFLICT (restaurant_id, service_type) DO UPDATE 
    SET 
      start_time = EXCLUDED.start_time,
      end_time = EXCLUDED.end_time,
      expected_traffic = EXCLUDED.expected_traffic
    RETURNING id, service_type
  )
  SELECT 
    id INTO v_breakfast_id 
  FROM service_data 
  WHERE service_type = 'breakfast';

  SELECT id INTO v_lunch_id FROM meal_services WHERE service_type = 'lunch' AND restaurant_id = v_restaurant_id;
  SELECT id INTO v_dinner_id FROM meal_services WHERE service_type = 'dinner' AND restaurant_id = v_restaurant_id;

  -- Insert staffing levels
  INSERT INTO staffing_levels (
    service_id,
    position_id,
    traffic_level,
    min_staff,
    optimal_staff,
    max_staff
  )
  SELECT
    s.id,
    p.id,
    t.level::traffic_level,
    t.min_staff,
    t.optimal_staff,
    t.max_staff
  FROM (
    VALUES
      (v_breakfast_id),
      (v_lunch_id),
      (v_dinner_id)
  ) as s(id)
  CROSS JOIN (
    VALUES
      (v_server_id),
      (v_cook_id),
      (v_host_id),
      (v_bartender_id),
      (v_busser_id)
  ) as p(id)
  CROSS JOIN (
    VALUES
      ('low', 1, 2, 3),
      ('medium', 2, 3, 4),
      ('high', 3, 4, 6)
  ) as t(level, min_staff, optimal_staff, max_staff)
  ON CONFLICT (service_id, position_id, traffic_level) DO UPDATE
  SET
    min_staff = EXCLUDED.min_staff,
    optimal_staff = EXCLUDED.optimal_staff,
    max_staff = EXCLUDED.max_staff;

END $$;