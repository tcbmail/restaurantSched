/*
  # Fix Restaurant Settings and Meal Services

  1. Changes
    - Add proper conflict handling for restaurant settings
    - Add meal services with proper error handling
    - Add indexes for better performance
    
  2. Security
    - Maintain existing RLS policies
*/

-- Create a function to ensure restaurant settings exist
CREATE OR REPLACE FUNCTION ensure_restaurant_settings()
RETURNS uuid AS $$
DECLARE
  restaurant_id uuid;
BEGIN
  -- Try to get existing restaurant ID
  SELECT id INTO restaurant_id FROM restaurant_settings LIMIT 1;
  
  -- If no restaurant exists, create one
  IF restaurant_id IS NULL THEN
    INSERT INTO restaurant_settings (name, description)
    VALUES ('My Restaurant', 'A great place to eat')
    RETURNING id INTO restaurant_id;
  END IF;
  
  RETURN restaurant_id;
END;
$$ LANGUAGE plpgsql;

-- Create a function to ensure meal services exist
CREATE OR REPLACE FUNCTION ensure_meal_services()
RETURNS void AS $$
DECLARE
  v_restaurant_id uuid;
BEGIN
  -- Get or create restaurant
  v_restaurant_id := ensure_restaurant_settings();
  
  -- Insert meal services with conflict handling
  INSERT INTO meal_services (
    restaurant_id,
    service_type,
    start_time,
    end_time,
    expected_traffic
  )
  VALUES 
    (v_restaurant_id, 'breakfast'::service_type, '07:00', '11:00', 'medium'::traffic_level),
    (v_restaurant_id, 'lunch'::service_type, '11:00', '16:00', 'medium'::traffic_level),
    (v_restaurant_id, 'dinner'::service_type, '16:00', '22:00', 'medium'::traffic_level)
  ON CONFLICT (restaurant_id, service_type) 
  DO UPDATE SET
    start_time = EXCLUDED.start_time,
    end_time = EXCLUDED.end_time,
    expected_traffic = EXCLUDED.expected_traffic;
END;
$$ LANGUAGE plpgsql;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_restaurant_settings_created_at 
  ON restaurant_settings(created_at);
  
CREATE INDEX IF NOT EXISTS idx_meal_services_restaurant_service 
  ON meal_services(restaurant_id, service_type);

-- Execute the functions to ensure data exists
SELECT ensure_meal_services();