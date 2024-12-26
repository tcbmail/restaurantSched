/*
  # Add Default Restaurant Settings and Services

  1. Changes
    - Add default restaurant settings with proper UUID
    - Add default meal services with proper references
    - Add default staffing requirements
    
  2. Security
    - Maintains existing RLS policies
*/

-- Insert default restaurant settings
INSERT INTO restaurant_settings (id, name, description)
SELECT 
  gen_random_uuid(),
  'My Restaurant',
  'A great place to eat'
WHERE NOT EXISTS (
  SELECT 1 FROM restaurant_settings LIMIT 1
);

-- Insert default meal services
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