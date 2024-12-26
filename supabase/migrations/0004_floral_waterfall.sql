/*
  # Fix Restaurant Defaults

  1. Changes
    - Add default values for restaurant settings
    - Add default meal services
    - Add default staffing requirements
    - Add default holidays table structure
    
  2. Security
    - Maintain existing RLS policies
    - Add new policies for insert/update operations
*/

-- Ensure we have a default restaurant
INSERT INTO restaurant_settings (name, description)
SELECT 'My Restaurant', 'A great place to eat'
WHERE NOT EXISTS (
  SELECT 1 FROM restaurant_settings LIMIT 1
);

-- Add default meal services for the restaurant
WITH default_restaurant AS (
  SELECT id FROM restaurant_settings LIMIT 1
)
INSERT INTO meal_services (restaurant_id, service_type, start_time, end_time, expected_traffic)
SELECT 
  r.id,
  service.type::service_type,
  service.start_time::time,
  service.end_time::time,
  'medium'::traffic_level
FROM default_restaurant r
CROSS JOIN (
  VALUES 
    ('breakfast', '07:00', '11:00'),
    ('lunch', '11:00', '16:00'),
    ('dinner', '16:00', '22:00')
) as service(type, start_time, end_time)
ON CONFLICT (restaurant_id, service_type) DO NOTHING;

-- Add default staffing requirements
WITH default_restaurant AS (
  SELECT id FROM restaurant_settings LIMIT 1
),
default_services AS (
  SELECT id, service_type 
  FROM meal_services 
  WHERE restaurant_id = (SELECT id FROM default_restaurant)
),
default_positions AS (
  SELECT id, name 
  FROM positions 
  WHERE name IN ('Server', 'Cook', 'Host')
)
INSERT INTO staffing_requirements (service_id, position_id, min_staff, optimal_staff, max_staff)
SELECT 
  s.id,
  p.id,
  2,
  3,
  4
FROM default_services s
CROSS JOIN default_positions p
ON CONFLICT DO NOTHING;

-- Add RLS policies for insert/update
CREATE POLICY "Allow authenticated insert" ON restaurant_settings
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON restaurant_settings
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert" ON meal_services
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON meal_services
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert" ON staffing_requirements
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON staffing_requirements
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert" ON holidays
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON holidays
  FOR UPDATE TO authenticated USING (true);